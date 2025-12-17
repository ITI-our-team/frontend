import { useState, useRef, useEffect } from "react";
import "./ChatBot.css";
import { FaRobot, FaTimes } from "react-icons/fa";

function ChatBot() {
    const [open, setOpen] = useState(false);
    const chatRef = useRef(null);

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
                        <p className="bot-msg">Hello, How can I help you?</p>
                    </div>

                    <div className="chatbot-input">
                        <input type="text" placeholder="Type your message..." />
                        <button>Send</button>
                    </div>
                </div>
            )}
        </>
    );
}

export default ChatBot;
