#!/usr/bin/env python3
"""
export_risk_onnx.py — Export the RiskMLP .pt checkpoint to ONNX.

Usage:
    python export_risk_onnx.py ~/Downloads/best_model.pt ../models/mass_risk.onnx
"""

import argparse
import json
import os
import sys
from pathlib import Path

import torch
import torch.nn as nn


class RiskMLP(nn.Module):
    """Small MLP that fuses CNN image features with EHR data.

    Input:  image_features [batch, 1280], ehr_features [batch, 4]
    Output: risk_logit [batch, 1]  (apply sigmoid for probability)
    """
    def __init__(self, feature_dim: int, ehr_dim: int,
                 hidden_1: int = 256, hidden_2: int = 64,
                 dropout: float = 0.4):
        super().__init__()
        self.net = nn.Sequential(
            nn.Linear(feature_dim + ehr_dim, hidden_1),
            nn.BatchNorm1d(hidden_1),
            nn.ReLU(),
            nn.Dropout(dropout),

            nn.Linear(hidden_1, hidden_2),
            nn.BatchNorm1d(hidden_2),
            nn.ReLU(),
            nn.Dropout(dropout),

            nn.Linear(hidden_2, 1),
        )

    def forward(self, image_features: torch.Tensor, ehr_features: torch.Tensor) -> torch.Tensor:
        x = torch.cat([image_features, ehr_features], dim=1)
        return self.net(x)


def main():
    parser = argparse.ArgumentParser(description="Export RiskMLP to ONNX.")
    parser.add_argument("input", type=Path, help="Path to best_model.pt")
    parser.add_argument("output", type=Path, help="Output .onnx path (e.g. ../models/mass_risk.onnx)")
    parser.add_argument("--opset", type=int, default=13, help="ONNX opset version (default: 13)")
    args = parser.parse_args()

    if not args.input.exists():
        print(f"Error: {args.input} not found", file=sys.stderr)
        sys.exit(1)

    args.output.parent.mkdir(parents=True, exist_ok=True)

    # Load checkpoint
    print(f"Loading {args.input} ...")
    checkpoint = torch.load(str(args.input), map_location="cpu", weights_only=False)
    config = checkpoint.get("config", {})

    feature_dim = config.get("feature_dim", 1280)
    ehr_dim = config.get("ehr_dim", 4)
    hidden_1 = config.get("hidden_1", 256)
    hidden_2 = config.get("hidden_2", 64)
    abnormality = config.get("abnormality_type", "unknown")

    print(f"  Abnormality:  {abnormality}")
    print(f"  Feature dim:  {feature_dim}")
    print(f"  EHR dim:      {ehr_dim}")
    print(f"  Architecture: [{feature_dim + ehr_dim}] → {hidden_1} → {hidden_2} → 1")

    if "best_val_auc" in checkpoint:
        print(f"  Best val AUC: {checkpoint['best_val_auc']:.4f}")

    # Build model with dropout=0 for inference
    model = RiskMLP(
        feature_dim=feature_dim,
        ehr_dim=ehr_dim,
        hidden_1=hidden_1,
        hidden_2=hidden_2,
        dropout=0.0,
    )
    model.load_state_dict(checkpoint["model_state_dict"])
    model.eval()

    # Export — two inputs
    dummy_feat = torch.randn(1, feature_dim)
    dummy_ehr = torch.randn(1, ehr_dim)

    torch.onnx.export(
        model,
        (dummy_feat, dummy_ehr),
        str(args.output),
        input_names=["image_features", "ehr_features"],
        output_names=["risk_logit"],
        dynamic_axes={
            "image_features": {0: "batch_size"},
            "ehr_features": {0: "batch_size"},
            "risk_logit": {0: "batch_size"},
        },
        opset_version=args.opset,
    )

    # Also save the inference config alongside
    config_path = args.output.parent / f"{args.output.stem}_config.json"
    risk_config = {
        "abnormality_type": abnormality,
        "feature_dim": feature_dim,
        "ehr_dim": ehr_dim,
        "ehr_features": config.get("ehr_features", ["age", "breast_density", "prior_biopsy", "family_history"]),
        "ehr_encoding": {
            "age": "normalized 0-1 (range 30-90)",
            "breast_density": "normalized 0-1 (1→0, 2→0.33, 3→0.67, 4→1)",
            "prior_biopsy": "0 or 1",
            "family_history": "0 or 1",
        },
        "output": "logit (apply sigmoid for probability)",
        "best_val_auc": checkpoint.get("best_val_auc"),
    }
    with open(config_path, "w") as f:
        json.dump(risk_config, f, indent=2)

    # Report
    pt_size = os.path.getsize(args.input) / 1024
    onnx_size = os.path.getsize(args.output) / 1024

    print(f"\n✓ Exported successfully")
    print(f"  PyTorch:  {pt_size:.1f} KB")
    print(f"  ONNX:     {onnx_size:.1f} KB")
    print(f"  Config:   {config_path}")
    print(f"  Path:     {args.output}")

    # Verify
    import onnx
    import onnxruntime as ort

    onnx_model = onnx.load(str(args.output))
    onnx.checker.check_model(onnx_model)

    sess = ort.InferenceSession(str(args.output), providers=["CPUExecutionProvider"])
    inputs = sess.get_inputs()
    outputs = sess.get_outputs()
    print(f"  Inputs:   {[(i.name, i.shape) for i in inputs]}")
    print(f"  Outputs:  {[(o.name, o.shape) for o in outputs]}")
    print(f"  ✓ ONNX valid + ORT session OK")


if __name__ == "__main__":
    main()