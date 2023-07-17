/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * 							And modified by Jxgarci						   *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Flex, Text } from "@aws-amplify/ui-react";

export default function UserMessage(props) {
	const { overrides, message, ...rest } = props;

	/* Animation for displaying it */
	const [isVisible, setIsVisible] = React.useState(false);

	React.useEffect(() => {
		// Set the component visibility after a delay
		const delay = 200; // Adjust the delay as needed
		const timeout = setTimeout(() => {
			setIsVisible(true);
		}, delay);

		// Cleanup the timeout when the component unmounts
		return () => clearTimeout(timeout);
	}, []);

	// CSS class for the fade-in animation
	const fadeAnimationClass = isVisible ? "fade-in" : "";

	return (
		<Flex
			className={`message user ${fadeAnimationClass}`}
			gap="10px"
			direction="column"
			style={{
				opacity: isVisible ? 1 : 0,
				float: "right",
				borderRadius: "15px",
				boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.4)",
			}}
			width="70%"
			height="unset"
			alignItems="center"
			justifyContent="center"
			position="relative"
			margin="0.7%"
			padding="10px 40px 10px 40px"
			backgroundColor="rgba(184,206,249,0.7)"
			{...getOverrideProps(overrides, "UserMessage")}
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
			></Text>

		</Flex>
	);
}
