import { SetupContext, ConcreteComponent } from 'vue';
export interface ComponentsByBreakPoint {
    mobile: ConcreteComponent;
    tablet: ConcreteComponent;
    desktop: ConcreteComponent;
    widescreen: ConcreteComponent;
    fullHD: ConcreteComponent;
}
export declare const ScreenSizeDependentComponent: (components: ComponentsByBreakPoint) => (props: any, context: SetupContext) => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>;
