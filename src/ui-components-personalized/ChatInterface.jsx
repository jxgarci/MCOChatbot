/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * 							And modified by Jxgarci						   *
 **************************************************************************/

import * as React from "react";
import TextBox from "./TextBox";
import UserMessage from "./UserMessage";
import ChatbotMessage from "./ChatbotMessage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteRight, faQuoteLeft } from "@fortawesome/free-solid-svg-icons";

export default function ChatInterface() {
    const chatFeedRef = React.useRef(null); // Reference to the chat feed element
    const [messages, setMessages] = React.useState([]);
    const [selectedButtonText, setSelectedButtonText] = React.useState("");

    // For chatbot initialisation message
    const copyToTextBox = (text) => {
        setSelectedButtonText(text);
    };
    if (messages.length < 1) {
        messages.push({ message: "", sender: "bot-initialise" });
    }

    // Scroll to the bottom of the chat feed when new messages are added
    React.useEffect(() => {
        chatFeedRef.current.scrollTop = chatFeedRef.current.scrollHeight;
    }, [messages]);

    /**
     * This function forces the update of messages, which triggers the rendering of the messages
     * NOTE THAT EVERYTIME THE PAGE IS RELOADED, THE MESSAGES ARE LOST.
     * In order too avoid this, usage of a S3 bucket or localstorage is recommended
     */
    const displayMessage = (input_message, sender) => {
        // Appeding the message to the array of messages in order to display them
        setMessages((prevMessages) => {
            const updatedMessages = [
                ...prevMessages,
                { message: input_message, sender: sender },
            ];
            return updatedMessages;
        });
        // Whenever the user sends a message, the loading message is displayed
        if (sender === "user") {
            setMessages((prevMessages) => {
                const loadingMessage = {
                    message: <span><FontAwesomeIcon icon={faQuoteLeft} fade /><span>  Generating response  </span><FontAwesomeIcon icon={faQuoteRight} fade /></span>,
                    sender: "bot-loader",
                };
                return [...prevMessages, loadingMessage];
            });
        }
        // When the response from the back-end arrives we delete the loading message.
        if (sender === "bot") {
            // Removing the loading message for displaying the actual response
            setMessages((prevMessages) => {
                const updatedMessages = [...prevMessages];
                const loadingMessageIndex = updatedMessages.findIndex(
                    (message) => message.sender === "bot-loader"
                );
                updatedMessages.splice(loadingMessageIndex, 1);
                return updatedMessages;
            });
        }
    };

    /**
     * Function to load the messages in the chat
     * @returns UserMessage component in order to display it
     */
    const renderMessages = () => {
        return messages.map((element, index) => {
            if (element.sender === "user") {
                return <UserMessage key={index} message={element.message} />
            } else {
                return <ChatbotMessage key={index} message={element} copyToTextBox={copyToTextBox} />
            }
        })
    }

    return (
        // Creating the chat interface with the feed and the textbox
        <div className="chat-interface">
            <div className="chat-feed" ref={chatFeedRef}>
                {renderMessages()}
            </div>
            <div className="text-box-container">
                <TextBox displayMessage={displayMessage} selectedButtonText={selectedButtonText} />
            </div>
        </div>
    );
}