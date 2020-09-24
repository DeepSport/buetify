import './pagination.sass';
import { VNode, PropType, ExtractPropTypes } from 'vue';
export declare type PaginationSize = 'is-small' | 'is-medium' | 'is-large' | '';
export declare type PaginationPosition = 'is-centered' | 'is-right' | '';
export declare const BPaginationPropsDefinition: {
    size: {
        type: PropType<import("../../types/SizeVariants").SizeVariant>;
        default: "";
    };
    isSimple: {
        type: PropType<boolean>;
        default: boolean;
    };
    isRounded: {
        type: PropType<boolean>;
        default: boolean;
    };
    position: {
        type: PropType<PaginationPosition>;
        default: "";
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
        default: number;
    };
    total: {
        type: PropType<number>;
        required: true;
    };
    perPage: {
        type: PropType<number>;
        default: number;
    };
    'onUpdate:modelValue': {
        type: PropType<import("fp-ts/lib/function").FunctionN<[number], void>>;
        default: import("fp-ts/lib/function").Lazy<import("fp-ts/lib/function").FunctionN<[number], void>>;
    };
};
export declare type BPaginationProps = ExtractPropTypes<typeof BPaginationPropsDefinition>;
declare const _default: (new () => import("vue").ComponentPublicInstance<{
    total: number;
} & {
    size?: "" | "is-small" | "is-medium" | "is-large" | undefined;
    isThemeable?: boolean | undefined;
    themeMap?: import("../../types/ThemeColorMap").ThemeColorMap | undefined;
    position?: "" | "is-right" | "is-centered" | undefined;
    modelValue?: number | undefined;
    "onUpdate:modelValue"?: import("fp-ts/lib/function").FunctionN<[number], void> | undefined;
    isRounded?: boolean | undefined;
    perPage?: number | undefined;
    isSimple?: boolean | undefined;
}, () => VNode<import("vue").RendererNode, import("vue").RendererElement> | VNode<import("vue").RendererNode, import("vue").RendererElement>[], {}, {}, {}, Record<string, any>, import("vue").VNodeProps, import("vue").ComponentOptionsBase<{
    total: number;
} & {
    size?: "" | "is-small" | "is-medium" | "is-large" | undefined;
    isThemeable?: boolean | undefined;
    themeMap?: import("../../types/ThemeColorMap").ThemeColorMap | undefined;
    position?: "" | "is-right" | "is-centered" | undefined;
    modelValue?: number | undefined;
    "onUpdate:modelValue"?: import("fp-ts/lib/function").FunctionN<[number], void> | undefined;
    isRounded?: boolean | undefined;
    perPage?: number | undefined;
    isSimple?: boolean | undefined;
}, () => VNode<import("vue").RendererNode, import("vue").RendererElement> | VNode<import("vue").RendererNode, import("vue").RendererElement>[], unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string>>) & import("vue").ComponentOptionsBase<Readonly<{
    size: import("../../types/SizeVariants").SizeVariant;
    isThemeable: boolean;
    themeMap: import("../../types/ThemeColorMap").ThemeColorMap;
    position: PaginationPosition;
    modelValue: number;
    "onUpdate:modelValue": import("fp-ts/lib/function").FunctionN<[number], void>;
    isRounded: boolean;
    total: number;
    perPage: number;
    isSimple: boolean;
} & {}>, () => VNode<import("vue").RendererNode, import("vue").RendererElement> | VNode<import("vue").RendererNode, import("vue").RendererElement>[], unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string> & {
    props: {
        size: {
            type: PropType<import("../../types/SizeVariants").SizeVariant>;
            default: "";
        };
        isSimple: {
            type: PropType<boolean>;
            default: boolean;
        };
        isRounded: {
            type: PropType<boolean>;
            default: boolean;
        };
        position: {
            type: PropType<PaginationPosition>;
            default: "";
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
            default: number;
        };
        total: {
            type: PropType<number>;
            required: true;
        };
        perPage: {
            type: PropType<number>;
            default: number;
        };
        'onUpdate:modelValue': {
            type: PropType<import("fp-ts/lib/function").FunctionN<[number], void>>;
            default: import("fp-ts/lib/function").Lazy<import("fp-ts/lib/function").FunctionN<[number], void>>;
        };
    };
} & ThisType<import("vue").ComponentPublicInstance<Readonly<{
    size: import("../../types/SizeVariants").SizeVariant;
    isThemeable: boolean;
    themeMap: import("../../types/ThemeColorMap").ThemeColorMap;
    position: PaginationPosition;
    modelValue: number;
    "onUpdate:modelValue": import("fp-ts/lib/function").FunctionN<[number], void>;
    isRounded: boolean;
    total: number;
    perPage: number;
    isSimple: boolean;
} & {}>, () => VNode<import("vue").RendererNode, import("vue").RendererElement> | VNode<import("vue").RendererNode, import("vue").RendererElement>[], {}, {}, {}, Record<string, any>, Readonly<{
    size: import("../../types/SizeVariants").SizeVariant;
    isThemeable: boolean;
    themeMap: import("../../types/ThemeColorMap").ThemeColorMap;
    position: PaginationPosition;
    modelValue: number;
    "onUpdate:modelValue": import("fp-ts/lib/function").FunctionN<[number], void>;
    isRounded: boolean;
    total: number;
    perPage: number;
    isSimple: boolean;
} & {}>, import("vue").ComponentOptionsBase<Readonly<{
    size: import("../../types/SizeVariants").SizeVariant;
    isThemeable: boolean;
    themeMap: import("../../types/ThemeColorMap").ThemeColorMap;
    position: PaginationPosition;
    modelValue: number;
    "onUpdate:modelValue": import("fp-ts/lib/function").FunctionN<[number], void>;
    isRounded: boolean;
    total: number;
    perPage: number;
    isSimple: boolean;
} & {}>, () => VNode<import("vue").RendererNode, import("vue").RendererElement> | VNode<import("vue").RendererNode, import("vue").RendererElement>[], unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string>>>;
export default _default;
