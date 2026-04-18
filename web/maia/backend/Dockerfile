# OpenMAIA backend image.
#
# Build context must be web/maia/ so the image can include both backend/
# and the models/ directory:
#
#   cd web/maia
#   docker build -f backend/Dockerfile -t maia-backend .
#   docker run -p 8000:8000 maia-backend
#
# The image honors $PORT (default 8000), which is what Hugging Face Spaces,
# Cloud Run, Render and Fly.io all inject for the app to listen on.

FROM python:3.11-slim AS base

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=1 \
    PIP_DISABLE_PIP_VERSION_CHECK=1

# System deps:
#   libgl1 / libglib2.0-0    — Pillow/onnxruntime runtime libs on slim
#   curl                     — health checks
RUN apt-get update \
 && apt-get install -y --no-install-recommends \
        libgl1 \
        libglib2.0-0 \
        curl \
 && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Install Python deps first for better layer caching
COPY backend/requirements.txt /app/backend/requirements.txt
RUN pip install --upgrade pip \
 && pip install -r /app/backend/requirements.txt

# Copy backend code
COPY backend /app/backend

# Copy ONNX models into the image. Models are expected at web/maia/models/
# during build (assumes the user has placed them there).
# If models/ doesn't exist this will fail — comment out and mount a volume
# at runtime instead for dev.
COPY models /app/models

# Optional: copy the built frontend into the image for single-container
# deployment. Requires `npm run build` to have been run locally first.
# Uncomment if you want the backend to also serve the SPA:
# COPY dist /app/dist

# Create uploads directory (writable for the non-root user below)
RUN mkdir -p /app/uploads && chmod 777 /app/uploads

ENV MAIA_MODELS_DIR=/app/models \
    MAIA_UPLOADS_DIR=/app/uploads \
    MAIA_LOG_LEVEL=INFO \
    PORT=8000

# Run as non-root
RUN useradd --create-home --uid 1000 maia \
 && chown -R maia:maia /app
USER maia

WORKDIR /app/backend

EXPOSE 8000

# Shell form so $PORT is expanded by the shell at runtime.
CMD uvicorn app:app --host 0.0.0.0 --port ${PORT}