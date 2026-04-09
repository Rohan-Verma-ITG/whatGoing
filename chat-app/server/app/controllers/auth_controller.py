from datetime import UTC, datetime

from fastapi import HTTPException, status

from app.core.security import create_access_token, hash_password, verify_password
from app.schemas.auth_schema import LoginRequest, SignupRequest
from app.services.user_service import create_user, find_user_by_email


async def signup_controller(payload: SignupRequest) -> dict:
    existing = await find_user_by_email(payload.email)
    if existing:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Email already in use")

    user = await create_user(
        {
            "email": payload.email,
            "display_name": payload.display_name,
            "password_hash": hash_password(payload.password),
            "created_at": datetime.now(UTC),
        }
    )

    token = create_access_token(str(user["_id"]))
    return {
        "access_token": token,
        "user": {"id": str(user["_id"]), "email": user["email"], "display_name": user["display_name"]},
    }


async def login_controller(payload: LoginRequest) -> dict:
    user = await find_user_by_email(payload.email)
    if not user or not verify_password(payload.password, user["password_hash"]):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")

    token = create_access_token(str(user["_id"]))
    return {
        "access_token": token,
        "user": {"id": str(user["_id"]), "email": user["email"], "display_name": user["display_name"]},
    }
