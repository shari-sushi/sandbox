package handlers

import (
	"log"
	"net/http"
	"sync"

	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true // Allow all origins for development
	},
}

// RoomManager manages WebSocket connections for each room
type RoomManager struct {
	rooms map[int]map[*websocket.Conn]bool
	mutex sync.RWMutex
}

// NewRoomManager creates a new room manager
func NewRoomManager() *RoomManager {
	return &RoomManager{
		rooms: make(map[int]map[*websocket.Conn]bool),
	}
}

// AddClient adds a client to a room
func (rm *RoomManager) AddClient(roomNum int, conn *websocket.Conn) {
	rm.mutex.Lock()
	defer rm.mutex.Unlock()

	if rm.rooms[roomNum] == nil {
		rm.rooms[roomNum] = make(map[*websocket.Conn]bool)
	}
	rm.rooms[roomNum][conn] = true
	log.Printf("Client added to room %d", roomNum)
}

// RemoveClient removes a client from a room
func (rm *RoomManager) RemoveClient(roomNum int, conn *websocket.Conn) {
	rm.mutex.Lock()
	defer rm.mutex.Unlock()

	if rm.rooms[roomNum] != nil {
		delete(rm.rooms[roomNum], conn)
		if len(rm.rooms[roomNum]) == 0 {
			delete(rm.rooms, roomNum)
		}
	}
	log.Printf("Client removed from room %d", roomNum)
}

// BroadcastToRoom sends a message to all clients in a room
func (rm *RoomManager) BroadcastToRoom(roomNum int, message []byte) {
	rm.mutex.RLock()
	defer rm.mutex.RUnlock()

	if rm.rooms[roomNum] != nil {
		for conn := range rm.rooms[roomNum] {
			if err := conn.WriteMessage(websocket.TextMessage, message); err != nil {
				log.Printf("Error sending message to client: %v", err)
				conn.Close()
				delete(rm.rooms[roomNum], conn)
			}
		}
	}
}

// HandleWebSocket handles WebSocket connections for room joining
func (rm *RoomManager) HandleWebSocket(w http.ResponseWriter, r *http.Request) {
	// Extract room number from URL path
	roomNum := extractRoomNumber(r.URL.Path)
	if roomNum == 0 {
		http.Error(w, "Invalid room number", http.StatusBadRequest)
		return
	}

	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Printf("WebSocket upgrade error: %v", err)
		return
	}
	defer conn.Close()

	// Add client to room
	rm.AddClient(roomNum, conn)
	defer rm.RemoveClient(roomNum, conn)

	// Keep connection alive and handle incoming messages
	for {
		_, _, err := conn.ReadMessage()
		if err != nil {
			log.Printf("WebSocket read error: %v", err)
			break
		}
	}
}

// extractRoomNumber extracts room number from URL path like "/123"
func extractRoomNumber(path string) int {
	if len(path) < 2 {
		return 0
	}

	// Remove leading slash
	roomStr := path[1:]

	// Simple conversion - in production, use strconv.Atoi with proper error handling
	var roomNum int
	for _, char := range roomStr {
		if char < '0' || char > '9' {
			return 0
		}
		roomNum = roomNum*10 + int(char-'0')
	}

	return roomNum
}




