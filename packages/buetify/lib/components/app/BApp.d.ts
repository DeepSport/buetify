import '../../sass/helpers/animations.sass';
import './app.sass';
import { VNode } from 'vue';
declare const _default: import("vue").DefineComponent<{
    currentRoute: {
        required: boolean;
    };
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
}, () => VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
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
} & {
    currentRoute?: unknown;
}>, {
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
}>;
export default _default;
