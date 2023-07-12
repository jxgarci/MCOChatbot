/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Flex, Text } from "@aws-amplify/ui-react";

export default function ChatbotMessage(props) {
	const { overrides, message, copyToTextBox, ...rest } = props;

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
					<span>Example queries for each service:</span>
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
			gap="10px"
			direction="column"
			style={{
				float: "left",
			}}
			width="50%"
			height="unset"
			justifyContent="center"
			alignItems="center"
			overflow="hidden"
			position="relative"
			borderRadius="25px"
			margin="0.7%"
			padding="10px 40px 10px 40px"
			backgroundColor="rgba(248,153,27,1)"
			{...getOverrideProps(overrides, "ChatbotMessage")}
			{...rest}
		>
			<Text
				fontFamily="Helvetica"
				fontSize="17px"
				fontWeight="600"
				color="rgba(0,0,0,1)"
				lineHeight="24.204544067382812px"
				textAlign="center"
				display="block"
				direction="column"
				justifyContent="unset"
				width="100%" // Set the width to 100% of the container
				height="unset"
				gap="unset"
				alignItems="unset"
				grow="1"
				shrink="1"
				basis="0"
				position="relative"
				padding="0px 0px 0px 0px"
				whiteSpace="pre-wrap"
				children={message}
				{...getOverrideProps(overrides, "Text")}
			>{renderMessageWithLinks()}</Text>
		</Flex>
	);
}
