/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Flex, Image, Text } from "@aws-amplify/ui-react";

export default function NavBar(props) {
  const { overrides, imageSource, ...rest } = props;
  return (
    <Flex
      gap="0"
      direction="row"
      display="inline-flex"
      width="100%"
      height="133.99px"
      justifyContent="center"
      alignItems="center"
      overflow="hidden"
      position="relative"
      boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
      padding="0px 0px 0px 0px"
      backgroundColor="rgba(38, 46, 59, 1)"
      {...getOverrideProps(overrides, "NavBar")}
      {...rest}
    >
      <Image
        src={require("./../aws_logo.png")}
        width="88.16px"
        height="97.45px"
        display="inline-flex"
        gap="unset"
        alignItems="unset"
        justifyContent="unset"
        shrink="0"
        position="relative"
        padding="0px 0px 0px 0px"
        objectFit="cover"
        {...getOverrideProps(overrides, "AwsLogo")}
      />
      <Text
        fontFamily="Inter"
        fontSize="20px"
        fontWeight="600"
        color="rgba(255, 255, 255, 1)"
        textTransform="capitalize"
        lineHeight="24.204544067382812px"
        textAlign="center"
        display="inline-flex"
        justifyContent="flex-end"
        alignItems="center"
        flex="0.5"
        padding="0px 10px"
        whiteSpace="pre-wrap"
        children="Microsoft Cost Optimization ChatBot"
        {...getOverrideProps(overrides, "Title")}
      />
    </Flex>
  );
}
