import '../sass/notices.scss';
import { VNode, PropType, ExtractPropTypes } from 'vue';
export declare const BNotificationPropsDefinition: {
    isNotice: {
        type: PropType<boolean>;
        default: boolean;
    };
    transition: {
        type: PropType<import("../../../types/Transition").Transition>;
        required: boolean;
    };
    position: {
        type: PropType<import("../../../types/PositionVariant").PositionVariant>;
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
        type: PropType<import("../../../types/ColorVariants").ColorVariant>;
        default: "is-primary";
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
        type: PropType<import("../../../types/SizeVariants").SizeVariant>;
        default: "";
    };
    iconSize: {
        type: PropType<import("../../../types/SizeVariants").SizeVariant>;
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
declare const _default: (new () => import("vue").ComponentPublicInstance<{} & {
    message?: string | undefined;
    title?: string | undefined;
    size?: "" | "is-small" | "is-medium" | "is-large" | undefined;
    transition?: string | import("../../../types/Transition").TransitionClasses | undefined;
    duration?: number | undefined;
    hasPopup?: boolean | undefined;
    position?: "is-top-right" | "is-top" | "is-top-left" | "is-bottom-right" | "is-bottom" | "is-bottom-left" | undefined;
    shouldQueue?: boolean | undefined;
    variant?: "" | "is-orange" | "is-primary" | "is-info" | "is-link" | "is-success" | "is-warning" | "is-danger" | undefined;
    isIndefinite?: boolean | undefined;
    isActive?: boolean | undefined;
    icons?: Partial<import("../../../composables/message").MessageIcons> | undefined;
    isClosable?: boolean | undefined;
    iconSize?: "" | "is-small" | "is-medium" | "is-large" | undefined;
    useAutoClose?: boolean | undefined;
    useIcon?: boolean | undefined;
    isNotice?: boolean | undefined;
}, () => VNode<import("vue").RendererNode, import("vue").RendererElement> | VNode<import("vue").RendererNode, import("vue").RendererElement>[] | undefined, {}, {}, {}, Record<string, any>, import("vue").VNodeProps, import("vue").ComponentOptionsBase<{} & {
    message?: string | undefined;
    title?: string | undefined;
    size?: "" | "is-small" | "is-medium" | "is-large" | undefined;
    transition?: string | import("../../../types/Transition").TransitionClasses | undefined;
    duration?: number | undefined;
    hasPopup?: boolean | undefined;
    position?: "is-top-right" | "is-top" | "is-top-left" | "is-bottom-right" | "is-bottom" | "is-bottom-left" | undefined;
    shouldQueue?: boolean | undefined;
    variant?: "" | "is-orange" | "is-primary" | "is-info" | "is-link" | "is-success" | "is-warning" | "is-danger" | undefined;
    isIndefinite?: boolean | undefined;
    isActive?: boolean | undefined;
    icons?: Partial<import("../../../composables/message").MessageIcons> | undefined;
    isClosable?: boolean | undefined;
    iconSize?: "" | "is-small" | "is-medium" | "is-large" | undefined;
    useAutoClose?: boolean | undefined;
    useIcon?: boolean | undefined;
    isNotice?: boolean | undefined;
}, () => VNode<import("vue").RendererNode, import("vue").RendererElement> | VNode<import("vue").RendererNode, import("vue").RendererElement>[] | undefined, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string>>) & import("vue").ComponentOptionsBase<Readonly<{
    size: import("../../../types/SizeVariants").SizeVariant;
    duration: number;
    hasPopup: boolean;
    position: import("../../../types/PositionVariant").PositionVariant;
    shouldQueue: boolean;
    variant: import("../../../types/ColorVariants").ColorVariant;
    isIndefinite: boolean;
    isActive: boolean;
    icons: Partial<import("../../../composables/message").MessageIcons>;
    isClosable: boolean;
    iconSize: import("../../../types/SizeVariants").SizeVariant;
    useAutoClose: boolean;
    useIcon: boolean;
    isNotice: boolean;
} & {
    message?: string | undefined;
    title?: string | undefined;
    transition?: string | import("../../../types/Transition").TransitionClasses | undefined;
}>, () => VNode<import("vue").RendererNode, import("vue").RendererElement> | VNode<import("vue").RendererNode, import("vue").RendererElement>[] | undefined, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string> & {
    props: {
        isNotice: {
            type: PropType<boolean>;
            default: boolean;
        };
        transition: {
            type: PropType<import("../../../types/Transition").Transition>;
            required: boolean;
        };
        position: {
            type: PropType<import("../../../types/PositionVariant").PositionVariant>;
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
            type: PropType<import("../../../types/ColorVariants").ColorVariant>;
            default: "is-primary";
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
            type: PropType<import("../../../types/SizeVariants").SizeVariant>;
            default: "";
        };
        iconSize: {
            type: PropType<import("../../../types/SizeVariants").SizeVariant>;
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
        isActive: {
            type: PropType<boolean>;
            default: boolean;
        };
        hasPopup: {
            type: PropType<boolean>;
            default: boolean;
        };
    };
} & ThisType<import("vue").ComponentPublicInstance<Readonly<{
    size: import("../../../types/SizeVariants").SizeVariant;
    duration: number;
    hasPopup: boolean;
    position: import("../../../types/PositionVariant").PositionVariant;
    shouldQueue: boolean;
    variant: import("../../../types/ColorVariants").ColorVariant;
    isIndefinite: boolean;
    isActive: boolean;
    icons: Partial<import("../../../composables/message").MessageIcons>;
    isClosable: boolean;
    iconSize: import("../../../types/SizeVariants").SizeVariant;
    useAutoClose: boolean;
    useIcon: boolean;
    isNotice: boolean;
} & {
    message?: string | undefined;
    title?: string | undefined;
    transition?: string | import("../../../types/Transition").TransitionClasses | undefined;
}>, () => VNode<import("vue").RendererNode, import("vue").RendererElement> | VNode<import("vue").RendererNode, import("vue").RendererElement>[] | undefined, {}, {}, {}, Record<string, any>, Readonly<{
    size: import("../../../types/SizeVariants").SizeVariant;
    duration: number;
    hasPopup: boolean;
    position: import("../../../types/PositionVariant").PositionVariant;
    shouldQueue: boolean;
    variant: import("../../../types/ColorVariants").ColorVariant;
    isIndefinite: boolean;
    isActive: boolean;
    icons: Partial<import("../../../composables/message").MessageIcons>;
    isClosable: boolean;
    iconSize: import("../../../types/SizeVariants").SizeVariant;
    useAutoClose: boolean;
    useIcon: boolean;
    isNotice: boolean;
} & {
    message?: string | undefined;
    title?: string | undefined;
    transition?: string | import("../../../types/Transition").TransitionClasses | undefined;
}>, import("vue").ComponentOptionsBase<Readonly<{
    size: import("../../../types/SizeVariants").SizeVariant;
    duration: number;
    hasPopup: boolean;
    position: import("../../../types/PositionVariant").PositionVariant;
    shouldQueue: boolean;
    variant: import("../../../types/ColorVariants").ColorVariant;
    isIndefinite: boolean;
    isActive: boolean;
    icons: Partial<import("../../../composables/message").MessageIcons>;
    isClosable: boolean;
    iconSize: import("../../../types/SizeVariants").SizeVariant;
    useAutoClose: boolean;
    useIcon: boolean;
    isNotice: boolean;
} & {
    message?: string | undefined;
    title?: string | undefined;
    transition?: string | import("../../../types/Transition").TransitionClasses | undefined;
}>, () => VNode<import("vue").RendererNode, import("vue").RendererElement> | VNode<import("vue").RendererNode, import("vue").RendererElement>[] | undefined, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string>>>;
export default _default;
