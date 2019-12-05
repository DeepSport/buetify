import './number-input.sass';
import { FunctionN } from 'fp-ts/lib/function';
import { VNode, PropType, ExtractPropTypes } from 'vue';
import { InputIcons, NumberInputIcons } from '../shared/types';
export declare type BNumberInputControlsPosition = 'compact' | '';
declare const BNumberInputPropsDefinition: {
    min: {
        type: PropType<number>;
        default: number;
    };
    max: {
        type: PropType<number>;
        default: number;
    };
    step: {
        type: PropType<number>;
        default: number;
    };
    displayControls: {
        type: PropType<boolean>;
        default: boolean;
    };
    controlsRounded: {
        type: PropType<boolean>;
        default: boolean;
    };
    controlsPosition: {
        type: PropType<BNumberInputControlsPosition>;
        default: "";
    };
    inputIcons: {
        type: PropType<InputIcons>;
        default: import("fp-ts/lib/function").Lazy<InputIcons>;
    };
    numberInputIcons: {
        type: PropType<NumberInputIcons>;
        default: import("fp-ts/lib/function").Lazy<NumberInputIcons>;
    };
    isFocused: {
        type: PropType<boolean>;
        default: boolean;
    };
    onFocus: {
        type: PropType<(e?: Event | undefined) => void>;
        required: false;
    };
    onBlur: {
        type: PropType<(e?: Event | undefined) => void>;
        required: false;
    };
    focusOnMount: {
        type: PropType<boolean>;
        default: boolean;
    };
    isDisabled: {
        type: PropType<boolean>;
        required: boolean;
        default: boolean;
    };
    isReadonly: {
        type: PropType<boolean>;
        required: boolean;
        default: boolean;
    };
    disableIfReadonly: {
        type: PropType<boolean>;
        required: boolean;
        default: boolean;
    };
    useNativeValidation: {
        type: PropType<boolean>;
        default: boolean;
    };
    isValid: {
        type: PropType<boolean>;
        default: boolean;
    };
    'onUpdate:isValid': {
        type: PropType<FunctionN<[boolean], void>>;
        default: import("fp-ts/lib/function").Lazy<() => void>;
    };
    variant: {
        type: PropType<import("../../..").ColorVariant>;
        default: "";
    };
    type: {
        type: PropType<string>;
    };
    autocomplete: {
        type: PropType<string>;
    };
    placeholder: {
        type: PropType<string>;
    };
    size: {
        type: PropType<import("../../..").SizeVariant>;
        default: import("../../..").SizeVariant;
    };
    isRequired: {
        type: BooleanConstructor;
        default: boolean;
    };
    isExpanded: {
        type: PropType<boolean>;
        default: boolean;
    };
    isLoading: {
        type: PropType<boolean>;
        default: boolean;
    };
    isRounded: {
        type: PropType<boolean>;
        default: boolean;
    };
    maxlength: {
        type: PropType<string | number>;
    };
    icon: null;
    usePasswordReveal: {
        type: PropType<boolean>;
        default: undefined;
    };
    modelValue: {
        type: PropType<number>;
        required: false;
    };
    'onUpdate:modelValue': {
        type: PropType<FunctionN<[number], void>>;
        default: import("fp-ts/lib/function").Lazy<FunctionN<[number], void>>;
    };
};
export declare type BNumberInputProps = ExtractPropTypes<typeof BNumberInputPropsDefinition>;
export declare function getNumberInputIcons(icons: Partial<NumberInputIcons>): NumberInputIcons;
declare const _default: import("vue").DefineComponent<{
    min: {
        type: PropType<number>;
        default: number;
    };
    max: {
        type: PropType<number>;
        default: number;
    };
    step: {
        type: PropType<number>;
        default: number;
    };
    displayControls: {
        type: PropType<boolean>;
        default: boolean;
    };
    controlsRounded: {
        type: PropType<boolean>;
        default: boolean;
    };
    controlsPosition: {
        type: PropType<BNumberInputControlsPosition>;
        default: "";
    };
    inputIcons: {
        type: PropType<InputIcons>;
        default: import("fp-ts/lib/function").Lazy<InputIcons>;
    };
    numberInputIcons: {
        type: PropType<NumberInputIcons>;
        default: import("fp-ts/lib/function").Lazy<NumberInputIcons>;
    };
    isFocused: {
        type: PropType<boolean>;
        default: boolean;
    };
    onFocus: {
        type: PropType<(e?: Event | undefined) => void>;
        required: false;
    };
    onBlur: {
        type: PropType<(e?: Event | undefined) => void>;
        required: false;
    };
    focusOnMount: {
        type: PropType<boolean>;
        default: boolean;
    };
    isDisabled: {
        type: PropType<boolean>;
        required: boolean;
        default: boolean;
    };
    isReadonly: {
        type: PropType<boolean>;
        required: boolean;
        default: boolean;
    };
    disableIfReadonly: {
        type: PropType<boolean>;
        required: boolean;
        default: boolean;
    };
    useNativeValidation: {
        type: PropType<boolean>;
        default: boolean;
    };
    isValid: {
        type: PropType<boolean>;
        default: boolean;
    };
    'onUpdate:isValid': {
        type: PropType<FunctionN<[boolean], void>>;
        default: import("fp-ts/lib/function").Lazy<() => void>;
    };
    variant: {
        type: PropType<import("../../..").ColorVariant>;
        default: "";
    };
    type: {
        type: PropType<string>;
    };
    autocomplete: {
        type: PropType<string>;
    };
    placeholder: {
        type: PropType<string>;
    };
    size: {
        type: PropType<import("../../..").SizeVariant>;
        default: import("../../..").SizeVariant;
    };
    isRequired: {
        type: BooleanConstructor;
        default: boolean;
    };
    isExpanded: {
        type: PropType<boolean>;
        default: boolean;
    };
    isLoading: {
        type: PropType<boolean>;
        default: boolean;
    };
    isRounded: {
        type: PropType<boolean>;
        default: boolean;
    };
    maxlength: {
        type: PropType<string | number>;
    };
    icon: null;
    usePasswordReveal: {
        type: PropType<boolean>;
        default: undefined;
    };
    modelValue: {
        type: PropType<number>;
        required: false;
    };
    'onUpdate:modelValue': {
        type: PropType<FunctionN<[number], void>>;
        default: import("fp-ts/lib/function").Lazy<FunctionN<[number], void>>;
    };
}, () => VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    variant: import("../../..").ColorVariant;
    size: import("../../..").SizeVariant;
    isExpanded: boolean;
    isRounded: boolean;
    isLoading: boolean;
    isFocused: boolean;
    isDisabled: boolean;
    focusOnMount: boolean;
    "onUpdate:modelValue": FunctionN<[number], void>;
    isReadonly: boolean;
    disableIfReadonly: boolean;
    useNativeValidation: boolean;
    isValid: boolean;
    "onUpdate:isValid": FunctionN<[boolean], void>;
    isRequired: boolean;
    usePasswordReveal: boolean;
    inputIcons: InputIcons;
    min: number;
    max: number;
    step: number;
    displayControls: boolean;
    controlsRounded: boolean;
    controlsPosition: BNumberInputControlsPosition;
    numberInputIcons: NumberInputIcons;
} & {
    icon?: any;
    onFocus?: ((e?: Event | undefined) => void) | undefined;
    onBlur?: ((e?: Event | undefined) => void) | undefined;
    modelValue?: number | undefined;
    type?: string | undefined;
    autocomplete?: string | undefined;
    placeholder?: string | undefined;
    maxlength?: string | number | undefined;
}>, {
    variant: import("../../..").ColorVariant;
    size: import("../../..").SizeVariant;
    isExpanded: boolean;
    isRounded: boolean;
    isLoading: boolean;
    isFocused: boolean;
    isDisabled: boolean;
    focusOnMount: boolean;
    "onUpdate:modelValue": FunctionN<[number], void>;
    isReadonly: boolean;
    disableIfReadonly: boolean;
    useNativeValidation: boolean;
    isValid: boolean;
    "onUpdate:isValid": FunctionN<[boolean], void>;
    isRequired: boolean;
    usePasswordReveal: boolean;
    inputIcons: InputIcons;
    min: number;
    max: number;
    step: number;
    displayControls: boolean;
    controlsRounded: boolean;
    controlsPosition: BNumberInputControlsPosition;
    numberInputIcons: NumberInputIcons;
}>;
export default _default;
