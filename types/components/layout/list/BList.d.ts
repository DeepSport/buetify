import Vue, { PropType, VNode } from 'vue';
declare const _default: import("vue/types/vue").OptionsVue<Vue, unknown, unknown, unknown, {
    tag: TimerHandler;
    items: unknown[];
}, {
    name: string;
    functional: boolean;
    props: {
        tag: {
            type: (FunctionConstructor | StringConstructor)[];
            required: false;
            default: string;
        };
        items: {
            type: PropType<unknown[]>;
            required: true;
        };
    };
    render(h: import("vue").CreateElement, { props, data, slots, scopedSlots }: import("vue").RenderContext<{
        tag: TimerHandler;
        items: unknown[];
    }>): VNode;
}>;
export default _default;
