import 'bulma/sass/components/navbar.sass';
import Vue, { VNode } from 'vue';
declare const _default: import("vue/types/vue").OptionsVue<Vue, unknown, unknown, unknown, {
    isActive: boolean;
}, {
    name: string;
    functional: boolean;
    props: {
        isActive: {
            type: BooleanConstructor;
            required: false;
            default: boolean;
        };
    };
    render(h: import("vue").CreateElement, { data, props, children }: import("vue").RenderContext<{
        isActive: boolean;
    }>): VNode;
}>;
export default _default;
