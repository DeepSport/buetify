import './vertical-expansion-icon.sass';
import Vue, { VNode } from 'vue';
declare const _default: import("vue/types/vue").OptionsVue<Vue, unknown, unknown, unknown, {
    isExpanded: boolean;
}, {
    name: string;
    functional: boolean;
    props: {
        isExpanded: {
            type: BooleanConstructor;
            required: true;
        };
    };
    render(h: import("vue").CreateElement, { data, props }: import("vue").RenderContext<{
        isExpanded: boolean;
    }>): VNode;
}>;
export default _default;
