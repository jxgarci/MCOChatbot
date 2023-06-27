/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Icon, Text, View } from "@aws-amplify/ui-react";

export default function TextBox(props) {
  const { overrides, displayMessage, ...rest } = props;
  const [message, setMessage] = React.useState(""); // State to store the entered message

  /**
  *  Manage the message input in the textarea
  */
  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      if (message.trim()) {
        sendMessage(message);
        setMessage(""); // Clear the textarea
      }
    }
  };

  /**
   * Manage changes in the textarea
   */
  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  /**
   * Display the element <UserMessage /> in the chat interface and send it to the backend
   * @param {string} input_message - The message to be sent
   */
  const sendMessage = (input_message) => {
    // Display the message in the chat feed
    props.displayMessage(input_message);
    // Send the message to the backend

  };

  return (
    <View
      width="100%"
      height="130%"
      display="inline-flex"
      backgroundColor="rgba(184,206,249,1)"
      {...getOverrideProps(overrides, "TextBox")}
      {...rest}
    >
      <Icon
        width="1%"
        height="10%"
        paths={[
          {
            d: "M0 0L1003.96 0L1003.96 -4L0 -4L0 0Z",
            stroke: "rgba(0,0,0,1)",
            fillRule: "nonzero",
            strokeWidth: 4,
          },
        ]}
        position="relative"
        top="87%"
        left="6%"
        transformOrigin="top left"
        {...getOverrideProps(overrides, "border")}
      ></Icon>
      <textarea
        type="text"
        style={{
          overflowY: "auto",
          fontFamily: "Inter",
          position: "relative",
          fontSize: "100%",
          fontWeight: "400",
          top: "15%",
          left: "5%",
          color: "rgba(0,0,0,1)",
          lineHeight: "36px",
          textAlign: "left",
          display: "block",
          width: "70%", 
          height: "70%",
          border: "none",
          backgroundColor: "rgba(200,206,249,0.5)",

        }}
        placeholder="Write Something Here ..."
        value={message} // Bind the value of the textarea to the message state
        onChange={handleChange} // Handle changes in the textarea
        onKeyDown={handleKeyDown} // Handle keydown event
        {...getOverrideProps(overrides, "TextInput")}
      ></textarea>
      <Icon
        width="30%"
        viewBox={{
          minX: 0,
          minY: 0,
          width: 16,
          height: 16,
        }}
        paths={[
          {
            d: "M29.581 18.6581C29.581 24.8775 23.4724 29.231 16.8347 29.231C10.197 29.231 4.08844 24.8775 4.08844 18.6581L0 18.6581C0 25.7274 6.5415 31.5736 14.4298 32.5895L14.4298 39.3893L19.2397 39.3893L19.2397 32.5895C27.128 31.5736 33.6695 25.7274 33.6695 18.6581M13.9488 6.01205C13.9488 4.64379 15.2475 3.52431 16.8347 3.52431C18.422 3.52431 19.7207 4.64379 19.7207 6.01205L19.6966 18.8654C19.6966 20.2337 18.422 21.3532 16.8347 21.3532C15.2475 21.3532 13.9488 20.2337 13.9488 18.8654M16.8347 24.8775C18.7482 24.8775 20.5834 24.2222 21.9364 23.0559C23.2895 21.8895 24.0496 20.3076 24.0496 18.6581L24.0496 6.21937C24.0496 4.56989 23.2895 2.98797 21.9364 1.82161C20.5834 0.655253 18.7482 9.20651e-16 16.8347 0C14.9212 1.8413e-15 13.0861 0.655253 11.733 1.82161C10.38 2.98797 9.61985 4.56989 9.61985 6.21937L9.61985 18.6581C9.61985 20.3076 10.38 21.8895 11.733 23.0559C13.0861 24.2222 14.9212 24.8775 16.8347 24.8775Z",
            fill: "rgba(0,0,0,1)",
            fillRule: "nonzero",
          },
        ]}
        position="relative"
        top="40%" // Adjust the value to vertically position the icon
        transform="translateY(-50%)" // Center vertically using transform
        {...getOverrideProps(overrides, "Vector")}
      ></Icon>
    </View>
  );
}
