package main

import (
	"fmt"
	"log"
)

type Room struct {
	name string

	registry *Registry

	// Registered clients.
	clients map[*Client]bool

	// Inbound messages from the clients.
	broadcast chan []byte

	// Register requests from the clients.
	register chan *Client

	// Unregister requests from clients.
	unregister chan *Client
}

func newRoom(name string, registry *Registry) *Room {
	return &Room{
		name:       name,
		registry:   registry,
		broadcast:  make(chan []byte),
		register:   make(chan *Client),
		unregister: make(chan *Client),
		clients:    make(map[*Client]bool),
	}
}

func (p *Room) run() {
	for {
		select {
		case client := <-p.register:
			log.Println(fmt.Sprintf("registering user '%s' with room '%s'", client.name, p.name))
			p.clients[client] = true
		case client := <-p.unregister:
			if _, ok := p.clients[client]; ok {
				log.Println(fmt.Sprintf("removing user '%s' from room '%s'", client.name, p.name))
				delete(p.clients, client)
				close(client.send)
			}
			if len(p.clients) == 0 {
				// unregister this room and stop this loop
				p.registry.unregister <- p
				return
			}
		case message := <-p.broadcast:
			for client := range p.clients {
				select {
				case client.send <- message:
				default:
					close(client.send)
					delete(p.clients, client)
				}
			}
		}
	}
}
