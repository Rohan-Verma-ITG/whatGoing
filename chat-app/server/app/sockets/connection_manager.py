from collections import defaultdict

from fastapi import WebSocket


class ConnectionManager:
    def __init__(self):
        self.connections: dict[str, WebSocket] = {}
        self.online_users: dict[str, dict] = {}
        self.room_index: dict[str, set[str]] = defaultdict(set)

    async def connect(self, websocket: WebSocket, user: dict, room: str = "global"):
        await websocket.accept()
        self.connections[user["id"]] = websocket
        self.online_users[user["id"]] = user
        self.room_index[room].add(user["id"])

    def disconnect(self, user_id: str, room: str = "global"):
        self.connections.pop(user_id, None)
        self.online_users.pop(user_id, None)
        self.room_index[room].discard(user_id)

    async def broadcast_json(self, payload: dict, room: str = "global"):
        for user_id in list(self.room_index[room]):
            socket = self.connections.get(user_id)
            if socket:
                await socket.send_json(payload)

    def presence_payload(self, room: str = "global") -> list[dict]:
        return [
            {"id": user_id, "display_name": self.online_users[user_id]["display_name"]}
            for user_id in self.room_index[room]
            if user_id in self.online_users
        ]


manager = ConnectionManager()
