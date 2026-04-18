# Deploying OpenMAIA

OpenMAIA is two separate pieces:

1. **Frontend** — a Vite React SPA (static files). Easy to host for free.
2. **Backend** — a FastAPI app that loads ~100–400 MB of ONNX models into
   memory and runs CPU inference per request. **This is where the interesting
   constraints live.**

Below is a free-tier friendly recipe and the reasoning behind it.

---

## TL;DR

| Piece                  | Recommended host                            | Why                                                                                            |
| ---------------------- | ------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| Frontend (SPA)         | **Vercel** (free)                           | Instant, global CDN, `vercel.json` already in repo                                             |
| Backend (FastAPI ONNX) | **Hugging Face Spaces (Docker SDK)** (free) | 16 GB RAM / 2 vCPU, persistent container, no cold starts on free tier, native fit for ML demos |
| Alt backend            | Google Cloud Run (free tier)                | If you prefer GCP; cold start ~5–20 s                                                          |
| Alt backend            | Render Web Service (free)                   | Easiest Git-push deploy; 512 MB RAM is tight for four ONNX models, sleeps after 15 min idle    |

> **Can I just put everything on Vercel?** Short answer: **no, not the backend.**
> See [Why not Vercel for the backend](#why-not-vercel-for-the-backend) below.

---

## Why not Vercel for the backend

Vercel runs Python as **serverless functions** on AWS Lambda, which gives you:

- **250 MB unzipped deployment cap.** `onnxruntime` alone is ~40 MB;
  `numpy` `Pillow` `pydicom` `fastapi` add another ~80 MB; four ONNX
  models can easily push you past the cap, and there is no way to increase it
  on the free plan.
- **No persistent container.** Every invocation can hit a cold start that
  re-imports `onnxruntime` and reloads all four models from disk. Cold start
  for this app realistically runs 10–30 s — longer than the free-tier
  execution limit on the Hobby plan (10 s per request; 60 s on Pro).
- **No shared memory between invocations.** Two concurrent requests load
  models twice.
- **Ephemeral filesystem.** Only `/tmp` is writable, which is fine for our
  temporary uploads but means we cannot ship models on the side.

Vercel is still great for the **frontend** (it is just static files), so we
use it there.

---

## Part A — Backend on Hugging Face Spaces (recommended)

Hugging Face Spaces has a "Docker" SDK that runs an arbitrary `Dockerfile`.
Free CPU Spaces currently give you **16 GB RAM, 2 vCPU, and persistent
storage** — more than enough for this app. The Space stays warm as long as
there is occasional traffic and is automatically HTTPS.

### Prerequisites

- A Hugging Face account.
- The four ONNX models placed at `web/maia/models/`:
  - `mass_yolo.onnx`
  - `calc_yolo.onnx`
  - `mass_patch.onnx`
  - `calc_patch.onnx`
- The `huggingface_hub` CLI (`pip install huggingface_hub`) or just the
  Spaces web UI.

### Steps

1. **Create a new Space** at <https://huggingface.co/new-space>
   - Owner: your username
   - Space name: `maia-backend` (or whatever)
   - License: pick one (MIT to match the repo)
   - SDK: **Docker** → **Blank template**
   - Hardware: **CPU basic (free)**

2. **Clone the new Space locally** (it's a git repo):

   ```bash
   git clone https://huggingface.co/spaces/<your-username>/maia-backend
   cd maia-backend
   ```

3. **Copy the backend and models into the Space**:

   ```bash
   # From inside the maia-backend/ Space clone
   cp -r /path/to/capstone/web/maia/backend ./backend
   cp -r /path/to/capstone/web/maia/models  ./models
   cp /path/to/capstone/web/maia/backend/Dockerfile ./Dockerfile
   ```

   > Move the Dockerfile to the Space **root** — Spaces expects
   > `./Dockerfile` at the top of the repo.

4. **Adjust the Dockerfile paths** if you moved things. The committed
   `Dockerfile` assumes build context = `web/maia/` (so it can copy both
   `backend/` and `models/`). On a Space the build context is the Space root,
   which now contains `backend/` and `models/` directly — no edits needed.

5. **Add a Space README header** so Spaces knows how to run it. Create a
   `README.md` in the Space root that starts with:

   ```yaml
   ---
   title: MAIA Backend
   emoji: 🩻
   colorFrom: blue
   colorTo: pink
   sdk: docker
   app_port: 8000
   pinned: false
   ---
   ```

   The important line is `app_port: 8000`, which must match the `EXPOSE` in
   the Dockerfile.

6. **Push**. The models directory will be ~100–400 MB. Spaces uses Git LFS
   for large files:

   ```bash
   git lfs install
   git lfs track "*.onnx"
   git add .gitattributes Dockerfile README.md backend models
   git commit -m "Initial MAIA backend"
   git push
   ```

7. **Wait for the build** (~3–5 minutes first time) in the Space's Logs tab.
   When it reports "Running," hit
   `https://<your-username>-maia-backend.hf.space/api/health` — you should
   get:

   ```json
   {
     "status": "ok",
     "models": {
       "yolo_mass": true,
       "yolo_calc": true,
       "patch_mass": true,
       "patch_calc": true
     },
     "any_models_loaded": true
   }
   ```

8. **Set CORS**. In the Space settings → Variables and secrets, add:
   ```
   MAIA_CORS_ORIGINS = https://<your-vercel-app>.vercel.app,http://localhost:5173
   ```
   Rebuild the Space (Settings → Factory rebuild) so the new env is picked up.

Your backend base URL is now `https://<your-username>-maia-backend.hf.space`.

---

## Part B — Frontend on Vercel

### Prerequisites

- A Vercel account (free Hobby plan is fine).
- The backend deployed (from Part A) so you have a URL for `VITE_API_BASE`.

### Steps

1. **Point Vercel at the repo**:
   - Import <https://github.com/alexcattani44/capstone> in Vercel.
   - **Root directory**: `web/maia`
   - **Framework Preset**: Vite (auto-detected; `vercel.json` is in the repo)
   - **Build command**: `npm run build` (default)
   - **Output directory**: `dist` (default)

2. **Add the environment variable** (Settings → Environment Variables):

   ```
   VITE_API_BASE = https://<your-username>-maia-backend.hf.space
   ```

   Apply to **Production, Preview, and Development**.

   > Vite inlines env vars at build time, so you must redeploy after
   > changing this value — it is not read at runtime.

3. **Deploy**. First build takes ~1 minute. Subsequent commits to
   `claude/audit-maia-mvp-plan-yLM7C` (or whichever branch you configure)
   will auto-deploy.

4. **Smoke test the deployed app**:
   - Open the Vercel URL.
   - Upload a mammogram (JPEG/PNG/DICOM).
   - Check the browser DevTools Network tab: the request should go to your
     `hf.space` URL and return within a few seconds.

---

## Alternative backends (if HF Spaces doesn't fit)

### Google Cloud Run (free tier)

Pros: generous free tier (2M req/month, 180k vCPU-sec), scales to zero, real
HTTPS endpoint, any image size up to 10 GB.
Cons: cold starts reload models; needs a GCP project and `gcloud` CLI.

```bash
cd web/maia
gcloud builds submit --tag gcr.io/<project>/maia-backend -f backend/Dockerfile .
gcloud run deploy maia-backend \
  --image gcr.io/<project>/maia-backend \
  --platform managed --region us-central1 \
  --memory 2Gi --cpu 2 --timeout 120 \
  --allow-unauthenticated \
  --set-env-vars "MAIA_CORS_ORIGINS=https://<your-vercel-app>.vercel.app"
```

`--memory 2Gi --cpu 2` is recommended — the free tier allows up to 4 GB/2 CPU.

### Render (Web Service, free)

Pros: simplest "connect a GitHub repo" flow.
Cons: **512 MB RAM on free tier**. Four ONNX models, numpy, onnxruntime
will be tight. The service sleeps after 15 min idle (30 s cold start).
If you go this route: only load two of the four models, or upgrade to the
paid Starter tier ($7/mo → 512 MB still, but no sleeping) / Standard ($25/mo
→ 2 GB).

Configuration in Render dashboard:

- Environment: **Docker**
- Dockerfile path: `backend/Dockerfile`
- Docker build context: `web/maia`
- Env vars: `MAIA_CORS_ORIGINS=...`

### Fly.io

Free tier was effectively retired — expect to enter a card. If you do, the
smallest `shared-cpu-1x` machine with 1 GB RAM runs this fine.

---

## Secrets and configuration summary

### Backend env vars (set in HF Spaces / Cloud Run / Render)

| Var                  | Purpose                                 | Default                                                             |
| -------------------- | --------------------------------------- | ------------------------------------------------------------------- |
| `MAIA_CORS_ORIGINS`  | Comma-separated list of allowed origins | `http://localhost:3000,http://localhost:5173,http://localhost:8000` |
| `MAIA_MODELS_DIR`    | Absolute path to ONNX models            | `/app/models` in Docker                                             |
| `MAIA_UPLOADS_DIR`   | Writable temp dir                       | `/app/uploads` in Docker                                            |
| `MAIA_MAX_UPLOAD_MB` | Upload size cap                         | `25`                                                                |
| `MAIA_LOG_LEVEL`     | `DEBUG`/`INFO`/`WARNING`/`ERROR`        | `INFO`                                                              |
| `PORT`               | Port to listen on                       | `8000` (HF Spaces sets `7860`)                                      |

### Frontend env vars (set in Vercel)

| Var             | Purpose                                                                 |
| --------------- | ----------------------------------------------------------------------- |
| `VITE_API_BASE` | Full HTTPS URL of the backend, e.g. `https://abc-maia-backend.hf.space` |

---

## Verification checklist

- [ ] `curl https://<backend-url>/api/health` returns `any_models_loaded: true`
- [ ] `curl https://<backend-url>/docs` loads the FastAPI Swagger UI
- [ ] Vercel-hosted frontend loads without console errors
- [ ] Uploading a JPEG mammogram returns detections and heatmap within ~10 s
- [ ] Uploading a DICOM returns detections (requires `pydicom`, now enabled)
- [ ] Oversized upload (>25 MB) returns HTTP 413 with a readable message
- [ ] Invalid file type returns HTTP 400 with a readable message
- [ ] CORS preflight from the Vercel origin succeeds (check Network tab)

---

## Resources you still need from someone

Even with the above, a few things cannot come from code alone:

1. **The ONNX models.** The Dockerfile `COPY models /app/models` line will
   fail at build time if `web/maia/models/` is empty. You need trained or
   converted weights for `mass_yolo.onnx`, `calc_yolo.onnx`, `mass_patch.onnx`,
   `calc_patch.onnx`. Either:
   - Convert the Digital Eye pretrained PyTorch models to ONNX with
     `torch.onnx.export`, or
   - Train your own on CBIS-DDSM and export.

2. **A labeled test set** (5–10 mammograms with known ground truth) for the
   smoke test step in the verification checklist. PHI-stripped.

3. **A Hugging Face account** (free) — needed if you follow Part A.

4. **A Vercel account** (free) — needed if you follow Part B.

5. **Optional: a custom domain.** Both Vercel and HF Spaces support custom
   domains on the free tier.

6. **A clinician / domain reviewer for the disclaimer copy.** Before exposing
   this publicly, the "Research Prototype — not for clinical use" banner in
   the UI should be reviewed by someone who understands the regulatory
   context.

---

## Cost at rest

- Vercel Hobby: **$0** (SPA; bandwidth is the only metered resource)
- HF Spaces CPU basic: **$0** (2 vCPU, 16 GB RAM, persistent)
- Domain (optional): ~$10–15/yr

Total for the recommended setup: **$0/month**.
