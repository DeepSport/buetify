import './pagination.sass';
import { VNode, PropType, ExtractPropTypes } from 'vue';
export declare type PaginationSize = 'is-small' | 'is-medium' | 'is-large' | '';
export declare type PaginationPosition = 'is-centered' | 'is-right' | '';
export declare type PaginationVerticalPosition = 'is-top' | '';
export declare const BPaginationPropsDefinition: {
    size: {
        type: PropType<import("../..").SizeVariant>;
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
    verticalPosition: {
        type: PropType<PaginationVerticalPosition>;
        default: "";
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
        default: number;
    };
    total: {
        type: PropType<number>;
        required: boolean;
    };
    perPage: {
        type: PropType<number>;
        default: () => number;
        validator: (value: number) => boolean;
    };
    items: {
        type: PropType<unknown[]>;
        default: import("fp-ts/lib/function").Lazy<never[]>;
    };
    'onUpdate:modelValue': {
        type: PropType<import("fp-ts/lib/function").FunctionN<[number], void>>;
        default: import("fp-ts/lib/function").Lazy<import("fp-ts/lib/function").FunctionN<[number], void>>;
    };
};
export declare type BPaginationProps = ExtractPropTypes<typeof BPaginationPropsDefinition>;
declare const _default: import("vue").DefineComponent<{
    size: {
        type: PropType<import("../..").SizeVariant>;
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
    verticalPosition: {
        type: PropType<PaginationVerticalPosition>;
        default: "";
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
        default: number;
    };
    total: {
        type: PropType<number>;
        required: boolean;
    };
    perPage: {
        type: PropType<number>;
        default: () => number;
        validator: (value: number) => boolean;
    };
    items: {
        type: PropType<unknown[]>;
        default: import("fp-ts/lib/function").Lazy<never[]>;
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
    size: import("../..").SizeVariant;
    position: PaginationPosition;
    isRounded: boolean;
    modelValue: number;
    "onUpdate:modelValue": import("fp-ts/lib/function").FunctionN<[number], void>;
    items: unknown[];
    perPage: number;
    isSimple: boolean;
    verticalPosition: PaginationVerticalPosition;
} & {
    total?: number | undefined;
}>, {
    isThemeable: boolean;
    themeMap: import("../..").ThemeColorMap;
    size: import("../..").SizeVariant;
    position: PaginationPosition;
    isRounded: boolean;
    modelValue: number;
    "onUpdate:modelValue": import("fp-ts/lib/function").FunctionN<[number], void>;
    items: unknown[];
    perPage: number;
    isSimple: boolean;
    verticalPosition: PaginationVerticalPosition;
}>;
export default _default;
