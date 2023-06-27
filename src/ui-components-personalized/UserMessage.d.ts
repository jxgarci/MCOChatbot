/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 **************************************************************************/

import * as React from "react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { FlexProps, TextProps } from "@aws-amplify/ui-react";
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type UserMessageOverridesProps = {
    UserMessage?: PrimitiveOverrideProps<FlexProps>;
    Text?: PrimitiveOverrideProps<TextProps>;
} & EscapeHatchProps;
export declare type UserMessageProps = React.PropsWithChildren<Partial<FlexProps> & {
    overrides?: UserMessageOverridesProps | undefined | null;
}>;
export default function UserMessage(props: UserMessageProps): React.ReactElement;
