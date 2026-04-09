from datetime import datetime

from pydantic import BaseModel, Field


class MessageCreateRequest(BaseModel):
    content: str = Field(min_length=1, max_length=2000)


class MessageResponse(BaseModel):
    id: str
    sender_id: str
    sender_name: str
    content: str
    created_at: datetime


class PresenceUser(BaseModel):
    id: str
    display_name: str
