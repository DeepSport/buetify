import { SetupContext, Component } from 'vue';
export interface BListProps {
    tag?: string | Component;
    items: unknown[];
}
export default function BList(props: BListProps, { attrs, slots }: SetupContext): import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>;
