from typing import Dict
import logging
import json

from fastapi.logger import logger
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.responses import HTMLResponse

from .connections import ConnectionManager

logging.basicConfig(level=logging.INFO)

app = FastAPI()

manager = ConnectionManager()

@app.websocket("/ws/{user_name}/{room_name}")
async def websocket_endpoint(
        websocket: WebSocket,
        user_name: str,
        room_name: str,
):
    # connect newcomer to this hellscape
    await manager.connect(room_name, user_name, websocket)
    try:
        while True:
            data = await websocket.receive_text()
            await manager.broadcast(room_name, user_name, data)
            # await websocket.send_text(f"Message text was: {data}")
    except WebSocketDisconnect:
        await manager.disconnect(room_name, user_name)
