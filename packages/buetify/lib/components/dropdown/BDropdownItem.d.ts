import { PropType } from 'vue';
declare const _default: import("vue").DefineComponent<{
    isActive: {
        type: PropType<boolean>;
        default: boolean;
    };
    tag: {
        type: PropType<string>;
        default: string;
    };
    themeMap: {
        type: PropType<import("../..").ThemeColorMap>;
        required: boolean;
        default: import("fp-ts/lib/function").Lazy<import("../..").ThemeColorMap>;
    };
    isThemeable: {
        type: PropType<boolean>;
        required: boolean;
        default: boolean;
    };
}, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    isThemeable: boolean;
    themeMap: import("../..").ThemeColorMap;
    tag: string;
    isActive: boolean;
} & {}>, {
    isThemeable: boolean;
    themeMap: import("../..").ThemeColorMap;
    tag: string;
    isActive: boolean;
}>;
export default _default;
