import React from 'react';
import ChatMessage from './ChatMessage';

// ChatLog component for displaying chat messages
const ChatLog = ({ chatLog }) => { // chatLog: array of chat messages
  return (
    <div className="chat-log">
      {chatLog.map((message, index) => (
        // Render a ChatMessage component for each message in the chatLog array
        <ChatMessage key={index} message={message} />
      ))}
    </div>
  );
};

export default ChatLog;
