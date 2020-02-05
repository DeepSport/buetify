import Vue, { VNode } from 'vue';
export declare const getSimpleFunctionalComponent: (cls: string, name: string, el?: string) => import("vue/types/vue").OptionsVue<Vue, unknown, unknown, unknown, Record<never, any>, {
    name: string;
    functional: boolean;
    render(h: import("vue").CreateElement, { data, children }: import("vue").RenderContext<Record<never, any>>): VNode;
}>;
