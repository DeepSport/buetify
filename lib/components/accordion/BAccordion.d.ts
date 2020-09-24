import './accordion.sass';
import { TransitionClasses } from '../../types/Transition';
export declare const ACCORDION_CONTENT_THEME_MAP: {
    dark: string;
    light: string;
};
declare const _default: (new () => import("vue").ComponentPublicInstance<{} & {
    transition?: string | TransitionClasses | undefined;
    isThemeable?: boolean | undefined;
    themeMap?: import("../../types/ThemeColorMap").ThemeColorMap | undefined;
    hasPopup?: boolean | undefined;
    isExpanded?: boolean | undefined;
}, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement>, {}, {}, {}, Record<string, any>, import("vue").VNodeProps, import("vue").ComponentOptionsBase<{} & {
    transition?: string | TransitionClasses | undefined;
    isThemeable?: boolean | undefined;
    themeMap?: import("../../types/ThemeColorMap").ThemeColorMap | undefined;
    hasPopup?: boolean | undefined;
    isExpanded?: boolean | undefined;
}, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement>, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string>>) & import("vue").ComponentOptionsBase<Readonly<{
    transition: import("../../types/Transition").Transition;
    isThemeable: boolean;
    themeMap: import("../../types/ThemeColorMap").ThemeColorMap;
    hasPopup: boolean;
    isExpanded: boolean;
} & {}>, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement>, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string> & {
    props: {
        themeMap: {
            type: import("vue").PropType<import("../../types/ThemeColorMap").ThemeColorMap>;
            required: boolean;
            default: import("fp-ts/lib/function").Lazy<import("../../types/ThemeColorMap").ThemeColorMap>;
        };
        isThemeable: {
            type: import("vue").PropType<boolean>;
            required: boolean;
            default: boolean;
        };
        transition: {
            type: import("vue").PropType<import("../../types/Transition").Transition>;
            default: import("fp-ts/lib/function").Lazy<import("../../types/Transition").Transition>;
            required: boolean;
        };
        isExpanded: {
            type: import("vue").PropType<boolean>;
            default: boolean;
        };
        hasPopup: {
            type: import("vue").PropType<boolean>;
            default: boolean;
        };
    };
} & ThisType<import("vue").ComponentPublicInstance<Readonly<{
    transition: import("../../types/Transition").Transition;
    isThemeable: boolean;
    themeMap: import("../../types/ThemeColorMap").ThemeColorMap;
    hasPopup: boolean;
    isExpanded: boolean;
} & {}>, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement>, {}, {}, {}, Record<string, any>, Readonly<{
    transition: import("../../types/Transition").Transition;
    isThemeable: boolean;
    themeMap: import("../../types/ThemeColorMap").ThemeColorMap;
    hasPopup: boolean;
    isExpanded: boolean;
} & {}>, import("vue").ComponentOptionsBase<Readonly<{
    transition: import("../../types/Transition").Transition;
    isThemeable: boolean;
    themeMap: import("../../types/ThemeColorMap").ThemeColorMap;
    hasPopup: boolean;
    isExpanded: boolean;
} & {}>, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement>, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string>>>;
export default _default;
