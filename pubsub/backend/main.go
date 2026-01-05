package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/TadayoshiOtsuka/simple_chat/handlers"
)

func main() {
	// Create room manager
	roomManager := handlers.NewRoomManager()

	// Create message handler
	messageHandler := handlers.NewMessageHandler(roomManager)

	// Enable CORS
	corsHandler := func(next http.HandlerFunc) http.HandlerFunc {
		return func(w http.ResponseWriter, r *http.Request) {
			w.Header().Set("Access-Control-Allow-Origin", "*")
			w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
			w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

			if r.Method == "OPTIONS" {
				w.WriteHeader(http.StatusOK)
				return
			}

			next(w, r)
		}
	}

	// Setup routes with CORS
	http.HandleFunc("/", corsHandler(roomManager.HandleWebSocket))
	http.HandleFunc("/send", corsHandler(messageHandler.HandleSendMessage))

	fmt.Println("Server starting on localhost:8080")
	fmt.Println("WebSocket endpoint: localhost:8080/:room_number")
	fmt.Println("Send message endpoint: localhost:8080/send")

	log.Fatal(http.ListenAndServe(":8080", nil))
}
