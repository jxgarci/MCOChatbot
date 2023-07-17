/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * 							And modified by Jxgarci						   *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Flex, Text } from "@aws-amplify/ui-react";

export default function ChatbotMessage(props) {
	const { overrides, message, copyToTextBox, ...rest } = props;

	/* Animation for displaying it */
	const [isVisible, setIsVisible] = React.useState(false);

	React.useEffect(() => {
		// Set the component visibility after a delay
		const delay = 400; // Adjust the delay as needed
		const timeout = setTimeout(() => {
			setIsVisible(true);
		}, delay);

		// Cleanup the timeout when the component unmounts
		return () => clearTimeout(timeout);
	}, []);

	// CSS class for the fade-in animation
	const fadeAnimationClass = isVisible ? "fade-in" : "";

	/**
	 * Function to transform the links inside the message and make them clickable
	 * @returns UserMessage component in order to display it
	 */
	const renderMessageWithLinks = () => {
		// Initialization message
		if (message.sender === "bot-initialise") {
			return (
				<span className="initial-chatbot-message">
					<span>Hello! I'm the MCO chatbot, I can help you optimizing your Microsoft Workloads.</span>
					<span>Example queries for each service (you can directly select the examples): </span>
					<span>- Windows on EC2: <button onClick={() => copyToTextBox("Optimize wec2")}> Optimize wec2 </button></span>
					<span>- SQL: <button onClick={() => copyToTextBox("How can I modernize sql workloads? ")}> How can I modernize sql workloads? </button></span>
				</span>
			)
		}

		const urlRegex = /(?:^|\s)((?:www\.[^\s]+)|(?:https?:\/\/[^\s]+))/g; // Regex to detect links
		let parts = message.message
		try {
			parts = message.message.split(urlRegex); // Split the message into parts to isolate the link
		}
		catch (e) {
			return message.message; // If the message is not a valid link, just return it as is.
		}
		return parts.map((part, index) => {
			if (part.match(urlRegex)) {
				// Render link if the part is a URL
				const url = part.startsWith("www.") ? `http://${part}` : part;
				return (
					<a key={index} href={url} target="_blank">
						{part}
					</a>
				);
			} else {
				// Render plain text
				return <span key={index}>{part}</span>;
			}
		});
	};

	return (
		<Flex
			className={`message chatbot ${fadeAnimationClass}`}
			gap="10px"
			direction="column"
			style={{
				opacity: isVisible ? 1 : 0,
				float: "left",
				borderRadius: "15px",
				boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.4)",
			}}
			width="70%"
			height="unset"
			justifyContent="center"
			alignItems="center"
			position="relative"
			margin="0.7%"
			padding="10px 40px 10px 40px"
			backgroundColor="rgba(248, 169, 66, 0.9)"
			{...getOverrideProps(overrides, "ChatbotMessage")}
			{...rest}
		>
			<Text
				fontFamily="inter"
				fontSize="17px"
				fontWeight="600"
				color="rgba(0,0,0,1)"
				textAlign="justify"
				width="100%" // Set the width to 100% of the container
				position="relative"
				padding="0px 0px 0px 0px"
				whiteSpace="pre-wrap"
				children={message}
				{...getOverrideProps(overrides, "Text")}
			>{renderMessageWithLinks()}</Text>
		</Flex>
	);
}
