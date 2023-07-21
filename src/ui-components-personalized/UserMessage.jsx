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
			direction="column"
			style={{
				opacity: isVisible ? 1 : 0,
			}}
			{...getOverrideProps(overrides, "UserMessage")}
			{...rest}
		>
			<Text
				className={"message-text"}
				children={message}
				{...getOverrideProps(overrides, "Text")}
			></Text>

		</Flex>
	);
}
