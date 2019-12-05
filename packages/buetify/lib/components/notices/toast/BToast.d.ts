declare const _default: import("vue").DefineComponent<{
    transition: {
        type: import("vue").PropType<import("../../..").Transition>;
        required: boolean;
    };
    position: {
        type: import("vue").PropType<import("../../..").PositionVariant>;
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
        type: import("vue").PropType<import("../../..").ColorVariant>;
        default: "";
    };
    isIndefinite: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
}, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>[] | undefined, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    variant: import("../../..").ColorVariant;
    position: import("../../..").PositionVariant;
    duration: number;
    shouldQueue: boolean;
    isIndefinite: boolean;
} & {
    transition?: string | import("../../..").TransitionClasses | undefined;
    message?: string | undefined;
}>, {
    variant: import("../../..").ColorVariant;
    position: import("../../..").PositionVariant;
    duration: number;
    shouldQueue: boolean;
    isIndefinite: boolean;
}>;
export default _default;
