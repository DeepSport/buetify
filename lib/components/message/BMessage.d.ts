import './message.sass';
import { VNode } from 'vue';
declare const _default: (new () => import("vue").ComponentPublicInstance<{} & {
    message?: string | undefined;
    title?: string | undefined;
    size?: "" | "is-small" | "is-medium" | "is-large" | undefined;
    transition?: string | import("../../types/Transition").TransitionClasses | undefined;
    duration?: number | undefined;
    hasPopup?: boolean | undefined;
    variant?: "" | "is-black-ter" | "is-orange" | "is-primary" | "is-info" | "is-link" | "is-success" | "is-warning" | "is-danger" | "is-white" | "is-black" | "is-light" | "is-dark" | "is-black-bis" | "is-grey-darker" | "is-grey-dark" | "is-grey" | "is-grey-light" | "is-grey-lighter" | "is-white-ter" | "is-white-bis" | undefined;
    isActive?: boolean | undefined;
    icons?: Partial<import("../../composables/message").MessageIcons> | undefined;
    isClosable?: boolean | undefined;
    iconSize?: "" | "is-small" | "is-medium" | "is-large" | undefined;
    useAutoClose?: boolean | undefined;
    useIcon?: boolean | undefined;
}, VNode<import("vue").RendererNode, import("vue").RendererElement>, {}, {}, {}, Record<string, any>, import("vue").VNodeProps, import("vue").ComponentOptionsBase<{} & {
    message?: string | undefined;
    title?: string | undefined;
    size?: "" | "is-small" | "is-medium" | "is-large" | undefined;
    transition?: string | import("../../types/Transition").TransitionClasses | undefined;
    duration?: number | undefined;
    hasPopup?: boolean | undefined;
    variant?: "" | "is-black-ter" | "is-orange" | "is-primary" | "is-info" | "is-link" | "is-success" | "is-warning" | "is-danger" | "is-white" | "is-black" | "is-light" | "is-dark" | "is-black-bis" | "is-grey-darker" | "is-grey-dark" | "is-grey" | "is-grey-light" | "is-grey-lighter" | "is-white-ter" | "is-white-bis" | undefined;
    isActive?: boolean | undefined;
    icons?: Partial<import("../../composables/message").MessageIcons> | undefined;
    isClosable?: boolean | undefined;
    iconSize?: "" | "is-small" | "is-medium" | "is-large" | undefined;
    useAutoClose?: boolean | undefined;
    useIcon?: boolean | undefined;
}, VNode<import("vue").RendererNode, import("vue").RendererElement>, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string>>) & import("vue").ComponentOptionsBase<Readonly<{
    size: import("../../types/SizeVariants").SizeVariant;
    transition: import("../../types/Transition").Transition;
    duration: number;
    hasPopup: boolean;
    variant: import("../../types/ColorVariants").AllColorsVariant;
    isActive: boolean;
    icons: Partial<import("../../composables/message").MessageIcons>;
    isClosable: boolean;
    iconSize: import("../../types/SizeVariants").SizeVariant;
    useAutoClose: boolean;
    useIcon: boolean;
} & {
    message?: string | undefined;
    title?: string | undefined;
}>, VNode<import("vue").RendererNode, import("vue").RendererElement>, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string> & {
    props: {
        transition: {
            type: import("vue").PropType<import("../../types/Transition").Transition>;
            default: import("fp-ts/lib/function").Lazy<import("../../types/Transition").Transition>;
            required: boolean;
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
            type: import("vue").PropType<import("../../types/ColorVariants").AllColorsVariant>;
            default: "";
        };
        size: {
            type: import("vue").PropType<import("../../types/SizeVariants").SizeVariant>;
            default: "";
        };
        iconSize: {
            type: import("vue").PropType<import("../../types/SizeVariants").SizeVariant>;
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
        isActive: {
            type: import("vue").PropType<boolean>;
            default: boolean;
        };
        hasPopup: {
            type: import("vue").PropType<boolean>;
            default: boolean;
        };
    };
} & ThisType<import("vue").ComponentPublicInstance<Readonly<{
    size: import("../../types/SizeVariants").SizeVariant;
    transition: import("../../types/Transition").Transition;
    duration: number;
    hasPopup: boolean;
    variant: import("../../types/ColorVariants").AllColorsVariant;
    isActive: boolean;
    icons: Partial<import("../../composables/message").MessageIcons>;
    isClosable: boolean;
    iconSize: import("../../types/SizeVariants").SizeVariant;
    useAutoClose: boolean;
    useIcon: boolean;
} & {
    message?: string | undefined;
    title?: string | undefined;
}>, VNode<import("vue").RendererNode, import("vue").RendererElement>, {}, {}, {}, Record<string, any>, Readonly<{
    size: import("../../types/SizeVariants").SizeVariant;
    transition: import("../../types/Transition").Transition;
    duration: number;
    hasPopup: boolean;
    variant: import("../../types/ColorVariants").AllColorsVariant;
    isActive: boolean;
    icons: Partial<import("../../composables/message").MessageIcons>;
    isClosable: boolean;
    iconSize: import("../../types/SizeVariants").SizeVariant;
    useAutoClose: boolean;
    useIcon: boolean;
} & {
    message?: string | undefined;
    title?: string | undefined;
}>, import("vue").ComponentOptionsBase<Readonly<{
    size: import("../../types/SizeVariants").SizeVariant;
    transition: import("../../types/Transition").Transition;
    duration: number;
    hasPopup: boolean;
    variant: import("../../types/ColorVariants").AllColorsVariant;
    isActive: boolean;
    icons: Partial<import("../../composables/message").MessageIcons>;
    isClosable: boolean;
    iconSize: import("../../types/SizeVariants").SizeVariant;
    useAutoClose: boolean;
    useIcon: boolean;
} & {
    message?: string | undefined;
    title?: string | undefined;
}>, VNode<import("vue").RendererNode, import("vue").RendererElement>, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string>>>;
export default _default;
