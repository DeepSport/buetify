import './modal.sass';
import { VNode, PropType, ExtractPropTypes } from 'vue';
declare const BModalPropsDefinition: {
    showExit: {
        type: PropType<boolean>;
        required: boolean;
        default: boolean;
    };
    isActive: {
        type: PropType<boolean>;
        default: boolean;
    };
    hasPopup: {
        type: PropType<boolean>;
        default: boolean;
    };
    transition: {
        type: PropType<import("../../types/Transition").Transition>;
        default: import("fp-ts/lib/function").Lazy<import("../../types/Transition").Transition>;
        required: boolean;
    };
};
export declare type BModalProps = ExtractPropTypes<typeof BModalPropsDefinition>;
declare const _default: (new () => import("vue").ComponentPublicInstance<{} & {
    transition?: string | import("../../types/Transition").TransitionClasses | undefined;
    hasPopup?: boolean | undefined;
    isActive?: boolean | undefined;
    showExit?: boolean | undefined;
}, () => VNode<import("vue").RendererNode, import("vue").RendererElement>[], {}, {}, {}, Record<string, any>, import("vue").VNodeProps, import("vue").ComponentOptionsBase<{} & {
    transition?: string | import("../../types/Transition").TransitionClasses | undefined;
    hasPopup?: boolean | undefined;
    isActive?: boolean | undefined;
    showExit?: boolean | undefined;
}, () => VNode<import("vue").RendererNode, import("vue").RendererElement>[], unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string>>) & import("vue").ComponentOptionsBase<Readonly<{
    transition: import("../../types/Transition").Transition;
    hasPopup: boolean;
    isActive: boolean;
    showExit: boolean;
} & {}>, () => VNode<import("vue").RendererNode, import("vue").RendererElement>[], unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string> & {
    props: {
        showExit: {
            type: PropType<boolean>;
            required: boolean;
            default: boolean;
        };
        isActive: {
            type: PropType<boolean>;
            default: boolean;
        };
        hasPopup: {
            type: PropType<boolean>;
            default: boolean;
        };
        transition: {
            type: PropType<import("../../types/Transition").Transition>;
            default: import("fp-ts/lib/function").Lazy<import("../../types/Transition").Transition>;
            required: boolean;
        };
    };
} & ThisType<import("vue").ComponentPublicInstance<Readonly<{
    transition: import("../../types/Transition").Transition;
    hasPopup: boolean;
    isActive: boolean;
    showExit: boolean;
} & {}>, () => VNode<import("vue").RendererNode, import("vue").RendererElement>[], {}, {}, {}, Record<string, any>, Readonly<{
    transition: import("../../types/Transition").Transition;
    hasPopup: boolean;
    isActive: boolean;
    showExit: boolean;
} & {}>, import("vue").ComponentOptionsBase<Readonly<{
    transition: import("../../types/Transition").Transition;
    hasPopup: boolean;
    isActive: boolean;
    showExit: boolean;
} & {}>, () => VNode<import("vue").RendererNode, import("vue").RendererElement>[], unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string>>>;
export default _default;
