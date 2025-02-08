import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion"; // For smooth animations
import { BsChatDots, BsX, BsSend } from "react-icons/bs"; // Chat icon, close icon, and send icon
import "./AIChatbot.css";

const AIChatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false); // Controls chat visibility

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "user" };
    setMessages([...messages, userMessage]);

    try {
      const response = await axios.post("http://localhost:5000/chatbot", { prompt: input });

      const botMessage = { text: response.data.reply, sender: "bot" };
      setMessages([...messages, userMessage, botMessage]);
    } catch (error) {
      console.error("Error fetching AI response:", error);
    }

    setInput("");
  };

  return (
    <>
      {/* Floating Chat Button */}
      <motion.div 
        className="chat-button" 
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <BsX size={28} /> : <BsChatDots size={28} />}
      </motion.div>

      {/* Chat Window */}
      {isOpen && (
        <motion.div 
          className="chat-container" 
          initial={{ opacity: 0, y: 50 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5 }}
        >
          <div className="chat-header">
            <h4 style = {{color: "white"}} >
              Book AI Assistant 📚</h4>
            <button onClick={() => setIsOpen(false)}>✖</button>
          </div>

          <div className="chat-box">
            {messages.map((msg, index) => (
              <div key={index} className={`chat-message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
          </div>

          <div className="chat-input">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me about books..."
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            />
            <button onClick={handleSendMessage} className="send-button">
              <BsSend size={18} />
            </button>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default AIChatbot;