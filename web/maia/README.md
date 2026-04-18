# OpenMAIA Prototype

-This is a code bundle for OpenMAIA. The original project from Figma Make is available at https://www.figma.com/design/MZRvNYcVF5bGyOGAVK8YEO/Functional-Componentized-Design.
OpenMAIA is the web product for the Lightweight AI System for Mammography
Analysis capstone. It is a Vite React frontend and a FastAPI backend that
runs ONNX mammography models on CPU.

-## Running the code
The initial UI was bootstrapped from Figma Make:
<https://www.figma.com/design/MZRvNYcVF5bGyOGAVK8YEO/Functional-Componentized-Design>

-Run `npm i` to install the dependencies.

## Local development

## -Run `npm run dev` to start the development server.

-### For backend server:

### Frontend

```bash
cd web/maia
npm install
npm run dev         # Vite dev server on http://localhost:5173

-cd backend
```

Copy .env.example to .env.local and set VITE_API_BASE if your backend
isn't at http://localhost:8000.

### Backend

```bash
cd web/maia/backend
pip install -r requirements.txt
uvicorn app:app --reload --port 8000
```

The backend expects ONNX models at `web/maia/models/`:

- `mass_yolo.onnx`
- `calc_yolo.onnx`
- `mass_patch.onnx`
- `calc_patch.onnx`

If any are missing, `/api/health` will report `any_models_loaded: false` and
`/api/analyze` will return `503 No models loaded`.

Configuration lives in environment variables — see `backend/.env.example` for
the full list (`MAIA_CORS_ORIGINS`, `MAIA_MODELS_DIR`, `MAIA_MAX_UPLOAD_MB`,
etc.).

## Deployment

See [`DEPLOYMENT.md`](./DEPLOYMENT.md) for a free-tier recipe (Vercel for the
frontend, Hugging Face Spaces for the backend) plus alternatives and the
reasoning about why Vercel won't host the FastAPI backend itself.

## Project layout

```

web/maia/
├── backend/
│ ├── app.py FastAPI app, routing, validation
│ ├── inference.py ONNX pipeline (YOLO patch classifier)
│ ├── requirements.txt
│ ├── Dockerfile Used for HF Spaces / Cloud Run / Render
│ └── .env.example
├── src/ React app
│ └── app/
│ ├── App.tsx
│ ├── components/
│ └── utils/
│ ├── openmaia.ts API client (reads VITE_API_BASE)
│ └── useMammogramAnalysis.ts
├── models/ ONNX weights (git-ignored; provide yourself)
├── vite.config.ts
├── vercel.json Vercel build config
├── DEPLOYMENT.md
└── README.md (this file)

```
