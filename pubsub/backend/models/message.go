package models

import "time"

// Message represents a chat message
type Message struct {
	ID        string    `json:"id"`
	Content   string    `json:"content"`
	RoomNum   int       `json:"room_num"`
	Timestamp time.Time `json:"timestamp"`
}

// SendMessageRequest represents the request body for sending a message
type SendMessageRequest struct {
	Mes     string `json:"mes"`
	RoomNum int    `json:"room_num"`
}




