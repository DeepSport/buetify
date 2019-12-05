import '../../sass/helpers/border-helpers.sass';
import '../../sass/helpers/height-width-helpers.sass';
import './sheet.sass';
declare const _default: import("vue").DefineComponent<{
    tag: {
        type: StringConstructor;
        default: string;
    };
    isLoading: {
        type: BooleanConstructor;
        default: boolean;
    };
    themeMap: {
        type: import("vue").PropType<import("../..").ThemeColorMap>;
        required: boolean;
        default: import("fp-ts/lib/function").Lazy<import("../..").ThemeColorMap>;
    };
    isThemeable: {
        type: import("vue").PropType<boolean>;
        required: boolean;
        default: boolean;
    };
}, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    isThemeable: boolean;
    themeMap: import("../..").ThemeColorMap;
    tag: string;
    isLoading: boolean;
} & {}>, {
    isThemeable: boolean;
    themeMap: import("../..").ThemeColorMap;
    tag: string;
    isLoading: boolean;
}>;
export default _default;
