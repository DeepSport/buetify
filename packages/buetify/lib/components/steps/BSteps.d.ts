import './steps.sass';
import { ColorVariant } from '../../types/ColorVariants';
import { VNode, PropType, ExtractPropTypes } from 'vue';
export declare type StepsSize = 'is-small' | 'is-medium' | 'is-large' | '';
export declare type StepsPosition = 'is-right' | '';
export declare type StepLabelPosition = 'is-right' | 'is-left' | '';
export declare type StepsMobileMode = 'minimal' | 'compact' | '';
export declare const BStepsPropsDefinition: {
    position: {
        type: PropType<StepsPosition>;
        default: "";
    };
    labelPosition: {
        type: PropType<StepLabelPosition>;
        default: string;
    };
    variant: {
        type: PropType<ColorVariant>;
        default: "";
    };
    size: {
        type: PropType<import("../..").SizeVariant>;
        default: "";
    };
    isAnimated: {
        type: PropType<boolean>;
        default: boolean;
    };
    mobileMode: {
        type: PropType<StepsMobileMode>;
        default: "minimal";
    };
    isRounded: {
        type: BooleanConstructor;
        default: boolean;
    };
    isVertical: {
        type: BooleanConstructor;
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
export declare type BStepsProps = ExtractPropTypes<typeof BStepsPropsDefinition>;
declare const _default: import("vue").DefineComponent<{
    position: {
        type: PropType<StepsPosition>;
        default: "";
    };
    labelPosition: {
        type: PropType<StepLabelPosition>;
        default: string;
    };
    variant: {
        type: PropType<ColorVariant>;
        default: "";
    };
    size: {
        type: PropType<import("../..").SizeVariant>;
        default: "";
    };
    isAnimated: {
        type: PropType<boolean>;
        default: boolean;
    };
    mobileMode: {
        type: PropType<StepsMobileMode>;
        default: "minimal";
    };
    isRounded: {
        type: BooleanConstructor;
        default: boolean;
    };
    isVertical: {
        type: BooleanConstructor;
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
    variant: ColorVariant;
    size: import("../..").SizeVariant;
    position: StepsPosition;
    isRounded: boolean;
    "onUpdate:modelValue": import("fp-ts/lib/function").FunctionN<[number], void>;
    labelPosition: StepLabelPosition;
    isAnimated: boolean;
    mobileMode: StepsMobileMode;
    isVertical: boolean;
} & {
    modelValue?: number | undefined;
}>, {
    isThemeable: boolean;
    themeMap: import("../..").ThemeColorMap;
    variant: ColorVariant;
    size: import("../..").SizeVariant;
    position: StepsPosition;
    isRounded: boolean;
    "onUpdate:modelValue": import("fp-ts/lib/function").FunctionN<[number], void>;
    labelPosition: StepLabelPosition;
    isAnimated: boolean;
    mobileMode: StepsMobileMode;
    isVertical: boolean;
}>;
export default _default;
