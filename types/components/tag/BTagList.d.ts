import './tag.sass';
import Vue, { VNode } from 'vue';
declare const _default: import("vue/types/vue").OptionsVue<Vue, unknown, unknown, unknown, {
    isAttached: boolean;
    tag: TimerHandler;
}, {
    name: string;
    functional: boolean;
    props: {
        isAttached: BooleanConstructor;
        tag: {
            type: (FunctionConstructor | StringConstructor)[];
            required: false;
            default: string;
        };
    };
    render(h: import("vue").CreateElement, { data, props, children }: import("vue").RenderContext<{
        isAttached: boolean;
        tag: TimerHandler;
    }>): VNode;
}>;
export default _default;
