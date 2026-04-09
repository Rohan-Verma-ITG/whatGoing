from contextlib import asynccontextmanager

from fastapi import FastAPI

from app.core.middleware import configure_cors
from app.db.database import connect_to_mongo, disconnect_mongo
from app.routes import auth, messages, users
from app.sockets.chat_socket import router as chat_socket_router


@asynccontextmanager
async def lifespan(_: FastAPI):
    await connect_to_mongo()
    yield
    await disconnect_mongo()


app = FastAPI(title="Chat App API", version="1.0.0", lifespan=lifespan)

configure_cors(app)

app.include_router(auth.router, prefix="/api/v1/auth", tags=["auth"])
app.include_router(users.router, prefix="/api/v1/users", tags=["users"])
app.include_router(messages.router, prefix="/api/v1/messages", tags=["messages"])
app.include_router(chat_socket_router, prefix="/ws", tags=["socket"])


@app.get("/health", tags=["health"])
async def health_check() -> dict[str, str]:
    return {"status": "ok"}
