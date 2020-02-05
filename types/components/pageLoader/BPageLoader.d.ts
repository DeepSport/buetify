import './pageloader.sass';
import Vue, { VNode } from 'vue';
declare const _default: import("vue/types/vue").OptionsVue<Vue, unknown, unknown, unknown, {
    text: string;
}, {
    name: string;
    functional: boolean;
    props: {
        text: {
            type: StringConstructor;
            required: false;
        };
    };
    render(h: import("vue").CreateElement, { data, props }: import("vue").RenderContext<{
        text: string;
    }>): VNode;
}>;
export default _default;
