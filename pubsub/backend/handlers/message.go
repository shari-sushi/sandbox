package handlers

import (
	"encoding/json"
	"log"
	"net/http"
	"time"

	"github.com/TadayoshiOtsuka/simple_chat/models"
	"github.com/google/uuid"
)

// MessageHandler handles message sending
type MessageHandler struct {
	roomManager *RoomManager
}

// NewMessageHandler creates a new message handler
func NewMessageHandler(rm *RoomManager) *MessageHandler {
	return &MessageHandler{
		roomManager: rm,
	}
}

// HandleSendMessage handles POST requests to /send
func (mh *MessageHandler) HandleSendMessage(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var req models.SendMessageRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid JSON", http.StatusBadRequest)
		return
	}

	// Validate request
	if req.Mes == "" {
		http.Error(w, "Message content cannot be empty", http.StatusBadRequest)
		return
	}

	if req.RoomNum <= 0 {
		http.Error(w, "Invalid room number", http.StatusBadRequest)
		return
	}

	// Create message
	message := models.Message{
		ID:        uuid.New().String(),
		Content:   req.Mes,
		RoomNum:   req.RoomNum,
		Timestamp: time.Now(),
	}

	// Convert message to JSON
	messageJSON, err := json.Marshal(message)
	if err != nil {
		log.Printf("Error marshaling message: %v", err)
		http.Error(w, "Internal server error", http.StatusInternalServerError)
		return
	}

	// Broadcast message to room
	mh.roomManager.BroadcastToRoom(req.RoomNum, messageJSON)

	// Send response
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	response := map[string]string{
		"status":  "success",
		"message": "Message sent successfully",
	}
	json.NewEncoder(w).Encode(response)

	log.Printf("Message sent to room %d: %s", req.RoomNum, req.Mes)
}




