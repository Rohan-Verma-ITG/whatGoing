from typing import Any

from app.db.collections import messages_collection


async def create_message(document: dict[str, Any]) -> dict[str, Any]:
    result = await messages_collection().insert_one(document)
    created = await messages_collection().find_one({"_id": result.inserted_id})
    if not created:
        raise RuntimeError("Failed to create message")
    return created


async def list_messages(limit: int = 50) -> list[dict[str, Any]]:
    cursor = messages_collection().find().sort("created_at", -1).limit(limit)
    return await cursor.to_list(length=limit)
