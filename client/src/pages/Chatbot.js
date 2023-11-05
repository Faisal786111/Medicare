import React, { useState } from "react";
import Layout from "../components/Layout";
import TelegramIcon from '@mui/icons-material/Telegram';
import botImg from "../images/chatbot1.gif";
import arrayOfPossibleMessage from "../Data/BotScript";
import { findBestMatch } from 'string-similarity';

const Chatbot = () => {
    const [userMessage, setUserMessage] = useState("");
    const [chatMessages, setChatMessages] = useState([]);

    const handleUserMessageChange = (e) => {
        setUserMessage(e.target.value);
    }

    const sendMessage = (message, sender) => {
        setChatMessages((prevMessages) => [...prevMessages, { message, sender }]);
    }

    const chatbotResponse = (userMessage) => {
        const userMessageLower = userMessage.toLowerCase();
    
        // Create an array of all predefined messages
        const predefinedMessages = arrayOfPossibleMessage.map(item => item.message.toLowerCase());
    
        // Find the best match between the user's message and predefined messages
        const match = findBestMatch(userMessageLower, predefinedMessages);
    
        // Get the index of the best match
        const bestMatchIndex = match.bestMatchIndex;
    
        if (bestMatchIndex >= 0) {
            const response = arrayOfPossibleMessage[bestMatchIndex].response;
            sendMessage(response, 'chatbot');
        } else {
            sendMessage("Please send another message", 'chatbot');
        }
    }

    const submitHandleBtn = (e) => {
        e.preventDefault();
        if (userMessage.trim() === "") {
            alert('Please type a message');
            return;
        }

        const userMessageText = userMessage.trim();
        sendMessage(userMessageText, 'user');
        chatbotResponse(userMessageText);

        setUserMessage(""); // Clear the input after sending
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            submitHandleBtn(e);
        }
    }

    return (
        <Layout>
            <div className='backimg_1' style={{ minHeight: "100%" }}>
                <div className="container" style={{ padding: "5px" }}>
                    <div style={{ border: "1px solid black", marginTop: "15px" }}>
                        <div className="media" style={{ height: "100px", backgroundColor: 'whitesmoke' }}>
                            <img
                                src={botImg}
                                style={{ float: "left", margin: "10px" }}
                                className="rounded-circle float-left img-thumbnail"
                                width="75px"
                                alt="Chatbot"
                            />
                            <div className="media-body" style={{ float: "left" }}>
                                <h5 style={{ margin: "10px", marginTop: "15px" }}>Chatbot</h5>
                                <span style={{ marginLeft: "10px", color: "rgb(32,199,32)" }}>online</span>
                            </div>
                        </div>
                        <div
                            id="chatContainer"
                            className="container overflow-auto"
                            style={{ height: "300px", overflow: 'auto' }}
                        >
                            {chatMessages.map((chat, index) => (
                                <div
                                    className={`message-container ${chat.sender === 'user' ? 'user-message' : 'chatbot-message'}`}
                                    key={index}
                                >
                                    <div
                                        className={`message ${chat.message.length > 20 ? 'long-message' : 'short-message'}`}
                                    >
                                        <span>{chat.sender === 'user' ? 'You: ' + chat.message : 'Chatbot: ' + chat.message}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="input-group">
                            <input
                                id="textbox"
                                type="text"
                                className="form-control"
                                onChange={handleUserMessageChange}
                                onKeyPress={handleKeyPress} // Listen for Enter key press
                                value={userMessage}
                                placeholder="Type your message here..."
                                style={{ boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)", }}
                            />
                            <div className="input-group-prepend">
                                <div className="input-group-text">
                                    <TelegramIcon onClick={submitHandleBtn} style={{ cursor: "pointer" }} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Chatbot;