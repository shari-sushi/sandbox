import React from "react";
import { useChatStore } from "../store/chatStore";
import { Message } from "../types/message";

const MessageList: React.FC = () => {
  const messages = useChatStore((state) => state.messages);

  return (
    <div className="message-list">
      <h3>メッセージ</h3>
      <div className="messages-container">
        {messages.length === 0 ? (
          <p className="no-messages">メッセージがありません</p>
        ) : (
          messages.map((message: Message) => (
            <div key={message.id} className="message">
              <div className="message-content">{message.content}</div>
              <div className="message-timestamp">{new Date(message.timestamp).toLocaleTimeString()}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MessageList;
