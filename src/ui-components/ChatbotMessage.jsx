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
  const { overrides, ...rest } = props;
  return (
    <Flex
      gap="10px"
      direction="row"
      width="569px"
      height="unset"
      justifyContent="center"
      alignItems="center"
      overflow="hidden"
      position="relative"
      borderRadius="25px"
      padding="10px 40px 10px 40px"
      backgroundColor="rgba(248,153,27,1)"
      {...getOverrideProps(overrides, "ChatbotMessage")}
      {...rest}
    >
      <Text
        fontFamily="Inter"
        fontSize="20px"
        fontWeight="600"
        color="rgba(0,0,0,1)"
        textTransform="capitalize"
        lineHeight="24.204544067382812px"
        textAlign="center"
        display="block"
        direction="column"
        justifyContent="unset"
        width="unset"
        height="unset"
        gap="unset"
        alignItems="unset"
        grow="1"
        shrink="1"
        basis="0"
        position="relative"
        padding="0px 0px 0px 0px"
        whiteSpace="pre-wrap"
        children="Hello! How can i assist you?"
        {...getOverrideProps(overrides, "Text")}
      ></Text>
    </Flex>
  );
}
