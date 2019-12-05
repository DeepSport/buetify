import 'bulma/sass/components/message.sass';
import 'bulma/sass/elements/notification.sass';
import '../../sass/helpers/animations.sass';
import './message.sass';
import { VNode } from 'vue';
declare const _default: import("vue").DefineComponent<{
    transition: {
        type: import("vue").PropType<import("../..").Transition>;
        default: import("fp-ts/lib/function").Lazy<import("../..").Transition>;
    };
    title: {
        type: import("vue").PropType<string>;
    };
    isClosable: {
        type: BooleanConstructor;
        default: boolean;
    };
    message: {
        type: import("vue").PropType<string>;
    };
    variant: {
        type: import("vue").PropType<import("../..").AllColorsVariant>;
        default: "";
    };
    size: {
        type: import("vue").PropType<import("../..").SizeVariant>;
        default: "";
    };
    iconSize: {
        type: import("vue").PropType<import("../..").SizeVariant>;
        default: "";
    };
    useAutoClose: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    duration: {
        type: import("vue").PropType<number>;
        default: number;
    };
    useIcon: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    icons: {
        type: import("vue").PropType<Partial<import("../../composables/message").MessageIcons>>;
        default: import("fp-ts/lib/function").Lazy<Partial<import("../../composables/message").MessageIcons>>;
    };
    icon: {
        type: import("vue").PropType<import("vue").Component<any, any, any, Record<string, import("@vue/reactivity").ComputedGetter<any> | import("vue").WritableComputedOptions<any>>, import("vue").MethodOptions>>;
    };
    onToggle: {
        type: import("vue").PropType<import("fp-ts/lib/function").FunctionN<[boolean], void>>;
        required: false;
    };
    onSetOn: {
        type: import("vue").PropType<import("fp-ts/lib/IO").IO<void>>;
        required: false;
    };
    onSetOff: {
        type: import("vue").PropType<import("fp-ts/lib/IO").IO<void>>;
        required: false;
    };
    isActive: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    hasPopup: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
}, () => VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    hasPopup: boolean;
    transition: import("../..").Transition;
    variant: import("../..").AllColorsVariant;
    size: import("../..").SizeVariant;
    icons: Partial<import("../../composables/message").MessageIcons>;
    duration: number;
    isActive: boolean;
    isClosable: boolean;
    iconSize: import("../..").SizeVariant;
    useAutoClose: boolean;
    useIcon: boolean;
} & {
    onToggle?: import("fp-ts/lib/function").FunctionN<[boolean], void> | undefined;
    onSetOn?: import("fp-ts/lib/IO").IO<void> | undefined;
    onSetOff?: import("fp-ts/lib/IO").IO<void> | undefined;
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
    transition: import("../..").Transition;
    variant: import("../..").AllColorsVariant;
    size: import("../..").SizeVariant;
    icons: Partial<import("../../composables/message").MessageIcons>;
    duration: number;
    isActive: boolean;
    isClosable: boolean;
    iconSize: import("../..").SizeVariant;
    useAutoClose: boolean;
    useIcon: boolean;
}>;
export default _default;
