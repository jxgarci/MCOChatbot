/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * 							And modified by Jxgarci						   *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Flex, Text } from "@aws-amplify/ui-react";
import "./../App.css";

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
		// Initial message
		if (message.sender === "bot-initialise") {
			return (
				<span className="initial-chatbot-message">
					<span>Hello! I'm the MCO chatbot, I can help you by optimizing your Microsoft Workloads.</span>
					<span>Example queries for each service (you can directly select the examples): </span>
					<span>- Windows on EC2:<br></br><button onClick={() => copyToTextBox("Optimize wec2")}> Optimize wec2 </button></span>
					<span>- SQL: <br></br><button onClick={() => copyToTextBox("How can I modernize sql workloads? ")}> How can I modernize sql workloads? </button></span>
					<span>- Containers: <br></br><button onClick={() => copyToTextBox(" Why should I utilize containers ")}> Why should I utilize containers </button></span>
					<span>- Storage: <br></br><button onClick={() => copyToTextBox("How to optimize my EBS volumes in AWS ")}> How to optimize my EBS volumes in AWS </button></span>
					<span>- Active Directory: <br></br><button onClick={() => copyToTextBox(" Help me with managed Active Directory ")}> Help me with managed Active Directory  </button></span>
					<span>- .NET apps: <br></br><button onClick={() => copyToTextBox(" What to do to minimize my .net expenditures ")}> What to do to minimize my .net expenditures </button></span>
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
			direction="column"
			style={{
				opacity: isVisible ? 1 : 0,
			}}
			{...getOverrideProps(overrides, "ChatbotMessage")}
			{...rest}
		>
			<Text
				className="message-text"
				children={message}
				{...getOverrideProps(overrides, "Text")}
			>{renderMessageWithLinks()}</Text>
		</Flex>
	);
}
