from fastapi import APIRouter, Depends, WebSocket, WebSocketDisconnect

from app.core.dependencies import get_ws_user
from app.sockets.connection_manager import manager

router = APIRouter()


@router.websocket("/chat")
async def chat_socket(websocket: WebSocket, user: dict = Depends(get_ws_user)):
    room = "global"
    await manager.connect(websocket, user, room=room)
    await manager.broadcast_json({"type": "presence", "data": manager.presence_payload(room)}, room=room)

    try:
        while True:
            await websocket.receive_text()
    except WebSocketDisconnect:
        manager.disconnect(user["id"], room=room)
        await manager.broadcast_json({"type": "presence", "data": manager.presence_payload(room)}, room=room)
