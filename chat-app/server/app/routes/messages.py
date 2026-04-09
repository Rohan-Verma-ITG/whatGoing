from fastapi import APIRouter, Depends, Query

from app.controllers.message_controller import create_message_controller, list_messages_controller
from app.core.dependencies import get_current_user
from app.schemas.message_schema import MessageCreateRequest, MessageResponse

router = APIRouter()


@router.get("", response_model=list[MessageResponse])
async def get_messages(limit: int = Query(default=50, ge=1, le=200), user: dict = Depends(get_current_user)):
    _ = user
    return await list_messages_controller(limit)


@router.post("", response_model=MessageResponse, status_code=201)
async def create_message(payload: MessageCreateRequest, user: dict = Depends(get_current_user)):
    return await create_message_controller(payload, user)
