from datetime import UTC, datetime

from app.schemas.message_schema import MessageCreateRequest
from app.services.message_service import create_message, list_messages
from app.sockets.connection_manager import manager


def normalize_message(document: dict) -> dict:
    return {
        "id": str(document["_id"]),
        "sender_id": document["sender_id"],
        "sender_name": document["sender_name"],
        "content": document["content"],
        "created_at": document["created_at"],
    }


async def create_message_controller(payload: MessageCreateRequest, user: dict) -> dict:
    created = await create_message(
        {
            "sender_id": user["id"],
            "sender_name": user["display_name"],
            "content": payload.content,
            "created_at": datetime.now(UTC),
        }
    )
    normalized = normalize_message(created)
    await manager.broadcast_json({"type": "message", "data": normalized})
    return normalized


async def list_messages_controller(limit: int = 50) -> list[dict]:
    messages = await list_messages(limit)
    return [normalize_message(m) for m in messages]
