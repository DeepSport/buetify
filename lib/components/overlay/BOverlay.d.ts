import './overlay.sass';
import { SetupContext } from 'vue';
declare type OverlayPosition = 'is-left' | 'is-right' | 'is-centered';
export interface BOverlayProps {
    position?: OverlayPosition;
    isActive?: boolean;
    isFullscreen?: boolean;
}
export default function BOverlay(props: BOverlayProps, { attrs, slots }: SetupContext): import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement>;
export {};
