declare const _default: (new () => import("vue").ComponentPublicInstance<{} & {
    message?: string | undefined;
    transition?: string | import("../../../types/Transition").TransitionClasses | undefined;
    duration?: number | undefined;
    position?: "is-top-right" | "is-top" | "is-top-left" | "is-bottom-right" | "is-bottom" | "is-bottom-left" | undefined;
    shouldQueue?: boolean | undefined;
    variant?: "" | "is-orange" | "is-primary" | "is-info" | "is-link" | "is-success" | "is-warning" | "is-danger" | undefined;
    isIndefinite?: boolean | undefined;
}, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement>[] | undefined, {}, {}, {}, Record<string, any>, import("vue").VNodeProps, import("vue").ComponentOptionsBase<{} & {
    message?: string | undefined;
    transition?: string | import("../../../types/Transition").TransitionClasses | undefined;
    duration?: number | undefined;
    position?: "is-top-right" | "is-top" | "is-top-left" | "is-bottom-right" | "is-bottom" | "is-bottom-left" | undefined;
    shouldQueue?: boolean | undefined;
    variant?: "" | "is-orange" | "is-primary" | "is-info" | "is-link" | "is-success" | "is-warning" | "is-danger" | undefined;
    isIndefinite?: boolean | undefined;
}, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement>[] | undefined, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string>>) & import("vue").ComponentOptionsBase<Readonly<{
    duration: number;
    position: import("../../../types/PositionVariant").PositionVariant;
    shouldQueue: boolean;
    variant: import("../../../types/ColorVariants").ColorVariant;
    isIndefinite: boolean;
} & {
    message?: string | undefined;
    transition?: string | import("../../../types/Transition").TransitionClasses | undefined;
}>, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement>[] | undefined, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string> & {
    props: {
        transition: {
            type: import("vue").PropType<import("../../../types/Transition").Transition>;
            required: boolean;
        };
        position: {
            type: import("vue").PropType<import("../../../types/PositionVariant").PositionVariant>;
            default: "is-bottom";
        };
        duration: {
            type: import("vue").PropType<number>;
            default: number;
        };
        message: {
            type: import("vue").PropType<string>;
        };
        shouldQueue: {
            type: import("vue").PropType<boolean>;
            default: boolean;
        };
        variant: {
            type: import("vue").PropType<import("../../../types/ColorVariants").ColorVariant>;
            default: "is-primary";
        };
        isIndefinite: {
            type: import("vue").PropType<boolean>;
            default: boolean;
        };
    };
} & ThisType<import("vue").ComponentPublicInstance<Readonly<{
    duration: number;
    position: import("../../../types/PositionVariant").PositionVariant;
    shouldQueue: boolean;
    variant: import("../../../types/ColorVariants").ColorVariant;
    isIndefinite: boolean;
} & {
    message?: string | undefined;
    transition?: string | import("../../../types/Transition").TransitionClasses | undefined;
}>, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement>[] | undefined, {}, {}, {}, Record<string, any>, Readonly<{
    duration: number;
    position: import("../../../types/PositionVariant").PositionVariant;
    shouldQueue: boolean;
    variant: import("../../../types/ColorVariants").ColorVariant;
    isIndefinite: boolean;
} & {
    message?: string | undefined;
    transition?: string | import("../../../types/Transition").TransitionClasses | undefined;
}>, import("vue").ComponentOptionsBase<Readonly<{
    duration: number;
    position: import("../../../types/PositionVariant").PositionVariant;
    shouldQueue: boolean;
    variant: import("../../../types/ColorVariants").ColorVariant;
    isIndefinite: boolean;
} & {
    message?: string | undefined;
    transition?: string | import("../../../types/Transition").TransitionClasses | undefined;
}>, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement>[] | undefined, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string>>>;
export default _default;
