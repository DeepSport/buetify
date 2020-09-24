import './dropdown.sass';
import { TransitionClasses } from '../../types/Transition';
import { ExtractPropTypes, PropType, VNode } from 'vue';
export declare type DropdownPosition = 'is-top-right' | 'is-top-left' | 'is-bottom-left';
export declare const BDropdownPropsDefinition: {
    id: PropType<string>;
    isDisabled: {
        type: PropType<boolean>;
        default: boolean;
    };
    isHoverable: {
        type: PropType<boolean>;
        default: boolean;
    };
    isInline: {
        type: PropType<boolean>;
        default: boolean;
    };
    position: {
        type: PropType<DropdownPosition>;
        validator: (value: unknown) => boolean;
    };
    isMobileModal: {
        type: PropType<boolean>;
        default: boolean;
    };
    menuTag: {
        type: PropType<string>;
        default: string;
    };
    transition: {
        type: PropType<import("../../types/Transition").Transition>;
        default: import("fp-ts/lib/function").Lazy<import("../../types/Transition").Transition>;
        required: boolean;
    };
    isExpanded: {
        type: PropType<boolean>;
        default: boolean;
    };
    hasPopup: {
        type: PropType<boolean>;
        default: boolean;
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
export declare type BDropdownProps = ExtractPropTypes<typeof BDropdownPropsDefinition>;
declare const _default: (new () => import("vue").ComponentPublicInstance<{} & {
    id?: string | undefined;
    transition?: string | TransitionClasses | undefined;
    isThemeable?: boolean | undefined;
    themeMap?: import("../../types/ThemeColorMap").ThemeColorMap | undefined;
    hasPopup?: boolean | undefined;
    isExpanded?: boolean | undefined;
    position?: "is-top-right" | "is-top-left" | "is-bottom-left" | undefined;
    isDisabled?: boolean | undefined;
    isHoverable?: boolean | undefined;
    isInline?: boolean | undefined;
    isMobileModal?: boolean | undefined;
    menuTag?: string | undefined;
}, () => VNode<import("vue").RendererNode, import("vue").RendererElement>, {}, {}, {}, Record<string, any>, import("vue").VNodeProps, import("vue").ComponentOptionsBase<{} & {
    id?: string | undefined;
    transition?: string | TransitionClasses | undefined;
    isThemeable?: boolean | undefined;
    themeMap?: import("../../types/ThemeColorMap").ThemeColorMap | undefined;
    hasPopup?: boolean | undefined;
    isExpanded?: boolean | undefined;
    position?: "is-top-right" | "is-top-left" | "is-bottom-left" | undefined;
    isDisabled?: boolean | undefined;
    isHoverable?: boolean | undefined;
    isInline?: boolean | undefined;
    isMobileModal?: boolean | undefined;
    menuTag?: string | undefined;
}, () => VNode<import("vue").RendererNode, import("vue").RendererElement>, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string>>) & import("vue").ComponentOptionsBase<Readonly<{
    transition: import("../../types/Transition").Transition;
    isThemeable: boolean;
    themeMap: import("../../types/ThemeColorMap").ThemeColorMap;
    hasPopup: boolean;
    isExpanded: boolean;
    isDisabled: boolean;
    isHoverable: boolean;
    isInline: boolean;
    isMobileModal: boolean;
    menuTag: string;
} & {
    id?: string | undefined;
    position?: "is-top-right" | "is-top-left" | "is-bottom-left" | undefined;
}>, () => VNode<import("vue").RendererNode, import("vue").RendererElement>, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string> & {
    props: {
        id: PropType<string>;
        isDisabled: {
            type: PropType<boolean>;
            default: boolean;
        };
        isHoverable: {
            type: PropType<boolean>;
            default: boolean;
        };
        isInline: {
            type: PropType<boolean>;
            default: boolean;
        };
        position: {
            type: PropType<DropdownPosition>;
            validator: (value: unknown) => boolean;
        };
        isMobileModal: {
            type: PropType<boolean>;
            default: boolean;
        };
        menuTag: {
            type: PropType<string>;
            default: string;
        };
        transition: {
            type: PropType<import("../../types/Transition").Transition>;
            default: import("fp-ts/lib/function").Lazy<import("../../types/Transition").Transition>;
            required: boolean;
        };
        isExpanded: {
            type: PropType<boolean>;
            default: boolean;
        };
        hasPopup: {
            type: PropType<boolean>;
            default: boolean;
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
    transition: import("../../types/Transition").Transition;
    isThemeable: boolean;
    themeMap: import("../../types/ThemeColorMap").ThemeColorMap;
    hasPopup: boolean;
    isExpanded: boolean;
    isDisabled: boolean;
    isHoverable: boolean;
    isInline: boolean;
    isMobileModal: boolean;
    menuTag: string;
} & {
    id?: string | undefined;
    position?: "is-top-right" | "is-top-left" | "is-bottom-left" | undefined;
}>, () => VNode<import("vue").RendererNode, import("vue").RendererElement>, {}, {}, {}, Record<string, any>, Readonly<{
    transition: import("../../types/Transition").Transition;
    isThemeable: boolean;
    themeMap: import("../../types/ThemeColorMap").ThemeColorMap;
    hasPopup: boolean;
    isExpanded: boolean;
    isDisabled: boolean;
    isHoverable: boolean;
    isInline: boolean;
    isMobileModal: boolean;
    menuTag: string;
} & {
    id?: string | undefined;
    position?: "is-top-right" | "is-top-left" | "is-bottom-left" | undefined;
}>, import("vue").ComponentOptionsBase<Readonly<{
    transition: import("../../types/Transition").Transition;
    isThemeable: boolean;
    themeMap: import("../../types/ThemeColorMap").ThemeColorMap;
    hasPopup: boolean;
    isExpanded: boolean;
    isDisabled: boolean;
    isHoverable: boolean;
    isInline: boolean;
    isMobileModal: boolean;
    menuTag: string;
} & {
    id?: string | undefined;
    position?: "is-top-right" | "is-top-left" | "is-bottom-left" | undefined;
}>, () => VNode<import("vue").RendererNode, import("vue").RendererElement>, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string>>>;
export default _default;
