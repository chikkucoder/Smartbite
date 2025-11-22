import React, { useState, useEffect, useRef } from 'react';

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { sender: 'bot', text: 'Hi! 👋 I\'m SmartBite Assistant. Ask me about our menu, prices, or anything!' }
    ]);
    const [userInput, setUserInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async () => {
        if (!userInput.trim()) return;

        const userMessage = { sender: 'user', text: userInput };
        setMessages(prev => [...prev, userMessage]);
        setUserInput('');
        setIsTyping(true);

        try {
            const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
            const response = await fetch(`${API_URL}/api/chatbot`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: userInput })
            });

            const data = await response.json();
            setIsTyping(false);

            const botMessage = { sender: 'bot', text: data.reply };
            setMessages(prev => [...prev, botMessage]);
        } catch (error) {
            setIsTyping(false);
            console.error("Error with the chatbot request:", error);
            const errorMessage = { sender: 'bot', text: "Oops! Something went wrong. Please try again later." };
            setMessages(prev => [...prev, errorMessage]);
        }
    };

    return (
        <>
            <style>
                {`
                    .chatbot-container {
                        position: fixed;
                        bottom: 20px;
                        right: 20px;
                        z-index: 1000;
                    }
                    
                    .chatbot-icon {
                        width: 60px;
                        height: 60px;
                        border-radius: 50%;
                        background: linear-gradient(135deg, #10b981, #059669);
                        color: white;
                        border: none;
                        box-shadow: 0 10px 25px rgba(16, 185, 129, 0.4);
                        cursor: pointer;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 1.8rem;
                        transition: all 0.3s ease;
                        animation: pulse 2s infinite;
                    }
                    
                    .chatbot-icon:hover {
                        transform: scale(1.1);
                        box-shadow: 0 15px 30px rgba(16, 185, 129, 0.6);
                    }
                    
                    @keyframes pulse {
                        0%, 100% {
                            box-shadow: 0 10px 25px rgba(16, 185, 129, 0.4);
                        }
                        50% {
                            box-shadow: 0 10px 35px rgba(16, 185, 129, 0.7);
                        }
                    }
                    
                    .chatbot-window {
                        position: fixed;
                        bottom: 100px;
                        right: 20px;
                        width: 380px;
                        max-width: calc(100vw - 40px);
                        height: 550px;
                        max-height: calc(100vh - 140px);
                        background: white;
                        border-radius: 1rem;
                        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
                        display: flex;
                        flex-direction: column;
                        overflow: hidden;
                        animation: slideUp 0.3s ease-out;
                    }
                    
                    @keyframes slideUp {
                        from {
                            opacity: 0;
                            transform: translateY(20px);
                        }
                        to {
                            opacity: 1;
                            transform: translateY(0);
                        }
                    }
                    
                    .chatbot-header {
                        background: linear-gradient(135deg, #10b981, #059669);
                        color: white;
                        padding: 1rem 1.5rem;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                    }
                    
                    .chatbot-header-title {
                        display: flex;
                        align-items: center;
                        gap: 0.5rem;
                        font-weight: 600;
                        font-size: 1.1rem;
                    }
                    
                    .chatbot-close {
                        background: rgba(255, 255, 255, 0.2);
                        border: none;
                        color: white;
                        width: 30px;
                        height: 30px;
                        border-radius: 50%;
                        cursor: pointer;
                        font-size: 1.2rem;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        transition: background 0.3s ease;
                    }
                    
                    .chatbot-close:hover {
                        background: rgba(255, 255, 255, 0.3);
                    }
                    
                    .chatbot-messages {
                        flex: 1;
                        overflow-y: auto;
                        padding: 1rem;
                        background: #f9fafb;
                    }
                    
                    .message {
                        margin-bottom: 1rem;
                        display: flex;
                        animation: fadeIn 0.3s ease-out;
                    }
                    
                    .message-user {
                        justify-content: flex-end;
                    }
                    
                    .message-bubble {
                        max-width: 75%;
                        padding: 0.75rem 1rem;
                        border-radius: 1rem;
                        word-wrap: break-word;
                    }
                    
                    .message-user .message-bubble {
                        background: linear-gradient(135deg, #10b981, #059669);
                        color: white;
                        border-bottom-right-radius: 0.25rem;
                    }
                    
                    .message-bot .message-bubble {
                        background: white;
                        color: #111827;
                        border-bottom-left-radius: 0.25rem;
                        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                    }
                    
                    .typing-indicator {
                        display: flex;
                        gap: 0.3rem;
                        padding: 0.75rem 1rem;
                        background: white;
                        border-radius: 1rem;
                        width: fit-content;
                        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                    }
                    
                    .typing-dot {
                        width: 8px;
                        height: 8px;
                        border-radius: 50%;
                        background: #10b981;
                        animation: typing 1.4s infinite;
                    }
                    
                    .typing-dot:nth-child(2) {
                        animation-delay: 0.2s;
                    }
                    
                    .typing-dot:nth-child(3) {
                        animation-delay: 0.4s;
                    }
                    
                    @keyframes typing {
                        0%, 60%, 100% {
                            transform: translateY(0);
                        }
                        30% {
                            transform: translateY(-10px);
                        }
                    }
                    
                    .chatbot-input-area {
                        padding: 1rem;
                        background: white;
                        border-top: 1px solid #e5e7eb;
                        display: flex;
                        gap: 0.5rem;
                    }
                    
                    .chatbot-input {
                        flex: 1;
                        border: 2px solid #e5e7eb;
                        border-radius: 2rem;
                        padding: 0.75rem 1rem;
                        font-size: 0.95rem;
                        outline: none;
                        transition: border-color 0.3s ease;
                    }
                    
                    .chatbot-input:focus {
                        border-color: #10b981;
                    }
                    
                    .chatbot-send {
                        background: linear-gradient(135deg, #10b981, #059669);
                        color: white;
                        border: none;
                        border-radius: 50%;
                        width: 45px;
                        height: 45px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        cursor: pointer;
                        font-size: 1.2rem;
                        transition: all 0.3s ease;
                        box-shadow: 0 4px 6px rgba(16, 185, 129, 0.3);
                    }
                    
                    .chatbot-send:hover {
                        transform: scale(1.1);
                        box-shadow: 0 6px 12px rgba(16, 185, 129, 0.4);
                    }
                    
                    .chatbot-send:disabled {
                        opacity: 0.5;
                        cursor: not-allowed;
                    }
                    
                    @media (max-width: 480px) {
                        .chatbot-window {
                            width: calc(100vw - 40px);
                            height: calc(100vh - 140px);
                        }
                    }
                `}
            </style>
            
            <div className="chatbot-container">
                {!isOpen && (
                    <button className="chatbot-icon" onClick={() => setIsOpen(true)}>
                        💬
                    </button>
                )}

                {isOpen && (
                    <div className="chatbot-window">
                        <div className="chatbot-header">
                            <div className="chatbot-header-title">
                                <span>🤖</span>
                                <span>SmartBite Assistant</span>
                            </div>
                            <button className="chatbot-close" onClick={() => setIsOpen(false)}>
                                ✕
                            </button>
                        </div>
                        
                        <div className="chatbot-messages">
                            {messages.map((msg, i) => (
                                <div key={i} className={`message message-${msg.sender}`}>
                                    <div className="message-bubble">
                                        {msg.text}
                                    </div>
                                </div>
                            ))}
                            
                            {isTyping && (
                                <div className="message message-bot">
                                    <div className="typing-indicator">
                                        <div className="typing-dot"></div>
                                        <div className="typing-dot"></div>
                                        <div className="typing-dot"></div>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>
                        
                        <div className="chatbot-input-area">
                            <input
                                type="text"
                                value={userInput}
                                onChange={(e) => setUserInput(e.target.value)}
                                className="chatbot-input"
                                placeholder="Ask me anything..."
                                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                            />
                            <button 
                                className="chatbot-send" 
                                onClick={handleSend}
                                disabled={!userInput.trim()}
                            >
                                ➤
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
