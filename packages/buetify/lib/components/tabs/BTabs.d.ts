import '../../sass/helpers/animations.sass';
import '../../sass/helpers/flex-helpers.sass';
import '../../sass/helpers/padding-margin-helpers.sass';
import './tabs.sass';
import { AllColorsVariant } from '../../types/ColorVariants';
import { PropType, ExtractPropTypes, VNode } from 'vue';
export declare type TabsPosition = 'is-centered' | 'is-right' | '';
export declare type TabsType = 'is-boxed' | 'is-toggle' | 'is-toggle-rounded' | '';
export declare type TabsSize = 'is-small' | 'is-medium' | 'is-large' | '';
export declare const BTabsPropsDefinition: {
    isExpanded: {
        type: PropType<boolean>;
        default: boolean;
    };
    type: {
        type: PropType<TabsType>;
        default: "";
    };
    size: {
        type: PropType<import("../..").SizeVariant>;
        default: "";
    };
    position: {
        type: PropType<import("../pagination/BPagination").PaginationPosition>;
        default: "";
    };
    label: {
        type: PropType<string>;
    };
    variant: {
        type: PropType<AllColorsVariant>;
        default: "";
    };
    isAnimated: {
        type: PropType<boolean>;
        default: boolean;
    };
    isScrollable: {
        type: PropType<boolean>;
        default: boolean;
    };
    isVertical: {
        type: PropType<boolean>;
        default: boolean;
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
    modelValue: {
        type: PropType<number>;
        required: false;
    };
    'onUpdate:modelValue': {
        type: PropType<import("fp-ts/lib/function").FunctionN<[number], void>>;
        default: import("fp-ts/lib/function").Lazy<import("fp-ts/lib/function").FunctionN<[number], void>>;
    };
};
export declare type BTabsProps = ExtractPropTypes<typeof BTabsPropsDefinition>;
declare const _default: import("vue").DefineComponent<{
    isExpanded: {
        type: PropType<boolean>;
        default: boolean;
    };
    type: {
        type: PropType<TabsType>;
        default: "";
    };
    size: {
        type: PropType<import("../..").SizeVariant>;
        default: "";
    };
    position: {
        type: PropType<import("../pagination/BPagination").PaginationPosition>;
        default: "";
    };
    label: {
        type: PropType<string>;
    };
    variant: {
        type: PropType<AllColorsVariant>;
        default: "";
    };
    isAnimated: {
        type: PropType<boolean>;
        default: boolean;
    };
    isScrollable: {
        type: PropType<boolean>;
        default: boolean;
    };
    isVertical: {
        type: PropType<boolean>;
        default: boolean;
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
    modelValue: {
        type: PropType<number>;
        required: false;
    };
    'onUpdate:modelValue': {
        type: PropType<import("fp-ts/lib/function").FunctionN<[number], void>>;
        default: import("fp-ts/lib/function").Lazy<import("fp-ts/lib/function").FunctionN<[number], void>>;
    };
}, () => VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    isThemeable: boolean;
    themeMap: import("../..").ThemeColorMap;
    variant: AllColorsVariant;
    size: import("../..").SizeVariant;
    isExpanded: boolean;
    position: import("../pagination/BPagination").PaginationPosition;
    "onUpdate:modelValue": import("fp-ts/lib/function").FunctionN<[number], void>;
    type: TabsType;
    isAnimated: boolean;
    isVertical: boolean;
    isScrollable: boolean;
} & {
    label?: string | undefined;
    modelValue?: number | undefined;
}>, {
    isThemeable: boolean;
    themeMap: import("../..").ThemeColorMap;
    variant: AllColorsVariant;
    size: import("../..").SizeVariant;
    isExpanded: boolean;
    position: import("../pagination/BPagination").PaginationPosition;
    "onUpdate:modelValue": import("fp-ts/lib/function").FunctionN<[number], void>;
    type: TabsType;
    isAnimated: boolean;
    isVertical: boolean;
    isScrollable: boolean;
}>;
export default _default;
