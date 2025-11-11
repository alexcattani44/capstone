\# Lightweight AI System for Mammography Analysis



A cost-effective, open-source AI system for breast cancer detection and risk prediction.



\## System Requirements



\- \*\*OS:\*\* Windows 10/11, Linux, or macOS

\- \*\*RAM:\*\* 8GB minimum, 16GB recommended

\- \*\*Storage:\*\* 10GB free space for dataset and models

\- \*\*GPU:\*\* Optional (CPU works fine for this project)



\## Features



\- 🔍 Mass detection using Digital Eye pretrained models

\- 🎯 Benign/malignant classification

\- 📊 5-year risk prediction

\- 🔥 Heatmap visualization (Grad-CAM)

\- 💻 Web interface with Streamlit

\- 🌐 Runs on CPU (no GPU required!)



\## Quick Start (Windows)



\### Setup

```bash

\# Clone repository

git clone https://github.com/yourusername/mammography-ai-capstone.git

cd mammography-ai-capstone



\# Create environment

conda env create -f environment.yml

conda activate mammography-ai

```



\### Verify Installation

```bash

python verify\_setup.py

```



\## Project Structure

```

mammography-ai-capstone/

├── data/              # Dataset files (git-ignored)

├── models/            # Pretrained and trained models

├── notebooks/         # Jupyter notebooks

├── src/               # Source code

│   ├── detection/     # Detection module

│   ├── classification/# Classification module

│   ├── risk\_prediction/# Risk prediction module

│   └── utils/         # Utility functions

├── configs/           # Configuration files

└── results/           # Results and outputs

```



\## Usage



\### Training

```bash

python src/train.py --config configs/config.yaml

```



\### Inference

```bash

python src/inference.py --image path/to/mammogram.png

```



\### Web Interface

```bash

streamlit run app.py

```



\## Performance



\*\*CPU Performance (AMD Ryzen 7):\*\*

\- Inference: ~300-500ms per image

\- Training (EfficientNet-B0): ~60 minutes per epoch



\*\*For faster training, use Google Colab (free GPU available)\*\*



\## Citation

```

\[Your capstone citation will go here]

```



\## Acknowledgements



\- \[Digital Eye for Mammography](https://github.com/cbddobvyz/digitaleye-mammography) for pretrained models

\- CBIS-DDSM dataset



\## License



MIT License

