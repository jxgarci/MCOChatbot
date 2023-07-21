/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * 							And modified by Jxgarci						   *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Flex, Image, Text } from "@aws-amplify/ui-react";
import "../App.css"

export default function NavBar(props) {
  const { overrides, imageSource, ...rest } = props;
  return (
    <Flex
      className={"navbar"}
      {...getOverrideProps(overrides, "NavBar")}
      {...rest}
    >
      <Image
        src={require("./../aws_logo.png")}
        className={"navbar-image"}
        {...getOverrideProps(overrides, "AwsLogo")}
      />
      <Text
        className={"navbar-text"}
        children="Microsoft Cost Optimization ChatBot"
        {...getOverrideProps(overrides, "Title")}
      />
    </Flex>
  );
}
