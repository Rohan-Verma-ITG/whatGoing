from dataclasses import dataclass
from datetime import UTC, datetime


@dataclass(slots=True)
class UserModel:
    email: str
    password_hash: str
    display_name: str
    created_at: datetime = datetime.now(UTC)
