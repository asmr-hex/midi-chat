from fastapi import WebSocket


class ConnectionManager:
    def __init__(self):
        self.active_rooms: Dict[str, Dict[str, WebSocket]] = {}

    async def connect(self, room_name: str, user_name: str, websocket: WebSocket):
        await websocket.accept()
        if room_name in self.active_rooms:
            self.active_rooms[room_name][user_name] = websocket
        else:
            self.active_rooms[room_name] = {user_name: websocket}
        # let everyone know this clowns here
        for name, ws in self.active_rooms[room_name].items():
            if name is user_name:
                await ws.send_text(json.dumps({'type': 'allFoes', 'data': [f for f in self.active_rooms[room_name].keys() if f != user_name]}))
            else:
                await ws.send_text(json.dumps({'type': 'foeJoined', 'data': user_name}))

    async def disconnect(self, room_name: str, user_name: str):
        del self.active_rooms[room_name][user_name]
        if len(self.active_rooms[room_name]) == 0:
            del self.active_rooms[room_name]
        else:
            # let everyone else know this clown left
            for name, ws in self.active_rooms[room_name].items():
                await ws.send_text(json.dumps({'type': 'foeLeft', 'data': user_name}))
        
        logger.info(f'"{user_name}" logged out of "{room_name}" ')

    async def send_personal_message(self, room_name: str, from_user: str, to_user: str, message: str):
        await self.active_rooms[room_name][to_user].send_text(message)

    async def broadcast(self, room_name: str, user_name: str, message: str):
        for name, connection in self.active_rooms[room_name].items():
            # if name is user_name:
            #     continue
            await connection.send_text(message)
