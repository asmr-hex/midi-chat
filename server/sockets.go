package main

import (
	"log"
	"net/http"

	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin:     func(r *http.Request) bool { return true }, // TODO eventually only whitelist the app url
}

// serveWs handles websocket requests from the peer.
func ServeWs(roomName string, userName string, registry *Registry, w http.ResponseWriter, r *http.Request) {
	// upgrade to web sockets
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println(err)
		return
	}

	// get room in registry if necessary (created if doesn't exist)
	room := registry.get(roomName)

	// create a new connection
	client := &Client{name: userName, room: room, conn: conn, send: make(chan []byte, 256)}

	// add new client to existing room in registry
	room.register <- client

	// start listening to new connection
	go client.write()
	go client.read()
}
