import 'bulma/sass/elements/image.sass';
import Vue, { VNode } from 'vue';
declare const _default: import("vue/types/vue").OptionsVue<Vue, unknown, unknown, unknown, {
    src: string;
    alt: string;
    isRounded: boolean;
    imgClass: string;
}, {
    name: string;
    functional: boolean;
    props: {
        src: {
            type: StringConstructor;
            required: true;
        };
        alt: {
            type: StringConstructor;
            required: true;
        };
        isRounded: {
            type: BooleanConstructor;
            required: false;
            default: boolean;
        };
        imgClass: {
            required: false;
            default: string;
        };
    };
    render(h: import("vue").CreateElement, { data, props }: import("vue").RenderContext<{
        src: string;
        alt: string;
        isRounded: boolean;
        imgClass: string;
    }>): VNode;
}>;
export default _default;
