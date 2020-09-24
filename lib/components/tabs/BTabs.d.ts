import './tabs.sass';
import { AllColorsVariant } from '../../types/ColorVariants';
import { VNode, PropType, ExtractPropTypes } from 'vue';
export declare type TabPosition = 'is-centered' | 'is-right' | '';
export declare type TabType = 'is-boxed' | 'is-toggle' | 'is-toggle-rounded' | '';
export declare type TabSize = 'is-small' | 'is-medium' | 'is-large' | '';
export declare const BTabsPropsDefinition: {
    isExpanded: {
        type: PropType<boolean>;
        default: boolean;
    };
    type: {
        type: PropType<TabType>;
        default: "";
    };
    size: {
        type: PropType<import("../../types/SizeVariants").SizeVariant>;
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
declare const _default: (new () => import("vue").ComponentPublicInstance<{} & {
    label?: string | undefined;
    type?: "" | "is-boxed" | "is-toggle" | "is-toggle-rounded" | undefined;
    size?: "" | "is-small" | "is-medium" | "is-large" | undefined;
    isThemeable?: boolean | undefined;
    themeMap?: import("../../types/ThemeColorMap").ThemeColorMap | undefined;
    isExpanded?: boolean | undefined;
    position?: "" | "is-right" | "is-centered" | undefined;
    variant?: "" | "is-black-ter" | "is-orange" | "is-primary" | "is-info" | "is-link" | "is-success" | "is-warning" | "is-danger" | "is-white" | "is-black" | "is-light" | "is-dark" | "is-black-bis" | "is-grey-darker" | "is-grey-dark" | "is-grey" | "is-grey-light" | "is-grey-lighter" | "is-white-ter" | "is-white-bis" | undefined;
    modelValue?: number | undefined;
    "onUpdate:modelValue"?: import("fp-ts/lib/function").FunctionN<[number], void> | undefined;
    isAnimated?: boolean | undefined;
    isScrollable?: boolean | undefined;
}, () => VNode<import("vue").RendererNode, import("vue").RendererElement>, {}, {}, {}, Record<string, any>, import("vue").VNodeProps, import("vue").ComponentOptionsBase<{} & {
    label?: string | undefined;
    type?: "" | "is-boxed" | "is-toggle" | "is-toggle-rounded" | undefined;
    size?: "" | "is-small" | "is-medium" | "is-large" | undefined;
    isThemeable?: boolean | undefined;
    themeMap?: import("../../types/ThemeColorMap").ThemeColorMap | undefined;
    isExpanded?: boolean | undefined;
    position?: "" | "is-right" | "is-centered" | undefined;
    variant?: "" | "is-black-ter" | "is-orange" | "is-primary" | "is-info" | "is-link" | "is-success" | "is-warning" | "is-danger" | "is-white" | "is-black" | "is-light" | "is-dark" | "is-black-bis" | "is-grey-darker" | "is-grey-dark" | "is-grey" | "is-grey-light" | "is-grey-lighter" | "is-white-ter" | "is-white-bis" | undefined;
    modelValue?: number | undefined;
    "onUpdate:modelValue"?: import("fp-ts/lib/function").FunctionN<[number], void> | undefined;
    isAnimated?: boolean | undefined;
    isScrollable?: boolean | undefined;
}, () => VNode<import("vue").RendererNode, import("vue").RendererElement>, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string>>) & import("vue").ComponentOptionsBase<Readonly<{
    type: TabType;
    size: import("../../types/SizeVariants").SizeVariant;
    isThemeable: boolean;
    themeMap: import("../../types/ThemeColorMap").ThemeColorMap;
    isExpanded: boolean;
    position: import("../pagination/BPagination").PaginationPosition;
    variant: AllColorsVariant;
    "onUpdate:modelValue": import("fp-ts/lib/function").FunctionN<[number], void>;
    isAnimated: boolean;
    isScrollable: boolean;
} & {
    label?: string | undefined;
    modelValue?: number | undefined;
}>, () => VNode<import("vue").RendererNode, import("vue").RendererElement>, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string> & {
    props: {
        isExpanded: {
            type: PropType<boolean>;
            default: boolean;
        };
        type: {
            type: PropType<TabType>;
            default: "";
        };
        size: {
            type: PropType<import("../../types/SizeVariants").SizeVariant>;
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
        modelValue: {
            type: PropType<number>;
            required: false;
        };
        'onUpdate:modelValue': {
            type: PropType<import("fp-ts/lib/function").FunctionN<[number], void>>;
            default: import("fp-ts/lib/function").Lazy<import("fp-ts/lib/function").FunctionN<[number], void>>;
        };
    };
} & ThisType<import("vue").ComponentPublicInstance<Readonly<{
    type: TabType;
    size: import("../../types/SizeVariants").SizeVariant;
    isThemeable: boolean;
    themeMap: import("../../types/ThemeColorMap").ThemeColorMap;
    isExpanded: boolean;
    position: import("../pagination/BPagination").PaginationPosition;
    variant: AllColorsVariant;
    "onUpdate:modelValue": import("fp-ts/lib/function").FunctionN<[number], void>;
    isAnimated: boolean;
    isScrollable: boolean;
} & {
    label?: string | undefined;
    modelValue?: number | undefined;
}>, () => VNode<import("vue").RendererNode, import("vue").RendererElement>, {}, {}, {}, Record<string, any>, Readonly<{
    type: TabType;
    size: import("../../types/SizeVariants").SizeVariant;
    isThemeable: boolean;
    themeMap: import("../../types/ThemeColorMap").ThemeColorMap;
    isExpanded: boolean;
    position: import("../pagination/BPagination").PaginationPosition;
    variant: AllColorsVariant;
    "onUpdate:modelValue": import("fp-ts/lib/function").FunctionN<[number], void>;
    isAnimated: boolean;
    isScrollable: boolean;
} & {
    label?: string | undefined;
    modelValue?: number | undefined;
}>, import("vue").ComponentOptionsBase<Readonly<{
    type: TabType;
    size: import("../../types/SizeVariants").SizeVariant;
    isThemeable: boolean;
    themeMap: import("../../types/ThemeColorMap").ThemeColorMap;
    isExpanded: boolean;
    position: import("../pagination/BPagination").PaginationPosition;
    variant: AllColorsVariant;
    "onUpdate:modelValue": import("fp-ts/lib/function").FunctionN<[number], void>;
    isAnimated: boolean;
    isScrollable: boolean;
} & {
    label?: string | undefined;
    modelValue?: number | undefined;
}>, () => VNode<import("vue").RendererNode, import("vue").RendererElement>, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string>>>;
export default _default;
