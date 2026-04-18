#!/usr/bin/env python3
"""
export_onnx.py — Export YOLO11 (Ultralytics) .pt models to ONNX.

Usage:
    # Export all .pt files in a directory:
    python export_onnx.py --input-dir ./weights --output-dir ./models

    # Export a single file:
    python export_onnx.py --input-dir ./weights/mass_yolo.pt --output-dir ./models

    # Custom input size (default 640):
    python export_onnx.py --input-dir ./weights --output-dir ./models --imgsz 512

    # Patch classifiers at 224×224:
    python export_onnx.py --input-dir ./weights/mass_patch.pt --output-dir ./models --imgsz 224

Requirements:
    pip install ultralytics onnx onnxruntime
"""

import argparse
import sys
from ultralytics import YOLO
from pathlib import Path

def export_one(pt_path: Path, output_dir: Path, imgsz: int, opset: int, simplify: bool) -> Path:
    """Export a single .pt to .onnx and return the output path."""
    from ultralytics import YOLO

    print(f"\n{'='*60}")
    print(f"Loading {pt_path.name} ...")
    model = YOLO(str(pt_path))

    # Ultralytics .export() writes the ONNX next to the .pt by default,
    # so we export there first, then move to output_dir.
    result = model.export(
        format="onnx",
        imgsz=imgsz,
        opset=opset,
        simplify=simplify,
        dynamic=False,
    )

    exported = Path(result)
    dest = output_dir / exported.name

    if exported != dest:
        dest.parent.mkdir(parents=True, exist_ok=True)
        exported.rename(dest)

    print(f"  ✓ Saved {dest}  ({dest.stat().st_size / 1024 / 1024:.1f} MB)")
    return dest


def verify(onnx_path: Path):
    """Quick sanity check: load with onnx and create an ORT session."""
    import onnx
    import onnxruntime as ort

    model = onnx.load(str(onnx_path))
    onnx.checker.check_model(model)

    sess = ort.InferenceSession(str(onnx_path), providers=["CPUExecutionProvider"])
    inputs = sess.get_inputs()
    outputs = sess.get_outputs()
    print(f"  Inputs:  {[(i.name, i.shape) for i in inputs]}")
    print(f"  Outputs: {[(o.name, o.shape) for o in outputs]}")
    print(f"  ✓ ONNX valid + ORT session OK")


def main():
    parser = argparse.ArgumentParser(
        description="Export Ultralytics YOLO11 .pt weights to ONNX."
    )
    parser.add_argument(
        "--input-dir", required=True, type=Path,
        help="Directory containing .pt files, or path to a single .pt file.",
    )
    parser.add_argument(
        "--output-dir", required=True, type=Path,
        help="Directory to write .onnx files into.",
    )
    parser.add_argument(
        "--imgsz", type=int, default=640,
        help="Input image size (default: 640). Use 224 for patch classifiers.",
    )
    parser.add_argument(
        "--opset", type=int, default=17,
        help="ONNX opset version (default: 17).",
    )
    parser.add_argument(
        "--no-simplify", action="store_true",
        help="Skip onnx-simplifier pass.",
    )
    parser.add_argument(
        "--skip-verify", action="store_true",
        help="Skip post-export verification.",
    )
    args = parser.parse_args()

    # Collect .pt files
    input_path = args.input_dir.expanduser().resolve()
    if input_path.is_file():
        if input_path.suffix != ".pt":
            print(f"Error: {input_path} is not a .pt file", file=sys.stderr)
            sys.exit(1)
        pt_files = [input_path]
    elif input_path.is_dir():
        pt_files = sorted(input_path.glob("*.pt"))
        if not pt_files:
            print(f"Error: no .pt files found in {input_path}", file=sys.stderr)
            sys.exit(1)
    else:
        print(f"Error: {input_path} does not exist", file=sys.stderr)
        sys.exit(1)

    output_dir = args.output_dir.expanduser().resolve()
    output_dir.mkdir(parents=True, exist_ok=True)

    print(f"Found {len(pt_files)} model(s) to export")
    print(f"  Image size: {args.imgsz}")
    print(f"  Opset:      {args.opset}")
    print(f"  Simplify:   {not args.no_simplify}")
    print(f"  Output dir: {output_dir}")

    results = []
    errors = []

    for pt in pt_files:
        try:
            onnx_path = export_one(
                pt, output_dir,
                imgsz=args.imgsz,
                opset=args.opset,
                simplify=not args.no_simplify,
            )
            if not args.skip_verify:
                verify(onnx_path)
            results.append((pt.name, onnx_path))
        except Exception as exc:
            print(f"  ✗ FAILED: {exc}", file=sys.stderr)
            errors.append((pt.name, str(exc)))

    # Summary
    print(f"\n{'='*60}")
    print(f"Done: {len(results)} exported, {len(errors)} failed\n")

    for name, path in results:
        print(f"  ✓ {name} → {path.name}")
    for name, err in errors:
        print(f"  ✗ {name}: {err}")

    if errors:
        sys.exit(1)


if __name__ == "__main__":
    main()
