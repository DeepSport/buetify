import { Eq } from 'fp-ts/lib/Eq';
import { PropType, Ref, ComputedRef } from 'vue';
import { ColorVariant } from '../../types/ColorVariants';
import { SizeVariant } from '../../types/SizeVariants';
import { UseDisableProps } from '../disable';
import { UseLabelIdProps } from '../labelId';
import { UseModelProps } from '../model';
import { EqProps } from '../shared';
export declare function getUseSelectablePropsDefinition<T>(): {
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
    labelFor: PropType<string>;
    label: {
        type: PropType<string>;
        default: string;
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
    modelValue: {
        type: PropType<T>;
        required: false;
    };
    'onUpdate:modelValue': {
        type: PropType<import("fp-ts/lib/function").FunctionN<[T], void>>;
        default: import("fp-ts/lib/function").Lazy<import("fp-ts/lib/function").FunctionN<[T], void>>;
    };
    eq: {
        type: PropType<Eq<T>>;
        default: import("fp-ts/lib/function").Lazy<Eq<T>>;
    };
    nativeValue: {
        type: PropType<unknown>;
        required: boolean;
        default: null;
    };
    trueValue: {
        type: PropType<T>;
        default: T;
    };
    falseValue: {
        type: PropType<T>;
        default: T;
    };
    isIndeterminate: {
        type: PropType<boolean>;
        default: boolean;
    };
    isMultiple: {
        type: PropType<boolean>;
        default: boolean;
    };
    variant: {
        type: PropType<ColorVariant>;
        default: ColorVariant;
    };
    size: {
        type: PropType<SizeVariant>;
        default: SizeVariant;
    };
    isRequired: {
        type: PropType<boolean>;
        default: boolean;
    };
    name: {
        type: PropType<string>;
        required: boolean;
    };
};
export declare type UseSelectableProps<T> = {
    nativeValue: unknown;
    trueValue: T;
    falseValue: T;
    indeterminateValue?: T;
    isMultiple: boolean;
    variant: ColorVariant;
    size: SizeVariant;
    isRequired: boolean;
    isIndeterminate: boolean;
    name?: string;
} & EqProps<T> & UseModelProps<T> & UseDisableProps & UseLabelIdProps;
export declare function useSelectionControl<T>(props: UseSelectableProps<T>, ref: Ref<HTMLElement>, role: string, type: string): {
    isDisabled: Ref<boolean>;
    isMultiple: ComputedRef<boolean>;
    isActive: ComputedRef<boolean>;
    attrs: ComputedRef<{
        role: string;
        type: string;
        id: string;
        name: string | undefined;
        checked: boolean;
        'aria-checked': boolean;
        'aria-disabled': boolean;
        'aria-labelledby': string;
        tabindex: number;
        readonly: boolean;
        disabled: boolean;
        required: boolean;
        indeterminate: boolean | undefined;
        value: string;
        'true-value': string;
        'false-value': string;
    }>;
    onChange: (e?: Event | undefined) => void;
    onKeydown: (e: KeyboardEvent) => void;
    onClick: (e: MouseEvent) => void;
    label: {
        id: ComputedRef<string>;
        labelId: ComputedRef<string>;
        label: Ref<string>;
    };
    isFocused: Ref<boolean>;
    focus: (e?: Event | undefined) => void;
    onFocus: (e?: Event | undefined) => void;
    onBlur: (e?: Event | undefined) => void;
    modelValue: Ref<T | undefined>;
};
export declare type SelectionControl = ReturnType<typeof useSelectionControl>;
