import './tag.sass';
import { Component, SetupContext } from 'vue';
export interface BTagListProps {
    isAttached?: boolean;
    tag?: string | Component;
}
export default function BTagList(props: BTagListProps, { attrs, slots }: SetupContext): import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement>;
