import Vue, { PropType, VNode } from 'vue';
export declare const RenderVNode: import("vue/types/vue").OptionsVue<Vue, unknown, unknown, unknown, {
    node: VNode;
}, {
    name: string;
    functional: boolean;
    props: {
        node: {
            type: PropType<VNode>;
            required: false;
        };
    };
    render(h: import("vue").CreateElement, { props }: import("vue").RenderContext<{
        node: VNode;
    }>): VNode;
}>;
