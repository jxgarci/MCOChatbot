/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * 							And modified by Jxgarci						   *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Icon, Text, View } from "@aws-amplify/ui-react";
import { sendQuery } from "../ApiEndpoint.js";

export default function TextBox(props) {
	const { overrides, displayMessage, selectedButtonText, ...rest } = props;
	// State to store the entered message
	const [message, setMessage] = React.useState("");
	// State to track hover and click states
	const [isHovered, setIsHovered] = React.useState(false);
	const [isClicked, setIsClicked] = React.useState(false);


	// Define the initial and hover path values
	const initialPath = "M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576L6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76l7.494-7.493Z";
	const hoverPath = "M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26l.001.002l4.995 3.178l3.178 4.995l.002.002l.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215l7.494-7.494l1.178-.471l-.47 1.178Z";

	// Event handlers for the send button
	const handleMouseEnter = () => {
		setIsHovered(true);
	};

	const handleMouseLeave = () => {
		setIsHovered(false);
	};

	const handleClick = () => {
		setIsClicked(true);
		if (message.trim()) {
			sendMessage(message);
			setMessage(""); // Clear the textarea
		}
	};

	// Initialisation message
	React.useEffect(() => {
		if (selectedButtonText) {
			setMessage(selectedButtonText);
		}
	}, [selectedButtonText]);

	/**
	*  Manage the message input in the textarea
	*/
	const handleKeyDown = (event) => {
		console.log(event)
		if (event.key === "Enter" && !event.shiftKey) {
			event.preventDefault();
			if (message.trim()) {
				sendMessage(message);
				setMessage(""); // Clear the textarea
			}
		}
	};

	const handleChange = (event) => {
		setMessage(event.target.value);
	};

	/**
	 * This function takes the input message from textarea, sends the query to the backend
	 * and display both messages, indicating the sender in both cases.
	 * It is async as it has to wait fot the response from the backend.
	 * @param {string} input_message - The message to be sent
	 */
	async function sendMessage(input_message) {
		// Display the message in the chat feed
		props.displayMessage(input_message, "user");
		// Send the message to the backend
		let response = await sendQuery(input_message);
		props.displayMessage(response, "bot");
	}

	return ( // Components and styles
		<View
			width="100%"
			height="135%"
			display="flex"
			borderRadius="15px"
			style={{
				boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.7)",
			}}
			backgroundColor="rgb(38 46 59)"
			alignItems="center"
			{...getOverrideProps(overrides, "TextBox")}
			{...rest}
		>
			<textarea
				type="text"
				style={{
					left: "7%",
					overflowY: "auto",
					fontFamily: "Inter",
					position: "relative",
					color: "white",
					fontSize: "100%",
					fontWeight: "400",
					lineHeight: "36px",
					textAlign: "left",
					display: "flex",
					width: "70%",
					height: "80%",
					border: "none",
					backgroundColor: "rgba(200,206,249,0)",
				}}
				placeholder="Write Something Here ..."
				value={message} // Bind the value of the textarea to the message state
				onChange={handleChange} // Handle changes in the textarea
				onKeyDown={handleKeyDown} // Handle keydown event
				{...getOverrideProps(overrides, "TextInput")}
			></textarea>
			<div
				// Add a className prop to apply a CSS class
				className={`send-icon`}
				onClick={handleClick}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
			>
				<Icon
					// Add event handlers to detect hovering or click
					width="45"
					height="45"
					viewBox={{
						minX: 0,
						minY: 0,
						width: 20,
						height: 16,
					}}
					position="relative"
					{...getOverrideProps(overrides, "Vector")}
				>
					<path
						d={isHovered ? hoverPath : initialPath}
						fill="rgba(255,255,255,1)"
						fillRule="nonzero"
					></path>
				</Icon>
			</div>
		</View >
	);
}
