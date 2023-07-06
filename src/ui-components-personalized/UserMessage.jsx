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
      ></Text>

    </Flex>
  );
}
