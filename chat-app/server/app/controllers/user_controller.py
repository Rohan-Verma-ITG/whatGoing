from fastapi import HTTPException, status

from app.services.user_service import find_user_by_id


async def get_me_controller(user_id: str) -> dict:
    user = await find_user_by_id(user_id)
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")

    return {"id": str(user["_id"]), "email": user["email"], "display_name": user["display_name"]}
