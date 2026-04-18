#!/usr/bin/env python3
"""
export_patch_onnx.py — Export timm patch classifier .pt → .onnx

Usage:
    pip install timm torch onnx onnxruntime

    python export_patch_onnx.py ~/Downloads/best_model.pt ../models/mass_patch.onnx
    python export_patch_onnx.py ~/Downloads/best_model.pt ../models/calc_patch.onnx
"""

import argparse
import os
import sys
from pathlib import Path

import timm
import torch


def main():
    parser = argparse.ArgumentParser(description="Export a timm patch classifier to ONNX.")
    parser.add_argument("input", type=Path, help="Path to best_model.pt")
    parser.add_argument("output", type=Path, help="Output .onnx path (e.g. ../models/mass_patch.onnx)")
    parser.add_argument("--opset", type=int, default=13, help="ONNX opset version (default: 13)")
    args = parser.parse_args()

    if not args.input.exists():
        print(f"Error: {args.input} not found", file=sys.stderr)
        sys.exit(1)

    args.output.parent.mkdir(parents=True, exist_ok=True)

    # Load checkpoint
    print(f"Loading {args.input} ...")
    checkpoint = torch.load(str(args.input), map_location="cpu", weights_only=False)
    config = checkpoint["config"]

    model_name = config["model_name"]
    patch_size = config["patch_size"]
    abnormality = config.get("abnormality_type", "unknown")

    print(f"  Architecture:  {model_name}")
    print(f"  Abnormality:   {abnormality}")
    print(f"  Patch size:    {patch_size}")
    if "best_val_auc" in checkpoint:
        print(f"  Best val AUC:  {checkpoint['best_val_auc']:.4f}")

    # Rebuild model with timm and load weights
    model = timm.create_model(model_name, pretrained=False, num_classes=2)
    model.load_state_dict(checkpoint["model_state_dict"])
    model.eval()

    # Export
    dummy_input = torch.randn(1, 3, patch_size, patch_size)
    torch.onnx.export(
        model,
        dummy_input,
        str(args.output),
        input_names=["image"],
        output_names=["logits"],
        dynamic_axes={"image": {0: "batch_size"}, "logits": {0: "batch_size"}},
        opset_version=args.opset,
    )

    # Report sizes
    pt_size = os.path.getsize(args.input) / (1024 * 1024)
    onnx_size = os.path.getsize(args.output) / (1024 * 1024)

    print(f"\n✓ Exported successfully")
    print(f"  PyTorch: {pt_size:.1f} MB")
    print(f"  ONNX:    {onnx_size:.1f} MB")
    print(f"  Path:    {args.output}")

    # Verify
    import onnx
    import onnxruntime as ort

    onnx_model = onnx.load(str(args.output))
    onnx.checker.check_model(onnx_model)

    sess = ort.InferenceSession(str(args.output), providers=["CPUExecutionProvider"])
    inputs = sess.get_inputs()
    outputs = sess.get_outputs()
    print(f"  Inputs:  {[(i.name, i.shape) for i in inputs]}")
    print(f"  Outputs: {[(o.name, o.shape) for o in outputs]}")
    print(f"  ✓ ONNX valid + ORT session OK")


if __name__ == "__main__":
    main()