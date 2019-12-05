import '../../../sass/helpers/animations.sass';
import '../sass/notices.sass';
import { FunctionN } from 'fp-ts/lib/function';
import { IO } from 'fp-ts/lib/IO';
import { VNode, PropType, ExtractPropTypes, Component } from 'vue';
export declare const BNotificationPropsDefinition: {
    isNotice: {
        type: PropType<boolean>;
        default: boolean;
    };
    icon: {
        type: PropType<Component<any, any, any, Record<string, import("@vue/reactivity").ComputedGetter<any> | import("vue").WritableComputedOptions<any>>, import("vue").MethodOptions>>;
    };
    transition: {
        type: PropType<import("../../..").Transition>;
        required: boolean;
    };
    position: {
        type: PropType<import("../../..").PositionVariant>;
        default: "is-bottom";
    };
    duration: {
        type: PropType<number>;
        default: number;
    };
    message: {
        type: PropType<string>;
    };
    shouldQueue: {
        type: PropType<boolean>;
        default: boolean;
    };
    variant: {
        type: PropType<import("../../..").ColorVariant>;
        default: "";
    };
    isIndefinite: {
        type: PropType<boolean>;
        default: boolean;
    };
    title: {
        type: PropType<string>;
    };
    isClosable: {
        type: BooleanConstructor;
        default: boolean;
    };
    size: {
        type: PropType<import("../../..").SizeVariant>;
        default: "";
    };
    iconSize: {
        type: PropType<import("../../..").SizeVariant>;
        default: "";
    };
    useAutoClose: {
        type: PropType<boolean>;
        default: boolean;
    };
    useIcon: {
        type: PropType<boolean>;
        default: boolean;
    };
    icons: {
        type: PropType<Partial<import("../../../composables/message").MessageIcons>>;
        default: import("fp-ts/lib/function").Lazy<Partial<import("../../../composables/message").MessageIcons>>;
    };
    onToggle: {
        type: PropType<FunctionN<[boolean], void>>;
        required: false;
    };
    onSetOn: {
        type: PropType<IO<void>>;
        required: false;
    };
    onSetOff: {
        type: PropType<IO<void>>;
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
export declare type BNotificationProps = ExtractPropTypes<typeof BNotificationPropsDefinition>;
declare const _default: import("vue").DefineComponent<{
    isNotice: {
        type: PropType<boolean>;
        default: boolean;
    };
    icon: {
        type: PropType<Component<any, any, any, Record<string, import("@vue/reactivity").ComputedGetter<any> | import("vue").WritableComputedOptions<any>>, import("vue").MethodOptions>>;
    };
    transition: {
        type: PropType<import("../../..").Transition>;
        required: boolean;
    };
    position: {
        type: PropType<import("../../..").PositionVariant>;
        default: "is-bottom";
    };
    duration: {
        type: PropType<number>;
        default: number;
    };
    message: {
        type: PropType<string>;
    };
    shouldQueue: {
        type: PropType<boolean>;
        default: boolean;
    };
    variant: {
        type: PropType<import("../../..").ColorVariant>;
        default: "";
    };
    isIndefinite: {
        type: PropType<boolean>;
        default: boolean;
    };
    title: {
        type: PropType<string>;
    };
    isClosable: {
        type: BooleanConstructor;
        default: boolean;
    };
    size: {
        type: PropType<import("../../..").SizeVariant>;
        default: "";
    };
    iconSize: {
        type: PropType<import("../../..").SizeVariant>;
        default: "";
    };
    useAutoClose: {
        type: PropType<boolean>;
        default: boolean;
    };
    useIcon: {
        type: PropType<boolean>;
        default: boolean;
    };
    icons: {
        type: PropType<Partial<import("../../../composables/message").MessageIcons>>;
        default: import("fp-ts/lib/function").Lazy<Partial<import("../../../composables/message").MessageIcons>>;
    };
    onToggle: {
        type: PropType<FunctionN<[boolean], void>>;
        required: false;
    };
    onSetOn: {
        type: PropType<IO<void>>;
        required: false;
    };
    onSetOff: {
        type: PropType<IO<void>>;
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
}, () => VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}> | VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>[] | undefined, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    hasPopup: boolean;
    variant: import("../../..").ColorVariant;
    size: import("../../..").SizeVariant;
    icons: Partial<import("../../../composables/message").MessageIcons>;
    position: import("../../..").PositionVariant;
    duration: number;
    shouldQueue: boolean;
    isIndefinite: boolean;
    isActive: boolean;
    isClosable: boolean;
    iconSize: import("../../..").SizeVariant;
    useAutoClose: boolean;
    useIcon: boolean;
    isNotice: boolean;
} & {
    onToggle?: FunctionN<[boolean], void> | undefined;
    onSetOn?: IO<void> | undefined;
    onSetOff?: IO<void> | undefined;
    transition?: string | import("../../..").TransitionClasses | undefined;
    icon?: import("vue").ComponentOptions<any, any, any, Record<string, import("@vue/reactivity").ComputedGetter<any> | import("vue").WritableComputedOptions<any>>, import("vue").MethodOptions, any, any, any> | import("vue").FunctionalComponent<any, any> | {
        new (...args: any[]): any;
        __isFragment?: undefined;
        __isTeleport?: undefined;
        __isSuspense?: undefined;
    } | undefined;
    title?: string | undefined;
    message?: string | undefined;
}>, {
    hasPopup: boolean;
    variant: import("../../..").ColorVariant;
    size: import("../../..").SizeVariant;
    icons: Partial<import("../../../composables/message").MessageIcons>;
    position: import("../../..").PositionVariant;
    duration: number;
    shouldQueue: boolean;
    isIndefinite: boolean;
    isActive: boolean;
    isClosable: boolean;
    iconSize: import("../../..").SizeVariant;
    useAutoClose: boolean;
    useIcon: boolean;
    isNotice: boolean;
}>;
export default _default;
