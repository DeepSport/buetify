import '../sass/form.sass';
import './select.sass';
import { Eq } from 'fp-ts/lib/Eq';
import { UseInputProps } from '../../../composables/input/useInput';
import { EqProps } from '../../../composables/shared';
import { Extractor } from '../../../utils/helpers';
import { PropType, VNode } from 'vue';
export interface SelectItem<T> {
    value: T;
    text: string;
    isDisabled: boolean;
    isSelected: boolean;
}
export declare function getBSelectPropsDefinition<T>(eq?: Eq<T>): {
    items: {
        type: PropType<T[]>;
        required: true;
    };
    isMultiple: {
        type: PropType<boolean>;
        default: boolean;
    };
    itemKey: {
        type: PropType<Extractor<T>>;
    };
    itemText: {
        type: PropType<Extractor<T>>;
        default: string;
    };
    itemValue: {
        type: PropType<Extractor<T>>;
        default: string;
    };
    itemDisabled: {
        type: PropType<Extractor<T>>;
        default: string;
    };
    displayCount: {
        type: (StringConstructor | NumberConstructor)[];
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
};
export declare type BSelectProps<T> = EqProps<T> & UseInputProps<T> & {
    items: T[];
    isMultiple: boolean;
    itemKey?: Extractor<T>;
    itemText: Extractor<T>;
    itemValue: Extractor<T>;
    itemDisabled: Extractor<T>;
    displayCount?: string | number;
};
export declare function defineSelect<T>(eq?: Eq<T>): import("vue").DefineComponent<{
    items: {
        type: PropType<T[]>;
        required: true;
    };
    isMultiple: {
        type: PropType<boolean>;
        default: boolean;
    };
    itemKey: {
        type: PropType<Extractor<T>>;
    };
    itemText: {
        type: PropType<Extractor<T>>;
        default: string;
    };
    itemValue: {
        type: PropType<Extractor<T>>;
        default: string;
    };
    itemDisabled: {
        type: PropType<Extractor<T>>;
        default: string;
    };
    displayCount: {
        type: (StringConstructor | NumberConstructor)[];
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
}, () => VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    isThemeable: boolean;
    themeMap: import("../../..").ThemeColorMap;
    variant: import("../../..").ColorVariant;
    size: import("../../..").SizeVariant;
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
    items: T[];
    itemText: Extractor<T>;
    eq: Eq<T>;
    isMultiple: boolean;
    itemValue: Extractor<T>;
    itemDisabled: Extractor<T>;
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
    itemKey?: string | ((item: T) => any) | undefined;
    displayCount?: string | number | undefined;
}>, {
    isThemeable: boolean;
    themeMap: import("../../..").ThemeColorMap;
    variant: import("../../..").ColorVariant;
    size: import("../../..").SizeVariant;
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
    itemText: Extractor<T>;
    eq: Eq<T>;
    isMultiple: boolean;
    itemValue: Extractor<T>;
    itemDisabled: Extractor<T>;
}>;
export declare const BSelect: import("vue").DefineComponent<{
    items: {
        type: PropType<any[]>;
        required: true;
    };
    isMultiple: {
        type: PropType<boolean>;
        default: boolean;
    };
    itemKey: {
        type: PropType<Extractor<any>>;
    };
    itemText: {
        type: PropType<Extractor<any>>;
        default: string;
    };
    itemValue: {
        type: PropType<Extractor<any>>;
        default: string;
    };
    itemDisabled: {
        type: PropType<Extractor<any>>;
        default: string;
    };
    displayCount: {
        type: (StringConstructor | NumberConstructor)[];
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
        type: PropType<any>;
        required: false;
    };
    'onUpdate:modelValue': {
        type: PropType<import("fp-ts/lib/function").FunctionN<[any], void>>;
        default: import("fp-ts/lib/function").Lazy<import("fp-ts/lib/function").FunctionN<[any], void>>;
    };
    eq: {
        type: PropType<Eq<any>>;
        default: import("fp-ts/lib/function").Lazy<Eq<any>>;
    };
}, () => VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    isThemeable: boolean;
    themeMap: import("../../..").ThemeColorMap;
    variant: import("../../..").ColorVariant;
    size: import("../../..").SizeVariant;
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
    items: any[];
    itemText: Extractor<any>;
    eq: Eq<any>;
    isMultiple: boolean;
    itemValue: Extractor<any>;
    itemDisabled: Extractor<any>;
} & {
    icon?: any;
    onFocus?: ((e?: Event | undefined) => void) | undefined;
    onBlur?: ((e?: Event | undefined) => void) | undefined;
    modelValue?: unknown;
    type?: string | undefined;
    autocomplete?: string | undefined;
    placeholder?: string | undefined;
    maxlength?: string | number | undefined;
    itemKey?: string | ((item: any) => any) | undefined;
    displayCount?: string | number | undefined;
}>, {
    isThemeable: boolean;
    themeMap: import("../../..").ThemeColorMap;
    variant: import("../../..").ColorVariant;
    size: import("../../..").SizeVariant;
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
    itemText: Extractor<any>;
    eq: Eq<any>;
    isMultiple: boolean;
    itemValue: Extractor<any>;
    itemDisabled: Extractor<any>;
}>;
