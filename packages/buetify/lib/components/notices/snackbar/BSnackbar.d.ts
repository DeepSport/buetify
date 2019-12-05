import '../../../sass/helpers/animations.sass';
import '../sass/notices.sass';
declare const _default: import("vue").DefineComponent<{
    position: {
        type: import("vue").PropType<import("../../..").PositionVariant>;
        default: "is-bottom-right";
    };
    actionText: {
        type: import("vue").PropType<string>;
        default: string;
    };
    onAction: {
        type: import("vue").PropType<import("fp-ts/lib/IO").IO<void>>;
        default: import("fp-ts/lib/function").Lazy<() => void>;
    };
    variant: {
        type: import("vue").PropType<import("../../..").ColorVariant>;
        default: "is-success";
    };
    transition: {
        type: import("vue").PropType<import("../../..").Transition>;
        required: boolean;
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
    actionText: string;
    onAction: import("fp-ts/lib/IO").IO<void>;
} & {
    transition?: string | import("../../..").TransitionClasses | undefined;
    message?: string | undefined;
}>, {
    variant: import("../../..").ColorVariant;
    position: import("../../..").PositionVariant;
    duration: number;
    shouldQueue: boolean;
    isIndefinite: boolean;
    actionText: string;
    onAction: import("fp-ts/lib/IO").IO<void>;
}>;
export default _default;
