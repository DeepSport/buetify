import '../sass/form.sass';
import { ColorVariant } from '../../../types/ColorVariants';
import { SizeVariant } from '../../../types/SizeVariants';
import { VNode } from 'vue';
import { InputIcons } from '../shared/types';
import { PropType } from 'vue';
export declare function getBInputPropsDefinition<T>(): {
    isLoading: {
        type: PropType<boolean>;
        default: boolean;
    };
    hasCounter: {
        type: BooleanConstructor;
        default: boolean;
    };
    customInputClass: {
        type: StringConstructor;
        default: string;
    };
    inputIcons: {
        type: PropType<InputIcons>;
        required: boolean;
        default: import("fp-ts/lib/function").Lazy<InputIcons>;
    };
    themeMap: {
        type: PropType<import("../../..").ThemeColorMap>;
        required: boolean;
        default: import("fp-ts/lib/function").Lazy<import("../../..").ThemeColorMap>;
    };
    isThemeable: {
        type: PropType<boolean>;
        required: boolean;
        default: boolean;
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
        type: PropType<import("fp-ts/lib/function").FunctionN<[boolean], void>>;
        default: import("fp-ts/lib/function").Lazy<() => void>;
    };
    variant: {
        type: PropType<ColorVariant>;
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
        type: PropType<SizeVariant>;
        default: SizeVariant;
    };
    isRequired: {
        type: BooleanConstructor;
        default: boolean;
    };
    isExpanded: {
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
        type: PropType<T>;
        required: false;
    };
    'onUpdate:modelValue': {
        type: PropType<import("fp-ts/lib/function").FunctionN<[T], void>>;
        default: import("fp-ts/lib/function").Lazy<import("fp-ts/lib/function").FunctionN<[T], void>>;
    };
};
export declare function defineInput<T>(): import("vue").DefineComponent<{
    isLoading: {
        type: PropType<boolean>;
        default: boolean;
    };
    hasCounter: {
        type: BooleanConstructor;
        default: boolean;
    };
    customInputClass: {
        type: StringConstructor;
        default: string;
    };
    inputIcons: {
        type: PropType<InputIcons>;
        required: boolean;
        default: import("fp-ts/lib/function").Lazy<InputIcons>;
    };
    themeMap: {
        type: PropType<import("../../..").ThemeColorMap>;
        required: boolean;
        default: import("fp-ts/lib/function").Lazy<import("../../..").ThemeColorMap>;
    };
    isThemeable: {
        type: PropType<boolean>;
        required: boolean;
        default: boolean;
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
        type: PropType<import("fp-ts/lib/function").FunctionN<[boolean], void>>;
        default: import("fp-ts/lib/function").Lazy<() => void>;
    };
    variant: {
        type: PropType<ColorVariant>;
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
        type: PropType<SizeVariant>;
        default: SizeVariant;
    };
    isRequired: {
        type: BooleanConstructor;
        default: boolean;
    };
    isExpanded: {
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
        type: PropType<T>;
        required: false;
    };
    'onUpdate:modelValue': {
        type: PropType<import("fp-ts/lib/function").FunctionN<[T], void>>;
        default: import("fp-ts/lib/function").Lazy<import("fp-ts/lib/function").FunctionN<[T], void>>;
    };
}, () => VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, import("vue").EmitsOptions, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    isThemeable: boolean;
    themeMap: import("../../..").ThemeColorMap;
    variant: ColorVariant;
    size: SizeVariant;
    isExpanded: boolean;
    isRounded: boolean;
    isLoading: boolean;
    isFocused: boolean;
    isDisabled: boolean;
    focusOnMount: boolean;
    "onUpdate:modelValue": import("fp-ts/lib/function").FunctionN<[T], void>;
    isReadonly: boolean;
    disableIfReadonly: boolean;
    useNativeValidation: boolean;
    isValid: boolean;
    "onUpdate:isValid": import("fp-ts/lib/function").FunctionN<[boolean], void>;
    isRequired: boolean;
    usePasswordReveal: boolean;
    hasCounter: boolean;
    customInputClass: string;
    inputIcons: InputIcons;
} & {
    icon?: any;
    onFocus?: ((e?: Event | undefined) => void) | undefined;
    onBlur?: ((e?: Event | undefined) => void) | undefined;
    modelValue?: ({
        type: PropType<T>;
        required: false;
    } extends {
        type: true | null;
    } ? any : {
        type: PropType<T>;
        required: false;
    } extends ObjectConstructor | {
        type: ObjectConstructor;
    } ? Record<string, any> : {
        type: PropType<T>;
        required: false;
    } extends BooleanConstructor | {
        type: BooleanConstructor;
    } ? boolean : {
        type: PropType<T>;
        required: false;
    } extends import("vue").Prop<infer V, infer D> ? unknown extends V ? D : V : {
        type: PropType<T>;
        required: false;
    }) | undefined;
    type?: string | undefined;
    autocomplete?: string | undefined;
    placeholder?: string | undefined;
    maxlength?: string | number | undefined;
}>, {
    isThemeable: boolean;
    themeMap: import("../../..").ThemeColorMap;
    variant: ColorVariant;
    size: SizeVariant;
    isExpanded: boolean;
    isRounded: boolean;
    isLoading: boolean;
    isFocused: boolean;
    isDisabled: boolean;
    focusOnMount: boolean;
    "onUpdate:modelValue": import("fp-ts/lib/function").FunctionN<[T], void>;
    isReadonly: boolean;
    disableIfReadonly: boolean;
    useNativeValidation: boolean;
    isValid: boolean;
    "onUpdate:isValid": import("fp-ts/lib/function").FunctionN<[boolean], void>;
    isRequired: boolean;
    usePasswordReveal: boolean;
    hasCounter: boolean;
    customInputClass: string;
    inputIcons: InputIcons;
}>;
export declare const BInput: import("vue").DefineComponent<{
    isLoading: {
        type: PropType<boolean>;
        default: boolean;
    };
    hasCounter: {
        type: BooleanConstructor;
        default: boolean;
    };
    customInputClass: {
        type: StringConstructor;
        default: string;
    };
    inputIcons: {
        type: PropType<InputIcons>;
        required: boolean;
        default: import("fp-ts/lib/function").Lazy<InputIcons>;
    };
    themeMap: {
        type: PropType<import("../../..").ThemeColorMap>;
        required: boolean;
        default: import("fp-ts/lib/function").Lazy<import("../../..").ThemeColorMap>;
    };
    isThemeable: {
        type: PropType<boolean>;
        required: boolean;
        default: boolean;
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
        type: PropType<import("fp-ts/lib/function").FunctionN<[boolean], void>>;
        default: import("fp-ts/lib/function").Lazy<() => void>;
    };
    variant: {
        type: PropType<ColorVariant>;
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
        type: PropType<SizeVariant>;
        default: SizeVariant;
    };
    isRequired: {
        type: BooleanConstructor;
        default: boolean;
    };
    isExpanded: {
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
        type: PropType<any>;
        required: false;
    };
    'onUpdate:modelValue': {
        type: PropType<import("fp-ts/lib/function").FunctionN<[any], void>>;
        default: import("fp-ts/lib/function").Lazy<import("fp-ts/lib/function").FunctionN<[any], void>>;
    };
}, () => VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, import("vue").EmitsOptions, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    isThemeable: boolean;
    themeMap: import("../../..").ThemeColorMap;
    variant: ColorVariant;
    size: SizeVariant;
    isExpanded: boolean;
    isRounded: boolean;
    isLoading: boolean;
    isFocused: boolean;
    isDisabled: boolean;
    focusOnMount: boolean;
    "onUpdate:modelValue": import("fp-ts/lib/function").FunctionN<[any], void>;
    isReadonly: boolean;
    disableIfReadonly: boolean;
    useNativeValidation: boolean;
    isValid: boolean;
    "onUpdate:isValid": import("fp-ts/lib/function").FunctionN<[boolean], void>;
    isRequired: boolean;
    usePasswordReveal: boolean;
    hasCounter: boolean;
    customInputClass: string;
    inputIcons: InputIcons;
} & {
    icon?: any;
    onFocus?: ((e?: Event | undefined) => void) | undefined;
    onBlur?: ((e?: Event | undefined) => void) | undefined;
    modelValue?: unknown;
    type?: string | undefined;
    autocomplete?: string | undefined;
    placeholder?: string | undefined;
    maxlength?: string | number | undefined;
}>, {
    isThemeable: boolean;
    themeMap: import("../../..").ThemeColorMap;
    variant: ColorVariant;
    size: SizeVariant;
    isExpanded: boolean;
    isRounded: boolean;
    isLoading: boolean;
    isFocused: boolean;
    isDisabled: boolean;
    focusOnMount: boolean;
    "onUpdate:modelValue": import("fp-ts/lib/function").FunctionN<[any], void>;
    isReadonly: boolean;
    disableIfReadonly: boolean;
    useNativeValidation: boolean;
    isValid: boolean;
    "onUpdate:isValid": import("fp-ts/lib/function").FunctionN<[boolean], void>;
    isRequired: boolean;
    usePasswordReveal: boolean;
    hasCounter: boolean;
    customInputClass: string;
    inputIcons: InputIcons;
}>;
