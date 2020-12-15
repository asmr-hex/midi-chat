package main

import "log"

type Registry struct {
	rooms      map[string]*Room
	unregister chan *Room
}

func newRegistry() *Registry {
	return &Registry{
		rooms:      make(map[string]*Room),
		unregister: make(chan *Room),
	}
}

func (r *Registry) run() {
	for {
		select {
		case room := <-r.unregister:
			log.Println("deleting room: ", room.name)
			if _, ok := r.rooms[room.name]; ok {
				delete(r.rooms, room.name)
			}
		}
	}
}

func (r *Registry) get(name string) *Room {
	if _, ok := r.rooms[name]; !ok {
		log.Println("creating new room: ", name)
		r.rooms[name] = newRoom(name, r)
		go r.rooms[name].run()
	}

	return r.rooms[name]
}
