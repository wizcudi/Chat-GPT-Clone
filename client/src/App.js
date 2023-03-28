import './App.css';
import {useState, useEffect, useRef } from 'react';

import { getModels, sendMessage } from "./api";

import SideMenu from './components/SideMenu';
import ChatLog from './components/ChatLog';
import ChatInput from './components/ChatInput';

function App() {
  // State hooks
  const [ input, setInput ] = useState("");
  const [ models, setModels ] = useState([]);
  const [ currentModel, setCurrentModel ] = useState("");
  const [ chatLog, setChatLog ] = useState([]);

  // Fetch available models on component mount
  useEffect(() =>{
    getEngines();
  }, []);

  // Scroll to bottom of chat log when new messages are added
  useEffect(() => {
    scrollToBottom();
  }, [chatLog]);

  // Clear chat log
  function clearChat(){
    setChatLog([]);
  }

  // Fetch available models
  async function getEngines() {
    try {
      const models = await getModels();
      const allowedModels = [
        "gpt-3.5-turbo-0301",
        "gpt-3.5-turbo",
        "gpt-4",
        "gpt-4-0314",
      ];
      const filteredModels = models.filter((model) =>
        allowedModels.includes(model.id)
      );
      setModels(filteredModels);
    } catch (error) {
      console.error("Error fetching models:", error);
    }
  }
 
  // Handle form submission
  async function handleSubmit(e){
    e.preventDefault();

    // Add user message to chat log
    let chatLogNew = [...chatLog, {user: "me", message: `${input}`} ]
    setInput("");

    // Reset textarea height
    document.querySelector(".chat-input-textarea").style.height = "auto";
    document.querySelector(".chat-input-textarea").style.overflowY = "hidden";
    setChatLog(chatLogNew)

    // Prepare messages for sending to API
    const messages = chatLogNew.map((message) => message.message).join("\n\n")
    const data = await sendMessage(messages, currentModel);

    // Format the response
    const responseLines = data.message
    .replace(/\n{2,}/g, '\n') // Replace multiple consecutive newlines with a single newline
    .split('\n') // Split the string into an array of lines
    .map((line) => line.trim()) // Trim each line
    .join('\n'); // Join the lines into a single string with newline

    const formattedResponse = [{ user: "gpt", message: responseLines }];
   
    // Add the response to chat log
    setChatLog([...chatLogNew, ...formattedResponse]);

    // Scroll to the bottom of the chat log
    scrollToBottom();
  }

  // Scroll to bottom of chat log
  function scrollToBottom() {
    if (chatLogRef.current) {
      const scrollElement = document.createElement("div");
      chatLogRef.current.appendChild(scrollElement);
      scrollElement.scrollIntoView({ behavior: "smooth" });
      chatLogRef.current.removeChild(scrollElement);
    }
  }

  // Handle keydown event in input
  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  }
  
  // Auto-grow textarea based on content
  function autoGrow(e) {
    const maxHeight = 150; // Set the max height in pixels
    const target = e.target;
    target.style.height = "auto";
    if (target.scrollHeight <= maxHeight) {
      target.style.height = `${target.scrollHeight}px`;
    } else {
      target.style.overflowY = "scroll";
      target.style.height = `${maxHeight}px`;
    }
  }
  
  // Reference to the chat log DOM element
  const chatLogRef = useRef(null);

  return (
    <div className="App">
      <SideMenu
        clearChat={clearChat}
        models={models}
        setCurrentModel={setCurrentModel}
      />
      <section className="chatbox">
        <ChatLog chatLog={chatLog} />
        <ChatInput
          input={input}
          setInput={setInput}
          handleSubmit={handleSubmit}
          handleKeyDown={handleKeyDown}
          autoGrow={autoGrow}
        />
      </section>
    </div>
  );
}

export default App;
