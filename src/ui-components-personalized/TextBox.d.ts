/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { IconProps, TextProps, ViewProps } from "@aws-amplify/ui-react";
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type TextBoxOverridesProps = {
    TextBox?: PrimitiveOverrideProps<ViewProps>;
    border?: PrimitiveOverrideProps<IconProps>;
    TextInput?: PrimitiveOverrideProps<TextProps>;
    Vector?: PrimitiveOverrideProps<IconProps>;
} & EscapeHatchProps;
export declare type TextBoxProps = React.PropsWithChildren<Partial<ViewProps> & {
    overrides?: TextBoxOverridesProps | undefined | null;
}>;
export default function TextBox(props: TextBoxProps): React.ReactElement;
