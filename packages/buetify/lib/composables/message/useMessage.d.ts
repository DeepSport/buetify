import { PropType, ExtractPropTypes, Component } from 'vue';
import { AllColorsVariant } from '../../types/ColorVariants';
export declare type MessageSize = 'is-small' | 'is-medium' | 'is-large' | '';
export declare type MessageIcons = {
    [K in AllColorsVariant]: Component;
};
export declare function getMessageIcons(icons: Partial<MessageIcons>): {
    ""?: import("vue").ComponentOptions<any, any, any, Record<string, import("@vue/reactivity").ComputedGetter<any> | import("vue").WritableComputedOptions<any>>, import("vue").MethodOptions, any, any, any> | import("vue").FunctionalComponent<any, any> | {
        new (...args: any[]): any;
        __isFragment?: undefined;
        __isTeleport?: undefined;
        __isSuspense?: undefined;
    } | undefined;
    "is-black-ter"?: import("vue").ComponentOptions<any, any, any, Record<string, import("@vue/reactivity").ComputedGetter<any> | import("vue").WritableComputedOptions<any>>, import("vue").MethodOptions, any, any, any> | import("vue").FunctionalComponent<any, any> | {
        new (...args: any[]): any;
        __isFragment?: undefined;
        __isTeleport?: undefined;
        __isSuspense?: undefined;
    } | undefined;
    "is-orange"?: import("vue").ComponentOptions<any, any, any, Record<string, import("@vue/reactivity").ComputedGetter<any> | import("vue").WritableComputedOptions<any>>, import("vue").MethodOptions, any, any, any> | import("vue").FunctionalComponent<any, any> | {
        new (...args: any[]): any;
        __isFragment?: undefined;
        __isTeleport?: undefined;
        __isSuspense?: undefined;
    } | undefined;
    "is-primary"?: import("vue").ComponentOptions<any, any, any, Record<string, import("@vue/reactivity").ComputedGetter<any> | import("vue").WritableComputedOptions<any>>, import("vue").MethodOptions, any, any, any> | import("vue").FunctionalComponent<any, any> | {
        new (...args: any[]): any;
        __isFragment?: undefined;
        __isTeleport?: undefined;
        __isSuspense?: undefined;
    } | undefined;
    "is-info"?: import("vue").ComponentOptions<any, any, any, Record<string, import("@vue/reactivity").ComputedGetter<any> | import("vue").WritableComputedOptions<any>>, import("vue").MethodOptions, any, any, any> | import("vue").FunctionalComponent<any, any> | {
        new (...args: any[]): any;
        __isFragment?: undefined;
        __isTeleport?: undefined;
        __isSuspense?: undefined;
    } | undefined;
    "is-link"?: import("vue").ComponentOptions<any, any, any, Record<string, import("@vue/reactivity").ComputedGetter<any> | import("vue").WritableComputedOptions<any>>, import("vue").MethodOptions, any, any, any> | import("vue").FunctionalComponent<any, any> | {
        new (...args: any[]): any;
        __isFragment?: undefined;
        __isTeleport?: undefined;
        __isSuspense?: undefined;
    } | undefined;
    "is-success"?: import("vue").ComponentOptions<any, any, any, Record<string, import("@vue/reactivity").ComputedGetter<any> | import("vue").WritableComputedOptions<any>>, import("vue").MethodOptions, any, any, any> | import("vue").FunctionalComponent<any, any> | {
        new (...args: any[]): any;
        __isFragment?: undefined;
        __isTeleport?: undefined;
        __isSuspense?: undefined;
    } | undefined;
    "is-warning"?: import("vue").ComponentOptions<any, any, any, Record<string, import("@vue/reactivity").ComputedGetter<any> | import("vue").WritableComputedOptions<any>>, import("vue").MethodOptions, any, any, any> | import("vue").FunctionalComponent<any, any> | {
        new (...args: any[]): any;
        __isFragment?: undefined;
        __isTeleport?: undefined;
        __isSuspense?: undefined;
    } | undefined;
    "is-danger"?: import("vue").ComponentOptions<any, any, any, Record<string, import("@vue/reactivity").ComputedGetter<any> | import("vue").WritableComputedOptions<any>>, import("vue").MethodOptions, any, any, any> | import("vue").FunctionalComponent<any, any> | {
        new (...args: any[]): any;
        __isFragment?: undefined;
        __isTeleport?: undefined;
        __isSuspense?: undefined;
    } | undefined;
    "is-white"?: import("vue").ComponentOptions<any, any, any, Record<string, import("@vue/reactivity").ComputedGetter<any> | import("vue").WritableComputedOptions<any>>, import("vue").MethodOptions, any, any, any> | import("vue").FunctionalComponent<any, any> | {
        new (...args: any[]): any;
        __isFragment?: undefined;
        __isTeleport?: undefined;
        __isSuspense?: undefined;
    } | undefined;
    "is-black"?: import("vue").ComponentOptions<any, any, any, Record<string, import("@vue/reactivity").ComputedGetter<any> | import("vue").WritableComputedOptions<any>>, import("vue").MethodOptions, any, any, any> | import("vue").FunctionalComponent<any, any> | {
        new (...args: any[]): any;
        __isFragment?: undefined;
        __isTeleport?: undefined;
        __isSuspense?: undefined;
    } | undefined;
    "is-light"?: import("vue").ComponentOptions<any, any, any, Record<string, import("@vue/reactivity").ComputedGetter<any> | import("vue").WritableComputedOptions<any>>, import("vue").MethodOptions, any, any, any> | import("vue").FunctionalComponent<any, any> | {
        new (...args: any[]): any;
        __isFragment?: undefined;
        __isTeleport?: undefined;
        __isSuspense?: undefined;
    } | undefined;
    "is-dark"?: import("vue").ComponentOptions<any, any, any, Record<string, import("@vue/reactivity").ComputedGetter<any> | import("vue").WritableComputedOptions<any>>, import("vue").MethodOptions, any, any, any> | import("vue").FunctionalComponent<any, any> | {
        new (...args: any[]): any;
        __isFragment?: undefined;
        __isTeleport?: undefined;
        __isSuspense?: undefined;
    } | undefined;
    "is-black-bis"?: import("vue").ComponentOptions<any, any, any, Record<string, import("@vue/reactivity").ComputedGetter<any> | import("vue").WritableComputedOptions<any>>, import("vue").MethodOptions, any, any, any> | import("vue").FunctionalComponent<any, any> | {
        new (...args: any[]): any;
        __isFragment?: undefined;
        __isTeleport?: undefined;
        __isSuspense?: undefined;
    } | undefined;
    "is-grey-darker"?: import("vue").ComponentOptions<any, any, any, Record<string, import("@vue/reactivity").ComputedGetter<any> | import("vue").WritableComputedOptions<any>>, import("vue").MethodOptions, any, any, any> | import("vue").FunctionalComponent<any, any> | {
        new (...args: any[]): any;
        __isFragment?: undefined;
        __isTeleport?: undefined;
        __isSuspense?: undefined;
    } | undefined;
    "is-grey-dark"?: import("vue").ComponentOptions<any, any, any, Record<string, import("@vue/reactivity").ComputedGetter<any> | import("vue").WritableComputedOptions<any>>, import("vue").MethodOptions, any, any, any> | import("vue").FunctionalComponent<any, any> | {
        new (...args: any[]): any;
        __isFragment?: undefined;
        __isTeleport?: undefined;
        __isSuspense?: undefined;
    } | undefined;
    "is-grey"?: import("vue").ComponentOptions<any, any, any, Record<string, import("@vue/reactivity").ComputedGetter<any> | import("vue").WritableComputedOptions<any>>, import("vue").MethodOptions, any, any, any> | import("vue").FunctionalComponent<any, any> | {
        new (...args: any[]): any;
        __isFragment?: undefined;
        __isTeleport?: undefined;
        __isSuspense?: undefined;
    } | undefined;
    "is-grey-light"?: import("vue").ComponentOptions<any, any, any, Record<string, import("@vue/reactivity").ComputedGetter<any> | import("vue").WritableComputedOptions<any>>, import("vue").MethodOptions, any, any, any> | import("vue").FunctionalComponent<any, any> | {
        new (...args: any[]): any;
        __isFragment?: undefined;
        __isTeleport?: undefined;
        __isSuspense?: undefined;
    } | undefined;
    "is-grey-lighter"?: import("vue").ComponentOptions<any, any, any, Record<string, import("@vue/reactivity").ComputedGetter<any> | import("vue").WritableComputedOptions<any>>, import("vue").MethodOptions, any, any, any> | import("vue").FunctionalComponent<any, any> | {
        new (...args: any[]): any;
        __isFragment?: undefined;
        __isTeleport?: undefined;
        __isSuspense?: undefined;
    } | undefined;
    "is-white-ter"?: import("vue").ComponentOptions<any, any, any, Record<string, import("@vue/reactivity").ComputedGetter<any> | import("vue").WritableComputedOptions<any>>, import("vue").MethodOptions, any, any, any> | import("vue").FunctionalComponent<any, any> | {
        new (...args: any[]): any;
        __isFragment?: undefined;
        __isTeleport?: undefined;
        __isSuspense?: undefined;
    } | undefined;
    "is-white-bis"?: import("vue").ComponentOptions<any, any, any, Record<string, import("@vue/reactivity").ComputedGetter<any> | import("vue").WritableComputedOptions<any>>, import("vue").MethodOptions, any, any, any> | import("vue").FunctionalComponent<any, any> | {
        new (...args: any[]): any;
        __isFragment?: undefined;
        __isTeleport?: undefined;
        __isSuspense?: undefined;
    } | undefined;
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
        type: PropType<import("../..").SizeVariant>;
        default: "";
    };
    iconSize: {
        type: PropType<import("../..").SizeVariant>;
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
    icon: {
        type: PropType<Component<any, any, any, Record<string, import("@vue/reactivity").ComputedGetter<any> | import("vue").WritableComputedOptions<any>>, import("vue").MethodOptions>>;
    };
    onToggle: {
        type: PropType<import("fp-ts/lib/function").FunctionN<[boolean], void>>;
        required: false;
    };
    onSetOn: {
        type: PropType<import("fp-ts/lib/IO").IO<void>>;
        required: false;
    };
    onSetOff: {
        type: PropType<import("fp-ts/lib/IO").IO<void>>;
        required: false;
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
    icon: import("vue").ComputedRef<import("vue").ComponentOptions<any, any, any, Record<string, import("@vue/reactivity").ComputedGetter<any> | import("vue").WritableComputedOptions<any>>, import("vue").MethodOptions, any, any, any> | import("vue").FunctionalComponent<any, any> | {
        new (...args: any[]): any;
        __isFragment?: undefined;
        __isTeleport?: undefined;
        __isSuspense?: undefined;
    } | undefined>;
    iconSize: import("vue").ComputedRef<"is-small" | "is-medium" | "is-large">;
    setAutoClose: () => void;
    isOn: import("vue").WritableComputedRef<boolean>;
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
    props: import("vue").ComputedRef<{
        onClick: import("fp-ts/lib/IO").IO<void>;
        onKeydown: (e: KeyboardEvent) => void;
        'aria-haspopup'?: boolean;
        tabindex: number;
        role: string;
        type: string;
        'aria-pressed': boolean;
        'aria-expanded': boolean;
    }>;
    setOn: (e?: Event | undefined) => void;
    setOff: (e?: Event | undefined) => void;
    toggle: (e?: Event | undefined) => void;
};
export declare type Message = ReturnType<typeof useMessage>;
