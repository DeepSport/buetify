import './sidebar.sass';
import { VNode, PropType, ExtractPropTypes } from 'vue';
export declare const BSidebarPropsDefinition: {
    tag: {
        type: PropType<string>;
        default: string;
    };
    currentRoute: {
        required: boolean;
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
};
export declare type BNavigationDrawerProps = ExtractPropTypes<typeof BSidebarPropsDefinition>;
declare const _default: import("vue").DefineComponent<{
    tag: {
        type: PropType<string>;
        default: string;
    };
    currentRoute: {
        required: boolean;
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
}, () => VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    isThemeable: boolean;
    themeMap: import("../..").ThemeColorMap;
    tag: string;
} & {
    currentRoute?: unknown;
}>, {
    isThemeable: boolean;
    themeMap: import("../..").ThemeColorMap;
    tag: string;
}>;
export default _default;
