import { PropType, ExtractPropTypes, Component } from 'vue';
import { AllColorsVariant } from '../../types/ColorVariants';
export declare type MessageSize = 'is-small' | 'is-medium' | 'is-large' | '';
export declare type MessageIcons = {
    [K in AllColorsVariant]: Component;
};
export declare function getMessageIcons(icons: Partial<MessageIcons>): {
    ""?: import("vue").ComponentOptionsWithoutProps<any, any, any, any, any, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, string[] | Record<string, ((...args: any[]) => any) | null>, string> | import("vue").ComponentOptionsWithArrayProps<any, any, any, any, any, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, string[] | Record<string, ((...args: any[]) => any) | null>, string, Readonly<{
        [x: string]: any;
    }>> | import("vue").FunctionalComponent<any, {}> | import("vue").ComponentOptionsWithObjectProps<any, any, any, any, any, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, string[] | Record<string, ((...args: any[]) => any) | null>, string, Readonly<{
        [x: string]: any;
    }> | Readonly<{
        [x: string]: any;
    } & {
        [x: number]: any;
    }>> | undefined;
    "is-black-ter"?: import("vue").ComponentOptionsWithoutProps<any, any, any, any, any, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, string[] | Record<string, ((...args: any[]) => any) | null>, string> | import("vue").ComponentOptionsWithArrayProps<any, any, any, any, any, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, string[] | Record<string, ((...args: any[]) => any) | null>, string, Readonly<{
        [x: string]: any;
    }>> | import("vue").FunctionalComponent<any, {}> | import("vue").ComponentOptionsWithObjectProps<any, any, any, any, any, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, string[] | Record<string, ((...args: any[]) => any) | null>, string, Readonly<{
        [x: string]: any;
    }> | Readonly<{
        [x: string]: any;
    } & {
        [x: number]: any;
    }>> | undefined;
    "is-orange"?: import("vue").ComponentOptionsWithoutProps<any, any, any, any, any, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, string[] | Record<string, ((...args: any[]) => any) | null>, string> | import("vue").ComponentOptionsWithArrayProps<any, any, any, any, any, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, string[] | Record<string, ((...args: any[]) => any) | null>, string, Readonly<{
        [x: string]: any;
    }>> | import("vue").FunctionalComponent<any, {}> | import("vue").ComponentOptionsWithObjectProps<any, any, any, any, any, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, string[] | Record<string, ((...args: any[]) => any) | null>, string, Readonly<{
        [x: string]: any;
    }> | Readonly<{
        [x: string]: any;
    } & {
        [x: number]: any;
    }>> | undefined;
    "is-primary"?: import("vue").ComponentOptionsWithoutProps<any, any, any, any, any, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, string[] | Record<string, ((...args: any[]) => any) | null>, string> | import("vue").ComponentOptionsWithArrayProps<any, any, any, any, any, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, string[] | Record<string, ((...args: any[]) => any) | null>, string, Readonly<{
        [x: string]: any;
    }>> | import("vue").FunctionalComponent<any, {}> | import("vue").ComponentOptionsWithObjectProps<any, any, any, any, any, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, string[] | Record<string, ((...args: any[]) => any) | null>, string, Readonly<{
        [x: string]: any;
    }> | Readonly<{
        [x: string]: any;
    } & {
        [x: number]: any;
    }>> | undefined;
    "is-info"?: import("vue").ComponentOptionsWithoutProps<any, any, any, any, any, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, string[] | Record<string, ((...args: any[]) => any) | null>, string> | import("vue").ComponentOptionsWithArrayProps<any, any, any, any, any, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, string[] | Record<string, ((...args: any[]) => any) | null>, string, Readonly<{
        [x: string]: any;
    }>> | import("vue").FunctionalComponent<any, {}> | import("vue").ComponentOptionsWithObjectProps<any, any, any, any, any, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, string[] | Record<string, ((...args: any[]) => any) | null>, string, Readonly<{
        [x: string]: any;
    }> | Readonly<{
        [x: string]: any;
    } & {
        [x: number]: any;
    }>> | undefined;
    "is-link"?: import("vue").ComponentOptionsWithoutProps<any, any, any, any, any, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, string[] | Record<string, ((...args: any[]) => any) | null>, string> | import("vue").ComponentOptionsWithArrayProps<any, any, any, any, any, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, string[] | Record<string, ((...args: any[]) => any) | null>, string, Readonly<{
        [x: string]: any;
    }>> | import("vue").FunctionalComponent<any, {}> | import("vue").ComponentOptionsWithObjectProps<any, any, any, any, any, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, string[] | Record<string, ((...args: any[]) => any) | null>, string, Readonly<{
        [x: string]: any;
    }> | Readonly<{
        [x: string]: any;
    } & {
        [x: number]: any;
    }>> | undefined;
    "is-success"?: import("vue").ComponentOptionsWithoutProps<any, any, any, any, any, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, string[] | Record<string, ((...args: any[]) => any) | null>, string> | import("vue").ComponentOptionsWithArrayProps<any, any, any, any, any, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, string[] | Record<string, ((...args: any[]) => any) | null>, string, Readonly<{
        [x: string]: any;
    }>> | import("vue").FunctionalComponent<any, {}> | import("vue").ComponentOptionsWithObjectProps<any, any, any, any, any, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, string[] | Record<string, ((...args: any[]) => any) | null>, string, Readonly<{
        [x: string]: any;
    }> | Readonly<{
        [x: string]: any;
    } & {
        [x: number]: any;
    }>> | undefined;
    "is-warning"?: import("vue").ComponentOptionsWithoutProps<any, any, any, any, any, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, string[] | Record<string, ((...args: any[]) => any) | null>, string> | import("vue").ComponentOptionsWithArrayProps<any, any, any, any, any, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, string[] | Record<string, ((...args: any[]) => any) | null>, string, Readonly<{
        [x: string]: any;
    }>> | import("vue").FunctionalComponent<any, {}> | import("vue").ComponentOptionsWithObjectProps<any, any, any, any, any, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, string[] | Record<string, ((...args: any[]) => any) | null>, string, Readonly<{
        [x: string]: any;
    }> | Readonly<{
        [x: string]: any;
    } & {
        [x: number]: any;
    }>> | undefined;
    "is-danger"?: import("vue").ComponentOptionsWithoutProps<any, any, any, any, any, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, string[] | Record<string, ((...args: any[]) => any) | null>, string> | import("vue").ComponentOptionsWithArrayProps<any, any, any, any, any, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, string[] | Record<string, ((...args: any[]) => any) | null>, string, Readonly<{
        [x: string]: any;
    }>> | import("vue").FunctionalComponent<any, {}> | import("vue").ComponentOptionsWithObjectProps<any, any, any, any, any, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, string[] | Record<string, ((...args: any[]) => any) | null>, string, Readonly<{
        [x: string]: any;
    }> | Readonly<{
        [x: string]: any;
    } & {
        [x: number]: any;
    }>> | undefined;
    "is-white"?: import("vue").ComponentOptionsWithoutProps<any, any, any, any, any, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, string[] | Record<string, ((...args: any[]) => any) | null>, string> | import("vue").ComponentOptionsWithArrayProps<any, any, any, any, any, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, string[] | Record<string, ((...args: any[]) => any) | null>, string, Readonly<{
        [x: string]: any;
    }>> | import("vue").FunctionalComponent<any, {}> | import("vue").ComponentOptionsWithObjectProps<any, any, any, any, any, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, string[] | Record<string, ((...args: any[]) => any) | null>, string, Readonly<{
        [x: string]: any;
    }> | Readonly<{
        [x: string]: any;
    } & {
        [x: number]: any;
    }>> | undefined;
    "is-black"?: import("vue").ComponentOptionsWithoutProps<any, any, any, any, any, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, string[] | Record<string, ((...args: any[]) => any) | null>, string> | import("vue").ComponentOptionsWithArrayProps<any, any, any, any, any, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, string[] | Record<string, ((...args: any[]) => any) | null>, string, Readonly<{
        [x: string]: any;
    }>> | import("vue").FunctionalComponent<any, {}> | import("vue").ComponentOptionsWithObjectProps<any, any, any, any, any, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, string[] | Record<string, ((...args: any[]) => any) | null>, string, Readonly<{
        [x: string]: any;
    }> | Readonly<{
        [x: string]: any;
    } & {
        [x: number]: any;
    }>> | undefined;
    "is-light"?: import("vue").ComponentOptionsWithoutProps<any, any, any, any, any, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, string[] | Record<string, ((...args: any[]) => any) | null>, string> | import("vue").ComponentOptionsWithArrayProps<any, any, any, any, any, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, string[] | Record<string, ((...args: any[]) => any) | null>, string, Readonly<{
        [x: string]: any;
    }>> | import("vue").FunctionalComponent<any, {}> | import("vue").ComponentOptionsWithObjectProps<any, any, any, any, any, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, string[] | Record<string, ((...args: any[]) => any) | null>, string, Readonly<{
        [x: string]: any;
    }> | Readonly<{
        [x: string]: any;
    } & {
        [x: number]: any;
    }>> | undefined;
    "is-dark"?: import("vue").ComponentOptionsWithoutProps<any, any, any, any, any, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, string[] | Record<string, ((...args: any[]) => any) | null>, string> | import("vue").ComponentOptionsWithArrayProps<any, any, any, any, any, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, string[] | Record<string, ((...args: any[]) => any) | null>, string, Readonly<{
        [x: string]: any;
    }>> | import("vue").FunctionalComponent<any, {}> | import("vue").ComponentOptionsWithObjectProps<any, any, any, any, any, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, string[] | Record<string, ((...args: any[]) => any) | null>, string, Readonly<{
        [x: string]: any;
    }> | Readonly<{
        [x: string]: any;
    } & {
        [x: number]: any;
    }>> | undefined;
    "is-black-bis"?: import("vue").ComponentOptionsWithoutProps<any, any, any, any, any, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, string[] | Record<string, ((...args: any[]) => any) | null>, string> | import("vue").ComponentOptionsWithArrayProps<any, any, any, any, any, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, string[] | Record<string, ((...args: any[]) => any) | null>, string, Readonly<{
        [x: string]: any;
    }>> | import("vue").FunctionalComponent<any, {}> | import("vue").ComponentOptionsWithObjectProps<any, any, any, any, any, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, string[] | Record<string, ((...args: any[]) => any) | null>, string, Readonly<{
        [x: string]: any;
    }> | Readonly<{
        [x: string]: any;
    } & {
        [x: number]: any;
    }>> | undefined;
    "is-grey-darker"?: import("vue").ComponentOptionsWithoutProps<any, any, any, any, any, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, string[] | Record<string, ((...args: any[]) => any) | null>, string> | import("vue").ComponentOptionsWithArrayProps<any, any, any, any, any, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, string[] | Record<string, ((...args: any[]) => any) | null>, string, Readonly<{
        [x: string]: any;
    }>> | import("vue").FunctionalComponent<any, {}> | import("vue").ComponentOptionsWithObjectProps<any, any, any, any, any, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, string[] | Record<string, ((...args: any[]) => any) | null>, string, Readonly<{
        [x: string]: any;
    }> | Readonly<{
        [x: string]: any;
    } & {
        [x: number]: any;
    }>> | undefined;
    "is-grey-dark"?: import("vue").ComponentOptionsWithoutProps<any, any, any, any, any, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, string[] | Record<string, ((...args: any[]) => any) | null>, string> | import("vue").ComponentOptionsWithArrayProps<any, any, any, any, any, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, string[] | Record<string, ((...args: any[]) => any) | null>, string, Readonly<{
        [x: string]: any;
    }>> | import("vue").FunctionalComponent<any, {}> | import("vue").ComponentOptionsWithObjectProps<any, any, any, any, any, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, string[] | Record<string, ((...args: any[]) => any) | null>, string, Readonly<{
        [x: string]: any;
    }> | Readonly<{
        [x: string]: any;
    } & {
        [x: number]: any;
    }>> | undefined;
    "is-grey"?: import("vue").ComponentOptionsWithoutProps<any, any, any, any, any, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, string[] | Record<string, ((...args: any[]) => any) | null>, string> | import("vue").ComponentOptionsWithArrayProps<any, any, any, any, any, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, string[] | Record<string, ((...args: any[]) => any) | null>, string, Readonly<{
        [x: string]: any;
    }>> | import("vue").FunctionalComponent<any, {}> | import("vue").ComponentOptionsWithObjectProps<any, any, any, any, any, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, string[] | Record<string, ((...args: any[]) => any) | null>, string, Readonly<{
        [x: string]: any;
    }> | Readonly<{
        [x: string]: any;
    } & {
        [x: number]: any;
    }>> | undefined;
    "is-grey-light"?: import("vue").ComponentOptionsWithoutProps<any, any, any, any, any, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, string[] | Record<string, ((...args: any[]) => any) | null>, string> | import("vue").ComponentOptionsWithArrayProps<any, any, any, any, any, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, string[] | Record<string, ((...args: any[]) => any) | null>, string, Readonly<{
        [x: string]: any;
    }>> | import("vue").FunctionalComponent<any, {}> | import("vue").ComponentOptionsWithObjectProps<any, any, any, any, any, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, string[] | Record<string, ((...args: any[]) => any) | null>, string, Readonly<{
        [x: string]: any;
    }> | Readonly<{
        [x: string]: any;
    } & {
        [x: number]: any;
    }>> | undefined;
    "is-grey-lighter"?: import("vue").ComponentOptionsWithoutProps<any, any, any, any, any, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, string[] | Record<string, ((...args: any[]) => any) | null>, string> | import("vue").ComponentOptionsWithArrayProps<any, any, any, any, any, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, string[] | Record<string, ((...args: any[]) => any) | null>, string, Readonly<{
        [x: string]: any;
    }>> | import("vue").FunctionalComponent<any, {}> | import("vue").ComponentOptionsWithObjectProps<any, any, any, any, any, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, string[] | Record<string, ((...args: any[]) => any) | null>, string, Readonly<{
        [x: string]: any;
    }> | Readonly<{
        [x: string]: any;
    } & {
        [x: number]: any;
    }>> | undefined;
    "is-white-ter"?: import("vue").ComponentOptionsWithoutProps<any, any, any, any, any, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, string[] | Record<string, ((...args: any[]) => any) | null>, string> | import("vue").ComponentOptionsWithArrayProps<any, any, any, any, any, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, string[] | Record<string, ((...args: any[]) => any) | null>, string, Readonly<{
        [x: string]: any;
    }>> | import("vue").FunctionalComponent<any, {}> | import("vue").ComponentOptionsWithObjectProps<any, any, any, any, any, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, string[] | Record<string, ((...args: any[]) => any) | null>, string, Readonly<{
        [x: string]: any;
    }> | Readonly<{
        [x: string]: any;
    } & {
        [x: number]: any;
    }>> | undefined;
    "is-white-bis"?: import("vue").ComponentOptionsWithoutProps<any, any, any, any, any, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, string[] | Record<string, ((...args: any[]) => any) | null>, string> | import("vue").ComponentOptionsWithArrayProps<any, any, any, any, any, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, string[] | Record<string, ((...args: any[]) => any) | null>, string, Readonly<{
        [x: string]: any;
    }>> | import("vue").FunctionalComponent<any, {}> | import("vue").ComponentOptionsWithObjectProps<any, any, any, any, any, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, string[] | Record<string, ((...args: any[]) => any) | null>, string, Readonly<{
        [x: string]: any;
    }> | Readonly<{
        [x: string]: any;
    } & {
        [x: number]: any;
    }>> | undefined;
};
export declare const UseMessagePropsDefinition: {
    title: {
        type: PropType<string>;
    };
    isClosable: {
        type: BooleanConstructor;
        default: boolean;
    };
    message: {
        type: PropType<string>;
    };
    variant: {
        type: PropType<AllColorsVariant>;
        default: "";
    };
    size: {
        type: PropType<import("../../types/SizeVariants").SizeVariant>;
        default: "";
    };
    iconSize: {
        type: PropType<import("../../types/SizeVariants").SizeVariant>;
        default: "";
    };
    useAutoClose: {
        type: PropType<boolean>;
        default: boolean;
    };
    duration: {
        type: PropType<number>;
        default: number;
    };
    useIcon: {
        type: PropType<boolean>;
        default: boolean;
    };
    icons: {
        type: PropType<Partial<MessageIcons>>;
        default: import("fp-ts/lib/function").Lazy<Partial<MessageIcons>>;
    };
    isActive: {
        type: PropType<boolean>;
        default: boolean;
    };
    hasPopup: {
        type: PropType<boolean>;
        default: boolean;
    };
};
export declare type UseMessageProps = ExtractPropTypes<typeof UseMessagePropsDefinition>;
export declare function useMessage(props: UseMessageProps): {
    icon: import("vue").ComputedRef<import("vue").ComponentOptionsWithoutProps<any, any, any, any, any, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, string[] | Record<string, ((...args: any[]) => any) | null>, string> | import("vue").ComponentOptionsWithArrayProps<any, any, any, any, any, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, string[] | Record<string, ((...args: any[]) => any) | null>, string, Readonly<{
        [x: string]: any;
    }>> | import("vue").FunctionalComponent<any, {}> | import("vue").ComponentOptionsWithObjectProps<any, any, any, any, any, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, string[] | Record<string, ((...args: any[]) => any) | null>, string, Readonly<{
        [x: string]: any;
    }> | Readonly<{
        [x: string]: any;
    } & {
        [x: number]: any;
    }>> | undefined>;
    iconSize: import("vue").ComputedRef<"is-small" | "is-medium" | "is-large">;
    setAutoClose: () => void;
    isOn: import("vue").Ref<boolean>;
    isOff: import("vue").ComputedRef<boolean>;
    attrs: import("vue").ComputedRef<{
        'aria-haspopup'?: boolean;
        tabindex: number;
        role: string;
        type: string;
        'aria-pressed': boolean;
        'aria-expanded': boolean;
    }>;
    listeners: {
        onClick: import("fp-ts/lib/IO").IO<void>;
        onKeydown: (e: KeyboardEvent) => void;
    };
    setOn: () => void;
    setOff: () => void;
    toggle: () => void;
};
export declare type Message = ReturnType<typeof useMessage>;
