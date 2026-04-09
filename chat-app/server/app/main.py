from contextlib import asynccontextmanager
import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.db.database import connect_to_mongo, disconnect_mongo
from app.routes import auth, messages, users
from app.sockets.chat_socket import router as chat_socket_router


@asynccontextmanager
async def lifespan(_: FastAPI):
    await connect_to_mongo()
    yield
    await disconnect_mongo()


app = FastAPI(title="Chat App API", version="1.0.0", lifespan=lifespan)

# CORS must explicitly allow frontend origins so browsers can call this API.
# CLIENT_ORIGIN supports comma-separated values for multi-environment setups.
origins = [
    origin.strip()
    for origin in os.getenv(
        "CLIENT_ORIGIN",
        "http://localhost:5173,http://192.168.11.97:5173",
    ).split(",")
    if origin.strip()
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins or [settings.client_origin],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/api/v1/auth", tags=["auth"])
app.include_router(users.router, prefix="/api/v1/users", tags=["users"])
app.include_router(messages.router, prefix="/api/v1/messages", tags=["messages"])
app.include_router(chat_socket_router, prefix="/ws", tags=["socket"])


@app.get("/health", tags=["health"])
async def health_check() -> dict[str, str]:
    return {"status": "ok"}
