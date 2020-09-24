import { AllColorsVariant, ColorVariant } from '../../types/ColorVariants';
import { SizeVariant } from '../../types/SizeVariants';
import { PropType, ExtractPropTypes, Ref } from 'vue';
import { UseModelProps } from '../model';
export declare const StaticUseInputProps: {
    isFocused: {
        type: PropType<boolean>;
        default: boolean;
    };
    onFocus: {
        type: PropType<import("fp-ts/lib/IO").IO<void>>;
        required: false;
    };
    onBlur: {
        type: PropType<import("fp-ts/lib/IO").IO<void>>;
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
        default: "is-primary";
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
    icon: {
        type: PropType<any>;
    };
    usePasswordReveal: {
        type: PropType<boolean>;
        default: boolean;
    };
};
declare type StaticInputProps = ExtractPropTypes<typeof StaticUseInputProps>;
export declare function getUseInputPropsDefinition<T>(): {
    isFocused: {
        type: PropType<boolean>;
        default: boolean;
    };
    onFocus: {
        type: PropType<import("fp-ts/lib/IO").IO<void>>;
        required: false;
    };
    onBlur: {
        type: PropType<import("fp-ts/lib/IO").IO<void>>;
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
        default: "is-primary";
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
    icon: {
        type: PropType<any>;
    };
    usePasswordReveal: {
        type: PropType<boolean>;
        default: boolean;
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
export declare type UseInputProps<T> = UseModelProps<T> & StaticInputProps;
export declare function useInput<T>(props: UseInputProps<T>, ref: Ref<HTMLElement>): {
    iconSize: import("vue").ComputedRef<"" | "is-small">;
    isDisabled: Ref<boolean>;
    isValid: Ref<false> | Ref<true>;
    validate: () => void;
    isFocused: Ref<false> | Ref<true>;
    focus: () => void;
    onFocus: () => void;
    onBlur: () => void;
    modelValue: Ref<T | undefined>;
    set: import("fp-ts/lib/function").FunctionN<[T], void>;
    onNativeInput: import("fp-ts/lib/function").FunctionN<[Event], void>;
    isExpanded: import("vue").ComputedRef<boolean>;
    isFullwidth: import("vue").ComputedRef<boolean>;
    messageVariant: import("vue").ComputedRef<any>;
    setters: import("../fieldData").FieldDataListeners;
    onNewMessage: import("fp-ts/lib/function").FunctionN<[string | {
        [K: string]: boolean;
    } | (string | {
        [K: string]: boolean;
    })[]], void>;
    onNewVariant: import("fp-ts/lib/function").FunctionN<[AllColorsVariant], void>;
    label: Ref<string>;
    message: Ref<string>;
    id: Ref<string | undefined>;
    labelId: Ref<string | undefined>;
    "onUpdate:modelValue": Ref<import("fp-ts/lib/function").FunctionN<[T], void>>;
    size: Ref<SizeVariant>;
    variant: Ref<ColorVariant>;
    focusOnMount: Ref<boolean>;
    isReadonly: Ref<boolean>;
    disableIfReadonly: Ref<boolean>;
    useNativeValidation: Ref<boolean>;
    "onUpdate:isValid": Ref<import("fp-ts/lib/function").FunctionN<[boolean], void>>;
    isRequired: Ref<boolean>;
    isLoading: Ref<boolean>;
    isRounded: Ref<boolean>;
    usePasswordReveal: Ref<boolean>;
    type?: Ref<string | undefined> | undefined;
    icon?: Ref<any> | undefined;
    autocomplete?: Ref<string | undefined> | undefined;
    placeholder?: Ref<string | undefined> | undefined;
    maxlength?: Ref<string | number | undefined> | undefined;
};
export declare type Input = ReturnType<typeof useInput>;
export {};
