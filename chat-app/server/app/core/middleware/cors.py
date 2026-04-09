import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

DEFAULT_CLIENT_ORIGINS = [
    "http://localhost:5174",
    "http://192.168.11.97:5174",
    "http://localhost:5173",
    "http://192.168.11.97:5173",
]


def _parse_client_origins() -> list[str]:
    raw_origins = os.getenv("CLIENT_ORIGIN")
    if not raw_origins:
        return DEFAULT_CLIENT_ORIGINS

    return [origin.strip().rstrip("/") for origin in raw_origins.split(",") if origin.strip()]


def configure_cors(app: FastAPI) -> None:
    # CORS is required so browser-based frontends can call API routes and pass preflight checks.
    app.add_middleware(
        CORSMiddleware,
        allow_origins=_parse_client_origins(),
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
