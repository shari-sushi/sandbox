import React, { useState, useEffect } from "react";
import { useChatStore } from "../store/chatStore";
import { wsManager } from "../utils/websocket";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";

const ChatRoom: React.FC = () => {
  const [roomInput, setRoomInput] = useState<string>("");
  const { roomNum, setRoomNum, clearMessages, isConnected } = useChatStore();

  const handleJoinRoom = () => {
    const roomNumber = parseInt(roomInput);
    if (roomNumber > 0) {
      setRoomNum(roomNumber);
      clearMessages();
      wsManager.connect(roomNumber);
    } else {
      alert("有効な部屋番号を入力してください");
    }
  };

  const handleLeaveRoom = () => {
    wsManager.disconnect();
    setRoomNum(0);
    clearMessages();
    setRoomInput("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleJoinRoom();
    }
  };

  useEffect(() => {
    // Cleanup on component unmount
    return () => {
      wsManager.disconnect();
    };
  }, []);

  return (
    <div className="chat-room">
      <div className="room-controls">
        {roomNum === 0 ? (
          <div className="join-room">
            <h2>チャットルームに参加</h2>
            <div className="input-group">
              <input type="number" value={roomInput} onChange={(e) => setRoomInput(e.target.value)} onKeyPress={handleKeyPress} placeholder="部屋番号を入力" min="1" />
              <button onClick={handleJoinRoom}>参加</button>
            </div>
          </div>
        ) : (
          <div className="room-info">
            <h2>ルーム {roomNum}</h2>
            <div className="connection-indicator">
              <span className={`status ${isConnected ? "connected" : "disconnected"}`}>{isConnected ? "接続中" : "切断中"}</span>
            </div>
            <button onClick={handleLeaveRoom} className="leave-button">
              ルームを退出
            </button>
          </div>
        )}
      </div>

      {roomNum > 0 && (
        <div className="chat-content">
          <MessageList />
          <MessageInput />
        </div>
      )}
    </div>
  );
};

export default ChatRoom;
