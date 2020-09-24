import './fullscreen-modal.sass';
import { VNode } from 'vue';
declare const _default: (new () => import("vue").ComponentPublicInstance<{} & {
    transition?: string | import("../../types/Transition").TransitionClasses | undefined;
    hasPopup?: boolean | undefined;
    isActive?: boolean | undefined;
}, () => VNode<import("vue").RendererNode, import("vue").RendererElement>[], {}, {}, {}, Record<string, any>, import("vue").VNodeProps, import("vue").ComponentOptionsBase<{} & {
    transition?: string | import("../../types/Transition").TransitionClasses | undefined;
    hasPopup?: boolean | undefined;
    isActive?: boolean | undefined;
}, () => VNode<import("vue").RendererNode, import("vue").RendererElement>[], unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string>>) & import("vue").ComponentOptionsBase<Readonly<{
    transition: import("../../types/Transition").Transition;
    hasPopup: boolean;
    isActive: boolean;
} & {}>, () => VNode<import("vue").RendererNode, import("vue").RendererElement>[], unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string> & {
    props: {
        isActive: {
            type: import("vue").PropType<boolean>;
            default: boolean;
        };
        hasPopup: {
            type: import("vue").PropType<boolean>;
            default: boolean;
        };
        transition: {
            type: import("vue").PropType<import("../../types/Transition").Transition>;
            default: import("fp-ts/lib/function").Lazy<import("../../types/Transition").Transition>;
            required: boolean;
        };
    };
} & ThisType<import("vue").ComponentPublicInstance<Readonly<{
    transition: import("../../types/Transition").Transition;
    hasPopup: boolean;
    isActive: boolean;
} & {}>, () => VNode<import("vue").RendererNode, import("vue").RendererElement>[], {}, {}, {}, Record<string, any>, Readonly<{
    transition: import("../../types/Transition").Transition;
    hasPopup: boolean;
    isActive: boolean;
} & {}>, import("vue").ComponentOptionsBase<Readonly<{
    transition: import("../../types/Transition").Transition;
    hasPopup: boolean;
    isActive: boolean;
} & {}>, () => VNode<import("vue").RendererNode, import("vue").RendererElement>[], unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string>>>;
export default _default;
