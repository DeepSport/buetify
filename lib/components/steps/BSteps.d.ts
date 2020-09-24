import './steps.sass';
import { ColorVariant } from '../../types/ColorVariants';
import { VNode, PropType, ExtractPropTypes } from 'vue';
export declare type StepsSize = 'is-small' | 'is-medium' | 'is-large' | '';
export declare const BStepsPropsDefinition: {
    variant: {
        type: PropType<ColorVariant>;
        default: "is-link";
    };
    size: {
        type: PropType<import("../../types/SizeVariants").SizeVariant>;
        default: "";
    };
    isAnimated: {
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
export declare type BStepsProps = ExtractPropTypes<typeof BStepsPropsDefinition>;
declare const _default: (new () => import("vue").ComponentPublicInstance<{} & {
    size?: "" | "is-small" | "is-medium" | "is-large" | undefined;
    isThemeable?: boolean | undefined;
    themeMap?: import("../../types/ThemeColorMap").ThemeColorMap | undefined;
    variant?: "" | "is-orange" | "is-primary" | "is-info" | "is-link" | "is-success" | "is-warning" | "is-danger" | undefined;
    modelValue?: number | undefined;
    "onUpdate:modelValue"?: import("fp-ts/lib/function").FunctionN<[number], void> | undefined;
    isAnimated?: boolean | undefined;
}, () => VNode<import("vue").RendererNode, import("vue").RendererElement>, {}, {}, {}, Record<string, any>, import("vue").VNodeProps, import("vue").ComponentOptionsBase<{} & {
    size?: "" | "is-small" | "is-medium" | "is-large" | undefined;
    isThemeable?: boolean | undefined;
    themeMap?: import("../../types/ThemeColorMap").ThemeColorMap | undefined;
    variant?: "" | "is-orange" | "is-primary" | "is-info" | "is-link" | "is-success" | "is-warning" | "is-danger" | undefined;
    modelValue?: number | undefined;
    "onUpdate:modelValue"?: import("fp-ts/lib/function").FunctionN<[number], void> | undefined;
    isAnimated?: boolean | undefined;
}, () => VNode<import("vue").RendererNode, import("vue").RendererElement>, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string>>) & import("vue").ComponentOptionsBase<Readonly<{
    size: import("../../types/SizeVariants").SizeVariant;
    isThemeable: boolean;
    themeMap: import("../../types/ThemeColorMap").ThemeColorMap;
    variant: ColorVariant;
    "onUpdate:modelValue": import("fp-ts/lib/function").FunctionN<[number], void>;
    isAnimated: boolean;
} & {
    modelValue?: number | undefined;
}>, () => VNode<import("vue").RendererNode, import("vue").RendererElement>, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string> & {
    props: {
        variant: {
            type: PropType<ColorVariant>;
            default: "is-link";
        };
        size: {
            type: PropType<import("../../types/SizeVariants").SizeVariant>;
            default: "";
        };
        isAnimated: {
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
    size: import("../../types/SizeVariants").SizeVariant;
    isThemeable: boolean;
    themeMap: import("../../types/ThemeColorMap").ThemeColorMap;
    variant: ColorVariant;
    "onUpdate:modelValue": import("fp-ts/lib/function").FunctionN<[number], void>;
    isAnimated: boolean;
} & {
    modelValue?: number | undefined;
}>, () => VNode<import("vue").RendererNode, import("vue").RendererElement>, {}, {}, {}, Record<string, any>, Readonly<{
    size: import("../../types/SizeVariants").SizeVariant;
    isThemeable: boolean;
    themeMap: import("../../types/ThemeColorMap").ThemeColorMap;
    variant: ColorVariant;
    "onUpdate:modelValue": import("fp-ts/lib/function").FunctionN<[number], void>;
    isAnimated: boolean;
} & {
    modelValue?: number | undefined;
}>, import("vue").ComponentOptionsBase<Readonly<{
    size: import("../../types/SizeVariants").SizeVariant;
    isThemeable: boolean;
    themeMap: import("../../types/ThemeColorMap").ThemeColorMap;
    variant: ColorVariant;
    "onUpdate:modelValue": import("fp-ts/lib/function").FunctionN<[number], void>;
    isAnimated: boolean;
} & {
    modelValue?: number | undefined;
}>, () => VNode<import("vue").RendererNode, import("vue").RendererElement>, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string>>>;
export default _default;
