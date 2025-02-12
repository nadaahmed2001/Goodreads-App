import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion"; // For smooth animations
import { BsChatDots, BsX, BsSend } from "react-icons/bs"; // Chat icon, close icon, and send icon
import "./AIChatbot.css";
import styled from "styled-components";

const ChatButton = styled(motion.div)`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: var(--chat-btn);
  color: white;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow:
    0px 0px 13px 0px rgb(255 255 255 / 45%),
    0px 2px 13px 3px rgb(255 255 255 / 24%);
  transition:
    transform 0.3s ease,
    background-color 0.3s ease;

  &:hover {
    transform: scale(1.1);
    background-color: var(--chat-btn-hover);
  }
`;

const ChatContainer = styled(motion.div)`
  position: fixed;
  bottom: 90px;
  right: 20px;
  width: 350px;
  background: var(--chat-container-bg, white);
  border-radius: 15px;
  box-shadow:
    0px 0px 13px 0px rgb(255 255 255 / 45%),
    0px 2px 13px 3px rgb(255 255 255 / 24%);
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const ChatHeader = styled.div`
  background: var(--bg-brown);
  color: white;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  font-size: 16px;
`;

const ChatBox = styled.div`
  max-height: 300px;
  overflow-y: auto;
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  background: var(--chat-box-bg, inherit);
`;

const ChatMessage = styled.div`
  padding: 10px 15px;
  border-radius: 20px;
  max-width: 80%;
  margin-bottom: 8px;
  font-size: 14px;
  line-height: 1.4;
  background-color: ${({ sender }) =>
    sender === "user"
      ? "var(--chat-user-bg, #5e0303)"
      : "var(--chat-bot-bg, #ffe6e6)"};
  color: ${({ sender }) => (sender === "user" ? "white" : "#333")};
  align-self: ${({ sender }) =>
    sender === "user" ? "flex-end" : "flex-start"};
`;

const ChatInputContainer = styled.div`
  display: flex;
  padding: 10px;
  border-top: 1px solid #ddd;
  background-color: var(--chat-input-bg, #f9f9f9);
`;

const ChatInput = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 25px;
  outline: none;
  font-size: 14px;
  margin-right: 10px;

  &:focus {
    border-color: var(--chat-input-focus, #5e0303);
  }
`;

const SendButton = styled.button`
  background: var(--chat-btn-bg, #5e0303);
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease;

  &:hover {
    background: var(--chat-btn-hover, #e60000);
  }
`;

const AIChatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false); // Controls chat visibility

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "user" };
    setMessages([...messages, userMessage]);

    try {
      const response = await axios.post(
        "https://goodreads-app-production.up.railway.app/chatbot",
        { prompt: input }
      );

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
      <ChatButton
        className='chat-button'
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <BsX size={28} /> : <BsChatDots size={28} />}
      </ChatButton>

      {/* Chat Window */}
      {isOpen && (
        <ChatContainer
          className='chat-container'
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <ChatHeader className='chat-header'>
            <h4 style={{ color: "white" }}>Book AI Assistant 📚</h4>
            <button onClick={() => setIsOpen(false)}>✖</button>
          </ChatHeader>

          <ChatBox className='chat-box'>
            {messages.map((msg, index) => (
              <ChatMessage key={index} className={`chat-message ${msg.sender}`}>
                {msg.text}
              </ChatMessage>
            ))}
          </ChatBox>

          <ChatInputContainer className='chat-input'>
            <ChatInput
              type='text'
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder='Ask me about books...'
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            />
            <SendButton onClick={handleSendMessage} className='send-button'>
              <BsSend size={18} />
            </SendButton>
          </ChatInputContainer>
        </ChatContainer>
      )}
    </>
  );
};

export default AIChatbot;
