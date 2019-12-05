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
};
declare type StaticInputProps = ExtractPropTypes<typeof StaticUseInputProps>;
export declare function getUseInputPropsDefinition<T>(): {
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
    type: Ref<string | undefined>;
    passwordToggle: {
        isOn: import("vue").WritableComputedRef<boolean>;
        isOff: import("vue").ComputedRef<boolean>;
        attrs: import("vue").ComputedRef<{
            'aria-haspopup'?: boolean;
            tabindex: number;
            role: string;
            type: string;
            'aria-pressed': boolean;
            'aria-expanded': boolean;
        }>;
        listeners: {
            onClick: import("fp-ts/lib/IO").IO<void>;
            onKeydown: (e: KeyboardEvent) => void;
        };
        props: import("vue").ComputedRef<{
            onClick: import("fp-ts/lib/IO").IO<void>;
            onKeydown: (e: KeyboardEvent) => void;
            'aria-haspopup'?: boolean;
            tabindex: number;
            role: string;
            type: string;
            'aria-pressed': boolean;
            'aria-expanded': boolean;
        }>;
        setOn: (e?: Event | undefined) => void;
        setOff: (e?: Event | undefined) => void;
        toggle: (e?: Event | undefined) => void;
    };
    usePasswordReveal: import("vue").ComputedRef<boolean>;
    isDisabled: Ref<boolean>;
    isValid: Ref<boolean>;
    validate: () => void;
    isFocused: Ref<boolean>;
    focus: (e?: Event | undefined) => void;
    onFocus: (e?: Event | undefined) => void;
    onBlur: (e?: Event | undefined) => void;
    set: import("fp-ts/lib/function").FunctionN<[T], void>;
    modelValue: Ref<T | undefined>;
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
    variant: Ref<ColorVariant>;
    size: Ref<SizeVariant>;
    isRounded: Ref<boolean>;
    isLoading: Ref<boolean>;
    focusOnMount: Ref<boolean>;
    isReadonly: Ref<boolean>;
    disableIfReadonly: Ref<boolean>;
    useNativeValidation: Ref<boolean>;
    "onUpdate:isValid": Ref<import("fp-ts/lib/function").FunctionN<[boolean], void>>;
    isRequired: Ref<boolean>;
    icon?: Ref<any> | undefined;
    autocomplete?: Ref<string | undefined> | undefined;
    placeholder?: Ref<string | undefined> | undefined;
    maxlength?: Ref<string | number | undefined> | undefined;
};
export declare type Input = ReturnType<typeof useInput>;
export {};
