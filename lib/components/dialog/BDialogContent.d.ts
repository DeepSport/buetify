import './dialog.sass';
import { SizeVariant } from '../../types/SizeVariants';
import { PropType, VNode } from 'vue';
export declare const B_DIALOG_CONTENT_NAME = "b-dialog-content";
declare const _default: (new () => import("vue").ComponentPublicInstance<{} & {
    size?: "" | "is-small" | "is-medium" | "is-large" | undefined;
    isThemeable?: boolean | undefined;
    themeMap?: import("../../types/ThemeColorMap").ThemeColorMap | undefined;
    cardClass?: string | undefined;
}, () => VNode<import("vue").RendererNode, import("vue").RendererElement>, {}, {}, {}, Record<string, any>, import("vue").VNodeProps, import("vue").ComponentOptionsBase<{} & {
    size?: "" | "is-small" | "is-medium" | "is-large" | undefined;
    isThemeable?: boolean | undefined;
    themeMap?: import("../../types/ThemeColorMap").ThemeColorMap | undefined;
    cardClass?: string | undefined;
}, () => VNode<import("vue").RendererNode, import("vue").RendererElement>, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string>>) & import("vue").ComponentOptionsBase<Readonly<{
    isThemeable: boolean;
    themeMap: import("../../types/ThemeColorMap").ThemeColorMap;
} & {
    size?: "" | "is-small" | "is-medium" | "is-large" | undefined;
    cardClass?: string | undefined;
}>, () => VNode<import("vue").RendererNode, import("vue").RendererElement>, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string> & {
    props: {
        size: {
            type: PropType<SizeVariant>;
            required: false;
        };
        cardClass: {
            type: PropType<string>;
            required: false;
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
    isThemeable: boolean;
    themeMap: import("../../types/ThemeColorMap").ThemeColorMap;
} & {
    size?: "" | "is-small" | "is-medium" | "is-large" | undefined;
    cardClass?: string | undefined;
}>, () => VNode<import("vue").RendererNode, import("vue").RendererElement>, {}, {}, {}, Record<string, any>, Readonly<{
    isThemeable: boolean;
    themeMap: import("../../types/ThemeColorMap").ThemeColorMap;
} & {
    size?: "" | "is-small" | "is-medium" | "is-large" | undefined;
    cardClass?: string | undefined;
}>, import("vue").ComponentOptionsBase<Readonly<{
    isThemeable: boolean;
    themeMap: import("../../types/ThemeColorMap").ThemeColorMap;
} & {
    size?: "" | "is-small" | "is-medium" | "is-large" | undefined;
    cardClass?: string | undefined;
}>, () => VNode<import("vue").RendererNode, import("vue").RendererElement>, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string>>>;
export default _default;
