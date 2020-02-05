import './overlay.sass';
import Vue, { VNode } from 'vue';
import { PropValidator } from 'vue/types/options';
declare type OverlayPosition = 'is-left' | 'is-right' | 'is-centered';
declare const _default: import("vue/types/vue").OptionsVue<Vue, unknown, unknown, unknown, {
    position: OverlayPosition;
    isActive: boolean;
    isFullscreen: boolean;
}, {
    name: string;
    functional: boolean;
    props: {
        position: PropValidator<OverlayPosition>;
        isActive: {
            type: BooleanConstructor;
            required: true;
        };
        isFullscreen: {
            type: BooleanConstructor;
            default: boolean;
        };
    };
    render(h: import("vue").CreateElement, { data, props, children }: import("vue").RenderContext<{
        position: OverlayPosition;
        isActive: boolean;
        isFullscreen: boolean;
    }>): VNode;
}>;
export default _default;
