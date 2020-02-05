import 'bulma/sass/components/navbar.sass';
import Vue, { VNode } from 'vue';
declare const _default: import("vue/types/vue").OptionsVue<Vue, unknown, unknown, unknown, {
    tag: string;
    isActive: boolean;
}, {
    name: string;
    functional: boolean;
    props: {
        tag: {
            type: StringConstructor;
            required: false;
            default: string;
        };
        isActive: {
            type: BooleanConstructor;
            required: false;
            default: boolean;
        };
    };
    render(h: import("vue").CreateElement, { data, props }: import("vue").RenderContext<{
        tag: string;
        isActive: boolean;
    }>): VNode;
}>;
export default _default;
