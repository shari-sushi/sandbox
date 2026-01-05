import React, { useState } from "react";
import { useChatStore } from "../store/chatStore";
import { wsManager } from "../utils/websocket";

const MessageInput: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const isConnected = useChatStore((state) => state.isConnected);
  const roomNum = useChatStore((state) => state.roomNum);

  const handleSend = async () => {
    if (!input.trim() || !isConnected || roomNum === 0) {
      return;
    }

    const success = await wsManager.sendMessage(input.trim());
    if (success) {
      setInput("");
    } else {
      alert("メッセージの送信に失敗しました");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="message-input">
      <div className="input-group">
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={handleKeyPress} placeholder="メッセージを入力..." disabled={!isConnected || roomNum === 0} />
        <button onClick={handleSend} disabled={!input.trim() || !isConnected || roomNum === 0}>
          送信
        </button>
      </div>
      {!isConnected && roomNum > 0 && <p className="connection-status">接続中...</p>}
      {roomNum === 0 && <p className="connection-status">部屋番号を入力してください</p>}
    </div>
  );
};

export default MessageInput;
