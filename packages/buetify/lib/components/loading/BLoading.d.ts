import './loading.sass';
import { IO } from 'fp-ts/lib/IO';
import { VNode, ExtractPropTypes } from 'vue';
export declare const BLoadingPropsDefinition: {
    isFullscreen: {
        type: BooleanConstructor;
        default: boolean;
    };
    canCancel: {
        type: BooleanConstructor;
        default: boolean;
    };
    onToggle: {
        type: import("vue").PropType<import("fp-ts/lib/function").FunctionN<[boolean], void>>;
        required: false;
    };
    onSetOn: {
        type: import("vue").PropType<IO<void>>;
        required: false;
    };
    onSetOff: {
        type: import("vue").PropType<IO<void>>;
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
    transition: {
        type: import("vue").PropType<import("../..").Transition>;
        default: import("fp-ts/lib/function").Lazy<import("../..").Transition>;
    };
};
export declare type BLoadingProps = ExtractPropTypes<typeof BLoadingPropsDefinition>;
declare const _default: import("vue").DefineComponent<{
    isFullscreen: {
        type: BooleanConstructor;
        default: boolean;
    };
    canCancel: {
        type: BooleanConstructor;
        default: boolean;
    };
    onToggle: {
        type: import("vue").PropType<import("fp-ts/lib/function").FunctionN<[boolean], void>>;
        required: false;
    };
    onSetOn: {
        type: import("vue").PropType<IO<void>>;
        required: false;
    };
    onSetOff: {
        type: import("vue").PropType<IO<void>>;
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
    transition: {
        type: import("vue").PropType<import("../..").Transition>;
        default: import("fp-ts/lib/function").Lazy<import("../..").Transition>;
    };
}, () => VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}> | VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>[] | undefined, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    hasPopup: boolean;
    transition: import("../..").Transition;
    isActive: boolean;
    isFullscreen: boolean;
    canCancel: boolean;
} & {
    onToggle?: import("fp-ts/lib/function").FunctionN<[boolean], void> | undefined;
    onSetOn?: IO<void> | undefined;
    onSetOff?: IO<void> | undefined;
}>, {
    hasPopup: boolean;
    transition: import("../..").Transition;
    isActive: boolean;
    isFullscreen: boolean;
    canCancel: boolean;
}>;
export default _default;
