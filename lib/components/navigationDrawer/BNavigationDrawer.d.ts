import './navigation-drawer.sass';
import { VNode, PropType, ExtractPropTypes } from 'vue';
export declare const BNavigationDrawerPropsDefinition: {
    tag: {
        type: PropType<string>;
        default: string;
    };
    isFullheight: {
        type: PropType<boolean>;
        default: boolean;
    };
    currentRoute: {
        type: PropType<object>;
        required: boolean;
    };
    themeMap: {
        type: PropType<import("../../types/ThemeColorMap").ThemeColorMap>;
        required: boolean;
        default: import("fp-ts/lib/function").Lazy<import("../../types/ThemeColorMap").ThemeColorMap>;
    };
    isThemeable: {
        type: PropType<boolean>;
        required: boolean;
        default: boolean;
    };
};
export declare type BNavigationDrawerProps = ExtractPropTypes<typeof BNavigationDrawerPropsDefinition>;
declare const _default: (new () => import("vue").ComponentPublicInstance<{} & {
    tag?: string | undefined;
    isThemeable?: boolean | undefined;
    themeMap?: import("../../types/ThemeColorMap").ThemeColorMap | undefined;
    isFullheight?: boolean | undefined;
    currentRoute?: object | undefined;
}, () => VNode<import("vue").RendererNode, import("vue").RendererElement>, {}, {}, {}, Record<string, any>, import("vue").VNodeProps, import("vue").ComponentOptionsBase<{} & {
    tag?: string | undefined;
    isThemeable?: boolean | undefined;
    themeMap?: import("../../types/ThemeColorMap").ThemeColorMap | undefined;
    isFullheight?: boolean | undefined;
    currentRoute?: object | undefined;
}, () => VNode<import("vue").RendererNode, import("vue").RendererElement>, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string>>) & import("vue").ComponentOptionsBase<Readonly<{
    tag: string;
    isThemeable: boolean;
    themeMap: import("../../types/ThemeColorMap").ThemeColorMap;
    isFullheight: boolean;
} & {
    currentRoute?: object | undefined;
}>, () => VNode<import("vue").RendererNode, import("vue").RendererElement>, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string> & {
    props: {
        tag: {
            type: PropType<string>;
            default: string;
        };
        isFullheight: {
            type: PropType<boolean>;
            default: boolean;
        };
        currentRoute: {
            type: PropType<object>;
            required: boolean;
        };
        themeMap: {
            type: PropType<import("../../types/ThemeColorMap").ThemeColorMap>;
            required: boolean;
            default: import("fp-ts/lib/function").Lazy<import("../../types/ThemeColorMap").ThemeColorMap>;
        };
        isThemeable: {
            type: PropType<boolean>;
            required: boolean;
            default: boolean;
        };
    };
} & ThisType<import("vue").ComponentPublicInstance<Readonly<{
    tag: string;
    isThemeable: boolean;
    themeMap: import("../../types/ThemeColorMap").ThemeColorMap;
    isFullheight: boolean;
} & {
    currentRoute?: object | undefined;
}>, () => VNode<import("vue").RendererNode, import("vue").RendererElement>, {}, {}, {}, Record<string, any>, Readonly<{
    tag: string;
    isThemeable: boolean;
    themeMap: import("../../types/ThemeColorMap").ThemeColorMap;
    isFullheight: boolean;
} & {
    currentRoute?: object | undefined;
}>, import("vue").ComponentOptionsBase<Readonly<{
    tag: string;
    isThemeable: boolean;
    themeMap: import("../../types/ThemeColorMap").ThemeColorMap;
    isFullheight: boolean;
} & {
    currentRoute?: object | undefined;
}>, () => VNode<import("vue").RendererNode, import("vue").RendererElement>, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string>>>;
export default _default;
