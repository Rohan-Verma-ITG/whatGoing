from typing import Any

from bson import ObjectId

from app.db.collections import users_collection


async def create_user(document: dict[str, Any]) -> dict[str, Any]:
    result = await users_collection().insert_one(document)
    created = await users_collection().find_one({"_id": result.inserted_id})
    if not created:
        raise RuntimeError("Failed to create user")
    return created


async def find_user_by_email(email: str) -> dict[str, Any] | None:
    return await users_collection().find_one({"email": email})


async def find_user_by_id(user_id: str) -> dict[str, Any] | None:
    if not ObjectId.is_valid(user_id):
        return None
    return await users_collection().find_one({"_id": ObjectId(user_id)})
