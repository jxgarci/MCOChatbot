/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Flex, Text } from "@aws-amplify/ui-react";

export default function UserMessage(props) {
  const { overrides, message, ...rest } = props;
  return (
    <Flex
      gap="10px"
      direction="column"
      style={{
        float: "right",
      }}
      width="50%"
      height="unset"
      alignItems="center"
      overflow="hidden"
      position="relative"
      borderRadius="25px"
      margin="0.7%"
      padding="10px 40px 10px 40px"
      backgroundColor="rgba(184,206,249,0.7)"
      {...getOverrideProps(overrides, "UserMessage")}
      {...rest}
    >
      <Text
        fontFamily="Inter"
        fontSize="20px"
        fontWeight="600"
        right="0"
        children={message}
        {...getOverrideProps(overrides, "Text")}
      ></Text>
    </Flex>
  );
}
