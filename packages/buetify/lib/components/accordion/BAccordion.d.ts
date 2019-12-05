import 'bulma/sass/components/card.sass';
import '../../sass/helpers/animations.sass';
import './accordion.sass';
export declare const ACCORDION_CONTENT_THEME_MAP: {
    dark: string;
    light: string;
};
declare const _default: import("vue").DefineComponent<{
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
    transition: {
        type: import("vue").PropType<import("../../types/Transition").Transition>;
        default: import("fp-ts/lib/function").Lazy<import("../../types/Transition").Transition>;
    };
    onToggle: {
        type: import("vue").PropType<import("fp-ts/lib/function").FunctionN<[boolean], void>>;
        required: false;
    };
    onSetOn: {
        type: import("vue").PropType<import("fp-ts/lib/IO").IO<void>>;
        required: false;
    };
    onSetOff: {
        type: import("vue").PropType<import("fp-ts/lib/IO").IO<void>>;
        required: false;
    };
    isExpanded: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    hasPopup: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
}, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    isThemeable: boolean;
    themeMap: import("../..").ThemeColorMap;
    hasPopup: boolean;
    transition: import("../../types/Transition").Transition;
    isExpanded: boolean;
} & {
    onToggle?: import("fp-ts/lib/function").FunctionN<[boolean], void> | undefined;
    onSetOn?: import("fp-ts/lib/IO").IO<void> | undefined;
    onSetOff?: import("fp-ts/lib/IO").IO<void> | undefined;
}>, {
    isThemeable: boolean;
    themeMap: import("../..").ThemeColorMap;
    hasPopup: boolean;
    transition: import("../../types/Transition").Transition;
    isExpanded: boolean;
}>;
export default _default;
