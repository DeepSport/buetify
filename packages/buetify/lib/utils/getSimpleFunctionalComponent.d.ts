import { SetupContext } from 'vue';
export declare function getSimpleFunctionalComponent(cls: string, el?: string): (props: {
    tag?: string;
}, { slots }: SetupContext) => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>;
