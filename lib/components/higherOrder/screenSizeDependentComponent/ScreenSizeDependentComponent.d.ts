import { SetupContext, Component } from 'vue';
export interface ComponentsByBreakPoint {
    mobile: Component;
    tablet: Component;
    desktop: Component;
    widescreen: Component;
    fullHD: Component;
}
export declare const ScreenSizeDependentComponent: (components: ComponentsByBreakPoint) => (props: any, context: SetupContext) => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement>;
