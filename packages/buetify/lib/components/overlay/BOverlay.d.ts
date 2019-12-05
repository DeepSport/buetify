import './overlay.sass';
import { IO } from 'fp-ts/lib/IO';
import { PropType } from 'vue';
declare type OverlayPosition = 'is-left' | 'is-right' | 'is-centered';
declare const _default: import("vue").DefineComponent<{
    position: {
        type: PropType<OverlayPosition>;
        required: false;
    };
    isActive: {
        type: PropType<boolean>;
        default: boolean;
    };
    isFullscreen: {
        type: PropType<boolean>;
        default: boolean;
    };
    onClick: {
        type: PropType<IO<void>>;
        required: false;
    };
}, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    isActive: boolean;
    isFullscreen: boolean;
} & {
    position?: "is-left" | "is-right" | "is-centered" | undefined;
    onClick?: IO<void> | undefined;
}>, {
    isActive: boolean;
    isFullscreen: boolean;
}>;
export default _default;
