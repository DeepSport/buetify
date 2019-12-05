import { SizeVariant } from '../../types';
import { PropType } from 'vue';
export declare const BSimpleTablePropsDefinition: {
    isBordered: {
        type: PropType<boolean>;
        default: boolean;
    };
    isSelectable: {
        type: PropType<boolean>;
        default: boolean;
    };
    isStriped: {
        type: PropType<boolean>;
        default: boolean;
    };
    isNarrow: {
        type: PropType<boolean>;
        default: boolean;
    };
    isFullwidth: {
        type: PropType<boolean>;
        default: boolean;
    };
    size: {
        type: PropType<SizeVariant>;
    };
    isHoverable: {
        type: PropType<boolean>;
        default: boolean;
    };
    isLoading: {
        type: PropType<boolean>;
        default: boolean;
    };
    isScrollable: {
        type: PropType<boolean>;
        default: boolean;
    };
    useMobileCards: {
        type: PropType<boolean>;
        default: boolean;
    };
    themeMap: {
        type: PropType<import("../../types").ThemeColorMap>;
        required: boolean;
        default: import("fp-ts/lib/function").Lazy<import("../../types").ThemeColorMap>;
    };
    isThemeable: {
        type: PropType<boolean>;
        required: boolean;
        default: boolean;
    };
};
declare const _default: import("vue").DefineComponent<{
    isBordered: {
        type: PropType<boolean>;
        default: boolean;
    };
    isSelectable: {
        type: PropType<boolean>;
        default: boolean;
    };
    isStriped: {
        type: PropType<boolean>;
        default: boolean;
    };
    isNarrow: {
        type: PropType<boolean>;
        default: boolean;
    };
    isFullwidth: {
        type: PropType<boolean>;
        default: boolean;
    };
    size: {
        type: PropType<SizeVariant>;
    };
    isHoverable: {
        type: PropType<boolean>;
        default: boolean;
    };
    isLoading: {
        type: PropType<boolean>;
        default: boolean;
    };
    isScrollable: {
        type: PropType<boolean>;
        default: boolean;
    };
    useMobileCards: {
        type: PropType<boolean>;
        default: boolean;
    };
    themeMap: {
        type: PropType<import("../../types").ThemeColorMap>;
        required: boolean;
        default: import("fp-ts/lib/function").Lazy<import("../../types").ThemeColorMap>;
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
    themeMap: import("../../types").ThemeColorMap;
    isLoading: boolean;
    isFullwidth: boolean;
    isHoverable: boolean;
    isBordered: boolean;
    isSelectable: boolean;
    isStriped: boolean;
    isNarrow: boolean;
    isScrollable: boolean;
    useMobileCards: boolean;
} & {
    size?: "" | "is-small" | "is-medium" | "is-large" | undefined;
}>, {
    isThemeable: boolean;
    themeMap: import("../../types").ThemeColorMap;
    isLoading: boolean;
    isFullwidth: boolean;
    isHoverable: boolean;
    isBordered: boolean;
    isSelectable: boolean;
    isStriped: boolean;
    isNarrow: boolean;
    isScrollable: boolean;
    useMobileCards: boolean;
}>;
export default _default;
