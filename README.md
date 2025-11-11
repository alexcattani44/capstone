# Lightweight AI System for Mammography Analysis

A cost-effective, open-source AI system for breast cancer detection and risk prediction.

## System Requirements

- **OS:** Windows 10/11, Linux, or macOS

- **RAM:** 8GB minimum, 16GB recommended

- **Storage:** 10GB free space for dataset and models

- **GPU:** Optional (CPU works fine for this project)

## Features

- Mass detection using Digital Eye pretrained models

- Benign/malignant classification

- 5-year risk prediction

- Heatmap visualization (Grad-CAM)

- Web interface with Streamlit

- Runs on CPU (no GPU required!)

## Quick Start (Windows)

### Setup

```bash

# Clone repository

git clone https://github.com/alexcattani44/capstone.git

cd capstone



# Create environment

conda env create -f environment.yml

conda activate capstone

```

### Verify Installation

```bash

python verify_setup.py

```

## Project Structure

```

capstone/

├── data/                   # Dataset files (git-ignored, folder included)
├── models/                 # Pretrained and trained models
├── notebooks/              # Jupyter notebooks
├── src/                    # Source code
│   ├── detection/          # Detection module
│   ├── classification/     # Classification module
│   ├── risk_prediction/    # Risk prediction module
│   └── utils/              # Utility functions
├── configs/                # Configuration files
└── results/                # Results and outputs

```

## Usage

### Training (not implemented)

```bash

python src/train.py --config configs/config.yaml

```

### Inference (not implemented)

```bash

python src/inference.py --image path/to/mammogram.png

```

### Web Interface (not implemented)

```bash

streamlit run app.py

```

## Performance (estimates from research)

**CPU Performance (AMD Ryzen 7):**

- Inference: ~300-500ms per image

- Training (EfficientNet-B0): ~60 minutes per epoch

## Citation

```



```

## Acknowledgements

- [Digital Eye for Mammography](https://github.com/cbddobvyz/digitaleye-mammography) for pretrained models

- CBIS-DDSM dataset

## License

MIT License
