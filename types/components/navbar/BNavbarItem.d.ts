import 'bulma/sass/components/navbar.sass';
import Vue, { VNode } from 'vue';
declare const _default: import("vue/types/vue").OptionsVue<Vue, unknown, unknown, unknown, {
    tag: string;
}, {
    name: string;
    functional: boolean;
    props: {
        tag: {
            type: StringConstructor;
            required: false;
            default: string;
        };
    };
    render(h: import("vue").CreateElement, { props, data, children }: import("vue").RenderContext<{
        tag: string;
    }>): VNode;
}>;
export default _default;
