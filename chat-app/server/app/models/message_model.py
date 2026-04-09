from dataclasses import dataclass
from datetime import UTC, datetime


@dataclass(slots=True)
class MessageModel:
    sender_id: str
    sender_name: str
    content: str
    created_at: datetime = datetime.now(UTC)
