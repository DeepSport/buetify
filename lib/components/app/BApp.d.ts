import './app.sass';
declare const _default: (new () => import("vue").ComponentPublicInstance<{} & {
    isThemeable?: boolean | undefined;
    persistTheme?: boolean | undefined;
    hasPopup?: boolean | undefined;
    breakPoints?: {
        mobile: number;
        tablet: number;
        desktop: number;
        widescreen: number;
        fullHD: number;
    } | undefined;
    isVisible?: boolean | undefined;
}, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement>, {}, {}, {}, Record<string, any>, import("vue").VNodeProps, import("vue").ComponentOptionsBase<{} & {
    isThemeable?: boolean | undefined;
    persistTheme?: boolean | undefined;
    hasPopup?: boolean | undefined;
    breakPoints?: {
        mobile: number;
        tablet: number;
        desktop: number;
        widescreen: number;
        fullHD: number;
    } | undefined;
    isVisible?: boolean | undefined;
}, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement>, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string>>) & import("vue").ComponentOptionsBase<Readonly<{
    isThemeable: boolean;
    persistTheme: boolean;
    hasPopup: boolean;
    breakPoints: {
        mobile: number;
        tablet: number;
        desktop: number;
        widescreen: number;
        fullHD: number;
    };
    isVisible: boolean;
} & {}>, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement>, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string> & {
    props: {
        isVisible: {
            type: import("vue").PropType<boolean>;
            required: boolean;
            default: boolean;
        };
        hasPopup: {
            type: import("vue").PropType<boolean>;
            required: boolean;
            default: boolean;
        };
        breakPoints: {
            type: import("vue").PropType<{
                mobile: number;
                tablet: number;
                desktop: number;
                widescreen: number;
                fullHD: number;
            }>;
            required: boolean;
            default: import("fp-ts/lib/function").Lazy<{
                mobile: number;
                tablet: number;
                desktop: number;
                widescreen: number;
                fullHD: number;
            }>;
        };
        isThemeable: {
            type: import("vue").PropType<boolean>;
            default: boolean;
        };
        persistTheme: {
            type: import("vue").PropType<boolean>;
            default: boolean;
        };
    };
} & ThisType<import("vue").ComponentPublicInstance<Readonly<{
    isThemeable: boolean;
    persistTheme: boolean;
    hasPopup: boolean;
    breakPoints: {
        mobile: number;
        tablet: number;
        desktop: number;
        widescreen: number;
        fullHD: number;
    };
    isVisible: boolean;
} & {}>, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement>, {}, {}, {}, Record<string, any>, Readonly<{
    isThemeable: boolean;
    persistTheme: boolean;
    hasPopup: boolean;
    breakPoints: {
        mobile: number;
        tablet: number;
        desktop: number;
        widescreen: number;
        fullHD: number;
    };
    isVisible: boolean;
} & {}>, import("vue").ComponentOptionsBase<Readonly<{
    isThemeable: boolean;
    persistTheme: boolean;
    hasPopup: boolean;
    breakPoints: {
        mobile: number;
        tablet: number;
        desktop: number;
        widescreen: number;
        fullHD: number;
    };
    isVisible: boolean;
} & {}>, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement>, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string>>>;
export default _default;
