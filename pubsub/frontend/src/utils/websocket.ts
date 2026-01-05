import { Message, SendMessageRequest } from "../types/message";
import { useChatStore } from "../store/chatStore";

class WebSocketManager {
  private ws: WebSocket | null = null;
  private roomNum: number = 0;
  private reconnectAttempts: number = 0;
  private maxReconnectAttempts: number = 5;
  private reconnectDelay: number = 1000;

  connect(roomNum: number): void {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.disconnect();
    }

    this.roomNum = roomNum;
    const wsUrl = `ws://localhost:8080/${roomNum}`;

    try {
      this.ws = new WebSocket(wsUrl);
      this.setupEventListeners();
    } catch (error) {
      console.error("WebSocket connection error:", error);
      useChatStore.getState().setConnected(false);
    }
  }

  private setupEventListeners(): void {
    if (!this.ws) return;

    this.ws.onopen = () => {
      console.log(`Connected to room ${this.roomNum}`);
      useChatStore.getState().setConnected(true);
      this.reconnectAttempts = 0;
    };

    this.ws.onmessage = (event) => {
      try {
        const message: Message = JSON.parse(event.data);
        useChatStore.getState().addMessage(message);
      } catch (error) {
        console.error("Error parsing message:", error);
      }
    };

    this.ws.onclose = () => {
      console.log("WebSocket connection closed");
      useChatStore.getState().setConnected(false);
      this.attemptReconnect();
    };

    this.ws.onerror = (error) => {
      console.error("WebSocket error:", error);
      useChatStore.getState().setConnected(false);
    };
  }

  private attemptReconnect(): void {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      console.log(`Attempting to reconnect... (${this.reconnectAttempts}/${this.maxReconnectAttempts})`);

      setTimeout(() => {
        this.connect(this.roomNum);
      }, this.reconnectDelay * this.reconnectAttempts);
    } else {
      console.error("Max reconnection attempts reached");
    }
  }

  disconnect(): void {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    useChatStore.getState().setConnected(false);
  }

  async sendMessage(content: string): Promise<boolean> {
    if (!content.trim()) {
      return false;
    }

    const messageData: SendMessageRequest = {
      mes: content,
      room_num: this.roomNum,
    };

    try {
      const response = await fetch("http://localhost:8080/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(messageData),
      });

      if (response.ok) {
        return true;
      } else {
        console.error("Failed to send message:", response.statusText);
        return false;
      }
    } catch (error) {
      console.error("Error sending message:", error);
      return false;
    }
  }

  isConnected(): boolean {
    return this.ws !== null && this.ws.readyState === WebSocket.OPEN;
  }
}

export const wsManager = new WebSocketManager();
