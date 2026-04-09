from fastapi import APIRouter

from app.controllers.auth_controller import login_controller, signup_controller
from app.schemas.auth_schema import AuthResponse, LoginRequest, SignupRequest

router = APIRouter()


@router.post("/signup", response_model=AuthResponse, status_code=201)
async def signup(payload: SignupRequest):
    return await signup_controller(payload)


@router.post("/login", response_model=AuthResponse)
async def login(payload: LoginRequest):
    return await login_controller(payload)
