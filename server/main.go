package main

import (
	"flag"
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

var addr = flag.String("addr", ":8080", "http service address")

func main() {
	flag.Parse()
	registry := newRegistry()

	go registry.run()

	r := mux.NewRouter()
	r.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "OK")
	})
	r.HandleFunc("/{room}", func(w http.ResponseWriter, r *http.Request) {
		vars := mux.Vars(r)
		log.Println("client connecting to room ", vars["room"])
		ServeWs(vars["room"], registry, w, r)
	})

	log.Println("listening on ", *addr)
	err := http.ListenAndServe(*addr, r)
	if err != nil {
		log.Fatal("ListenAndServe: ", err)
	}
}
