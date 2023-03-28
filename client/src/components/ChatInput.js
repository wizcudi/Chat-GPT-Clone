import React from 'react';

// ChatInput component for handling user input
const ChatInput = ({
    input, // Input value
    setInput, // Function to update input value
    handleSubmit, // Function to handle form submission
    handleKeyDown, // Function to handle keydown event in input
    autoGrow, // Function to auto-grow textarea based on content
  }) => {
  return (
    <div className="chat-input-holder">
      <form onSubmit={handleSubmit}>
        <textarea
          rows="1"
          value={input}
          // Update input value and auto-grow textarea on change
          onChange={(e) => {
            setInput(e.target.value);
            autoGrow(e);
          }}
          onKeyDown={handleKeyDown}
          className="chat-input-textarea"
          placeholder="Type your message here"
        ></textarea>
      </form>
    </div>
  );
};

export default ChatInput;
