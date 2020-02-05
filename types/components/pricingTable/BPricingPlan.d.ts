import './pricing-table.sass';
import Vue, { VNode } from 'vue';
declare const _default: import("vue/types/vue").OptionsVue<Vue, unknown, unknown, unknown, {
    isActive: boolean;
    amount: number;
    interval: string;
}, {
    name: string;
    functional: boolean;
    components: {
        BPricingPlanPrice: import("vue/types/vue").OptionsVue<Vue, unknown, unknown, unknown, {
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
    };
    props: {
        isActive: {
            type: BooleanConstructor;
            required: false;
            default: boolean;
        };
        amount: {
            type: NumberConstructor;
            required: false;
        };
        interval: {
            type: StringConstructor;
            required: false;
        };
    };
    render(h: import("vue").CreateElement, { props, slots }: import("vue").RenderContext<{
        isActive: boolean;
        amount: number;
        interval: string;
    }>): VNode;
}>;
export default _default;
