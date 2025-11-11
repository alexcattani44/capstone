"""
Environment Setup Verification Script
Run this to ensure all dependencies are installed correctly.
"""

import sys

def verify_installation():
    """Check if all required packages are installed."""
    
    packages = {
        'torch': 'PyTorch',
        'torchvision': 'TorchVision',
        'numpy': 'NumPy',
        'pandas': 'Pandas',
        'matplotlib': 'Matplotlib',
        'cv2': 'OpenCV',
        'pydicom': 'PyDICOM',
        'mmcv': 'MMCV',
        'mmdet': 'MMDetection',
        'ultralytics': 'Ultralytics YOLO',
        'streamlit': 'Streamlit',
        'plotly': 'Plotly'
    }
    
    print("=" * 70)
    print("MAMMOGRAPHY AI - ENVIRONMENT VERIFICATION")
    print("=" * 70)
    print()
    
    # System info
    print("System Information:")
    print(f"  Python version: {sys.version.split()[0]}")
    print()
    
    # Check packages
    print("Package Installation Status:")
    print("-" * 70)
    
    failed = []
    for package, name in packages.items():
        try:
            module = __import__(package)
            version = getattr(module, '__version__', 'unknown')
            status = "✓"
            print(f"  {status} {name:25s} v{version}")
        except ImportError:
            status = "✗"
            print(f"  {status} {name:25s} NOT INSTALLED")
            failed.append(package)
    
    print("-" * 70)
    print()
    
    # Check PyTorch device
    try:
        import torch
        print("PyTorch Configuration:")
        print(f"  Device: CPU")
        print(f"  Version: {torch.__version__}")
        
        # Quick tensor test
        x = torch.rand(3, 3)
        print(f"  Test tensor: {x.shape} {'✓ OK' if x.shape == (3, 3) else '✗ Failed'}")
    except Exception as e:
        print(f"  ✗ PyTorch test failed: {e}")
    
    print()
    print("=" * 70)
    
    # Final verdict
    if failed:
        print(f"\n⚠ WARNING: {len(failed)} package(s) missing:")
        for pkg in failed:
            print(f"  - {pkg}")
        print("\nRun: pip install " + " ".join(failed))
        return False
    else:
        print("\n✅ SUCCESS! All packages installed correctly.")
        print("\n📝 Next steps:")
        print("  1. Download CBIS-DDSM dataset")
        print("  2. Run: jupyter notebook notebooks/01_data_exploration.ipynb")
        print("  3. Start with baseline model training")
        return True

if __name__ == '__main__':
    success = verify_installation()
    sys.exit(0 if success else 1)