from fastapi import APIRouter, Depends

from app.controllers.user_controller import get_me_controller
from app.core.dependencies import get_current_user
from app.schemas.auth_schema import UserResponse

router = APIRouter()


@router.get("/me", response_model=UserResponse)
async def get_me(user: dict = Depends(get_current_user)):
    return await get_me_controller(user["id"])
