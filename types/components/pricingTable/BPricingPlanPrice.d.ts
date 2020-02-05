import './pricing-table.sass';
import Vue, { VNode } from 'vue';
declare const _default: import("vue/types/vue").OptionsVue<Vue, unknown, unknown, unknown, {
    amount: number;
    interval: string;
}, {
    name: string;
    functional: boolean;
    props: {
        amount: {
            type: NumberConstructor;
            required: true;
        };
        interval: {
            type: StringConstructor;
            required: true;
        };
    };
    render(h: import("vue").CreateElement, { props, slots }: import("vue").RenderContext<{
        amount: number;
        interval: string;
    }>): VNode;
}>;
export default _default;
