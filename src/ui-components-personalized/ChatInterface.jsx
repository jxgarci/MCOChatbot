import * as React from "react";
import TextBox from "./TextBox";
import UserMessage from "./UserMessage";

export default function ChatInterface() {
    const [messages, setMessages] = React.useState([]);

    /**
     * This function forces the update of messages, which triggers the rendering of the messages
     * NOTE THAT EVERYTIME THE PAGE IS RELOADED, THE MESSAGES ARE LOST.
     * In order too avoid this, usage of a S3 bucket or localstorage is recommended
     */
    const displayMessage = (input_message) => {
        const updatedMessages = [...messages, input_message];
        setMessages(updatedMessages);
    };

    /**
     * Function to load the messages in the chat
     * @returns UserMessage component in order to display it
     */
    const renderMessages = () => {
        return messages.map((message, index) => {
            return <UserMessage key={index} message={message} />
        })
    }

    return (
        <div className="chat-interface">
            <div className="chat-feed">
                {renderMessages()}
            </div>
            <div className="text-box-container">
                <TextBox displayMessage={displayMessage} />
            </div>
        </div>
    );
}