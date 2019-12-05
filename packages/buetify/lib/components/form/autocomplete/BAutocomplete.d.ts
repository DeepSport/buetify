import '../sass/form.sass';
import '../../dropdown/dropdown.sass';
import './autocomplete.sass';
import { Eq } from 'fp-ts/lib/Eq';
import { FunctionN, Predicate } from 'fp-ts/lib/function';
import { PropType, VNode } from 'vue';
export interface AutocompleteItem<T> {
    id: string;
    isSelected: boolean;
    isHovered: boolean;
    text: string;
    value: T;
    index: number;
}
export declare const BAutocomplete: import("vue").DefineComponent<{
    selectedItems: {
        type: PropType<any[]>;
        required: true;
    };
    items: {
        type: PropType<any[]>;
        default: import("fp-ts/lib/function").Lazy<never[]>;
    };
    itemFilter: {
        type: PropType<FunctionN<[string], Predicate<any>>>;
        required: false;
    };
    itemId: {
        type: PropType<string | number | symbol | ((item: any) => string)>;
        default: string;
    };
    itemText: {
        type: PropType<string | number | symbol | ((item: any) => string)>;
        default: string;
    };
    closeOnSelect: {
        type: PropType<boolean>;
        default: boolean;
    };
    clearOnSelect: {
        type: PropType<boolean>;
        default: boolean;
    };
    openOnFocus: {
        type: PropType<boolean>;
        default: boolean;
    };
    onSelected: {
        type: PropType<FunctionN<[any], void>>;
        required: false;
    };
    "onUpdate:selectedItems": {
        type: PropType<FunctionN<[any[]], void>>;
        default: import("fp-ts/lib/function").Lazy<FunctionN<[any[]], void>>;
    };
    modelValue: {
        type: PropType<string>;
        required: false;
    };
    'onUpdate:modelValue': {
        type: PropType<FunctionN<[string], void>>;
        default: import("fp-ts/lib/function").Lazy<FunctionN<[string], void>>;
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
    eq: {
        type: PropType<Eq<any>>;
        default: import("fp-ts/lib/function").Lazy<Eq<any>>;
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
    "onUpdate:modelValue": FunctionN<[string], void>;
    isReadonly: boolean;
    disableIfReadonly: boolean;
    useNativeValidation: boolean;
    isValid: boolean;
    "onUpdate:isValid": FunctionN<[boolean], void>;
    isRequired: boolean;
    usePasswordReveal: boolean;
    selectedItems: any[];
    "onUpdate:selectedItems": FunctionN<[any[]], void>;
    items: any[];
    itemId: string | number | symbol | ((item: any) => string);
    itemText: string | number | symbol | ((item: any) => string);
    closeOnSelect: boolean;
    clearOnSelect: boolean;
    openOnFocus: boolean;
    eq: Eq<any>;
} & {
    icon?: any;
    onFocus?: ((e?: Event | undefined) => void) | undefined;
    onBlur?: ((e?: Event | undefined) => void) | undefined;
    modelValue?: string | undefined;
    type?: string | undefined;
    autocomplete?: string | undefined;
    placeholder?: string | undefined;
    maxlength?: string | number | undefined;
    itemFilter?: FunctionN<[string], Predicate<any>> | undefined;
    onSelected?: FunctionN<[any], void> | undefined;
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
    "onUpdate:modelValue": FunctionN<[string], void>;
    isReadonly: boolean;
    disableIfReadonly: boolean;
    useNativeValidation: boolean;
    isValid: boolean;
    "onUpdate:isValid": FunctionN<[boolean], void>;
    isRequired: boolean;
    usePasswordReveal: boolean;
    "onUpdate:selectedItems": FunctionN<[any[]], void>;
    items: any[];
    itemId: string | number | symbol | ((item: any) => string);
    itemText: string | number | symbol | ((item: any) => string);
    closeOnSelect: boolean;
    clearOnSelect: boolean;
    openOnFocus: boolean;
    eq: Eq<any>;
}>;
