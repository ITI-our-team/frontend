import { useState, useRef, useEffect } from "react";
import "./ChatBot.css";
import { FaRobot, FaTimes } from "react-icons/fa";
import ReactMarkdown from "react-markdown";

function ChatBot({api_url}) {
    
    const [open, setOpen] = useState(false);
    const chatRef = useRef(null);
    const messagesEndRef = useRef(null);
    const [inputValue, setInputValue] = useState("");
    const [messages, setMessages] = useState([
        { text: "Hello, How can I help you?", sender: "bot" }
    ]);
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    useEffect(() => {
        function handleClickOutside(e) {
            if (chatRef.current && !chatRef.current.contains(e.target)) {
                setOpen(false);
            }
        }

        if (open) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [open]);
    async function sendMessage() {
        if (!inputValue.trim()) return;

        const userMsg = inputValue;
        // 1. Add user message to UI immediately
        setMessages(prev => [...prev, { text: userMsg, sender: "user" }]);
        setInputValue(""); // Clear input

        const API_URL = `${api_url}api/chat/`;
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: userMsg }),
            });
            const result = await response.json();

            if (response.ok) {
                // 2. Add bot reply to UI
                setMessages(prev => [...prev, { text: result.bot_reply, sender: "bot" }]);
            }
        } catch (error) {
            console.error("Network Error:", error);
            setMessages(prev => [...prev, { text: "Sorry, I'm having trouble connecting.", sender: "bot" }]);
        }
    }
    return (
        <>
            <div
                className="chatbot-btn"
                onClick={(e) => {
                    e.stopPropagation();
                    setOpen(!open);
                }}
            >
                {open ? <FaTimes /> : <FaRobot />}
            </div>

            {open && (
                <div
                    className="chatbot-box"
                    ref={chatRef}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="chatbot-header">
                        <FaRobot />
                        <span>AI Assistant</span>
                    </div>

                    <div className="chatbot-messages">
                        {messages.map((msg, index) => (
                            <div key={index} className={`${msg.sender}-msg`}>
                                <ReactMarkdown>{msg.text}</ReactMarkdown>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    <div className="chatbot-input">
                        <input 
                            type="text" 
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                            placeholder="Type your message..." 
                        />
                        <button onClick={sendMessage}>Send</button>
                    </div>
                </div>
            )}
        </>
    );
}

export default ChatBot;
