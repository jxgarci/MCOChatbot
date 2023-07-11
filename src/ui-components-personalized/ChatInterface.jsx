import * as React from "react";
import TextBox from "./TextBox";
import UserMessage from "./UserMessage";
import ChatbotMessage from "./ChatbotMessage";

export default function ChatInterface() {
    const chatFeedRef = React.useRef(null); // Reference to the chat feed element
    const [messages, setMessages] = React.useState([]);

    React.useEffect(() => {
        // Scroll to the bottom of the chat feed when new messages are added
        chatFeedRef.current.scrollTop = chatFeedRef.current.scrollHeight;
    }, [messages]);
    
    /**
     * This function forces the update of messages, which triggers the rendering of the messages
     * NOTE THAT EVERYTIME THE PAGE IS RELOADED, THE MESSAGES ARE LOST.
     * In order too avoid this, usage of a S3 bucket or localstorage is recommended
     */
    const displayMessage = (input_message, sender) => {
        setMessages((prevMessages) => {
          const updatedMessages = [
            ...prevMessages,
            { message: input_message, sender: sender },
          ];
          return updatedMessages;
        });
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
                return <ChatbotMessage key={index} message={element.message} />
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
                <TextBox displayMessage={displayMessage} />
            </div>
        </div>
    );
}