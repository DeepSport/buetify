import { Eq } from 'fp-ts/lib/Eq';
import { PropType, Ref } from 'vue';
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
    id: PropType<string>;
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
    trueValue: {
        type: PropType<T>;
        default: T;
    };
    falseValue: {
        type: PropType<T>;
        default: T;
    };
    indeterminateValue: {
        type: PropType<T>;
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
};
export declare type UseSelectableProps<T> = {
    trueValue: T;
    falseValue: T;
    indeterminateValue?: T;
    isMultiple: boolean;
    variant: ColorVariant;
    size: SizeVariant;
    isRequired: boolean;
} & EqProps<T> & UseModelProps<T> & UseDisableProps & UseLabelIdProps;
export declare function useSelectionControl<T>(props: UseSelectableProps<T>, ref: Ref<HTMLElement>, role: string, type: string): {
    isDisabled: import("vue").ComputedRef<boolean>;
    isMultiple: import("vue").ComputedRef<boolean>;
    isActive: import("vue").ComputedRef<boolean>;
    attrs: import("vue").ComputedRef<{
        role: string;
        type: string;
        id: string;
        value: T | undefined;
        checked: boolean;
        'aria-checked': boolean;
        'aria-disabled': boolean;
        'aria-labelledby': string;
        tabindex: number;
        readonly: boolean;
        disabled: boolean;
        required: boolean;
        'true-value': string;
        'false-value': string;
    }>;
    onChange: () => void;
    onKeydown: (e: KeyboardEvent) => void;
    onClick: (e: MouseEvent) => void;
    label: {
        id: import("vue").ComputedRef<string>;
        labelId: import("vue").ComputedRef<string>;
        label: Ref<string>;
    };
    isFocused: Ref<false> | Ref<true>;
    focus: () => void;
    onFocus: () => void;
    onBlur: () => void;
    modelValue: Ref<T | undefined>;
};
export declare type SelectionControl = ReturnType<typeof useSelectionControl>;
