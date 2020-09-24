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
        default: any;
    };
    itemValue: {
        type: PropType<Extractor<T>>;
        default: any;
    };
    itemDisabled: {
        type: PropType<Extractor<T>>;
        default: any;
    };
    displayCount: {
        type: (StringConstructor | NumberConstructor)[];
    };
    themeMap: {
        type: PropType<import("../../../types/ThemeColorMap").ThemeColorMap>;
        required: boolean;
        default: import("fp-ts/lib/function").Lazy<import("../../../types/ThemeColorMap").ThemeColorMap>;
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
        type: PropType<import("../../../types/ColorVariants").ColorVariant>;
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
        type: PropType<import("../../../types/SizeVariants").SizeVariant>;
        default: import("../../../types/SizeVariants").SizeVariant;
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
export declare function defineSelect<T>(eq?: Eq<T>): (new () => import("vue").ComponentPublicInstance<{
    items: T[];
} & {
    type?: string | undefined;
    size?: "" | "is-small" | "is-medium" | "is-large" | undefined;
    icon?: any;
    isThemeable?: boolean | undefined;
    themeMap?: import("../../../types/ThemeColorMap").ThemeColorMap | undefined;
    isExpanded?: boolean | undefined;
    variant?: "" | "is-orange" | "is-primary" | "is-info" | "is-link" | "is-success" | "is-warning" | "is-danger" | undefined;
    isDisabled?: boolean | undefined;
    isFocused?: boolean | undefined;
    onFocus?: import("fp-ts/lib/IO").IO<void> | undefined;
    onBlur?: import("fp-ts/lib/IO").IO<void> | undefined;
    focusOnMount?: boolean | undefined;
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
    } ? {
        [key: string]: any;
    } : {
        type: PropType<T>;
        required: false;
    } extends BooleanConstructor | {
        type: BooleanConstructor;
    } ? boolean : {
        type: PropType<T>;
        required: false;
    } extends import("vue").Prop<infer V> ? V : {
        type: PropType<T>;
        required: false;
    }) | undefined;
    "onUpdate:modelValue"?: import("fp-ts/lib/function").FunctionN<[T], void> | undefined;
    isReadonly?: boolean | undefined;
    disableIfReadonly?: boolean | undefined;
    useNativeValidation?: boolean | undefined;
    isValid?: boolean | undefined;
    "onUpdate:isValid"?: import("fp-ts/lib/function").FunctionN<[boolean], void> | undefined;
    autocomplete?: string | undefined;
    placeholder?: string | undefined;
    isRequired?: boolean | undefined;
    isLoading?: boolean | undefined;
    isRounded?: boolean | undefined;
    maxlength?: string | number | undefined;
    usePasswordReveal?: boolean | undefined;
    itemText?: any;
    eq?: Eq<T> | undefined;
    isMultiple?: boolean | undefined;
    itemKey?: string | ((item: T) => any) | undefined;
    itemValue?: any;
    itemDisabled?: any;
    displayCount?: string | number | undefined;
}, () => VNode<import("vue").RendererNode, import("vue").RendererElement>, {}, {}, {}, Record<string, any>, import("vue").VNodeProps, import("vue").ComponentOptionsBase<{
    items: T[];
} & {
    type?: string | undefined;
    size?: "" | "is-small" | "is-medium" | "is-large" | undefined;
    icon?: any;
    isThemeable?: boolean | undefined;
    themeMap?: import("../../../types/ThemeColorMap").ThemeColorMap | undefined;
    isExpanded?: boolean | undefined;
    variant?: "" | "is-orange" | "is-primary" | "is-info" | "is-link" | "is-success" | "is-warning" | "is-danger" | undefined;
    isDisabled?: boolean | undefined;
    isFocused?: boolean | undefined;
    onFocus?: import("fp-ts/lib/IO").IO<void> | undefined;
    onBlur?: import("fp-ts/lib/IO").IO<void> | undefined;
    focusOnMount?: boolean | undefined;
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
    } ? {
        [key: string]: any;
    } : {
        type: PropType<T>;
        required: false;
    } extends BooleanConstructor | {
        type: BooleanConstructor;
    } ? boolean : {
        type: PropType<T>;
        required: false;
    } extends import("vue").Prop<infer V> ? V : {
        type: PropType<T>;
        required: false;
    }) | undefined;
    "onUpdate:modelValue"?: import("fp-ts/lib/function").FunctionN<[T], void> | undefined;
    isReadonly?: boolean | undefined;
    disableIfReadonly?: boolean | undefined;
    useNativeValidation?: boolean | undefined;
    isValid?: boolean | undefined;
    "onUpdate:isValid"?: import("fp-ts/lib/function").FunctionN<[boolean], void> | undefined;
    autocomplete?: string | undefined;
    placeholder?: string | undefined;
    isRequired?: boolean | undefined;
    isLoading?: boolean | undefined;
    isRounded?: boolean | undefined;
    maxlength?: string | number | undefined;
    usePasswordReveal?: boolean | undefined;
    itemText?: any;
    eq?: Eq<T> | undefined;
    isMultiple?: boolean | undefined;
    itemKey?: string | ((item: T) => any) | undefined;
    itemValue?: any;
    itemDisabled?: any;
    displayCount?: string | number | undefined;
}, () => VNode<import("vue").RendererNode, import("vue").RendererElement>, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string>>) & import("vue").ComponentOptionsBase<Readonly<{
    size: import("../../../types/SizeVariants").SizeVariant;
    isThemeable: boolean;
    themeMap: import("../../../types/ThemeColorMap").ThemeColorMap;
    isExpanded: boolean;
    variant: import("../../../types/ColorVariants").ColorVariant;
    isDisabled: boolean;
    isFocused: boolean;
    focusOnMount: boolean;
    "onUpdate:modelValue": import("fp-ts/lib/function").FunctionN<[T], void>;
    isReadonly: boolean;
    disableIfReadonly: boolean;
    useNativeValidation: boolean;
    isValid: boolean;
    "onUpdate:isValid": import("fp-ts/lib/function").FunctionN<[boolean], void>;
    isRequired: boolean;
    isLoading: boolean;
    isRounded: boolean;
    usePasswordReveal: boolean;
    items: T[];
    itemText: any;
    eq: Eq<T>;
    isMultiple: boolean;
    itemValue: any;
    itemDisabled: any;
} & {
    type?: string | undefined;
    icon?: any;
    onFocus?: import("fp-ts/lib/IO").IO<void> | undefined;
    onBlur?: import("fp-ts/lib/IO").IO<void> | undefined;
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
    } ? {
        [key: string]: any;
    } : {
        type: PropType<T>;
        required: false;
    } extends BooleanConstructor | {
        type: BooleanConstructor;
    } ? boolean : {
        type: PropType<T>;
        required: false;
    } extends import("vue").Prop<infer V> ? V : {
        type: PropType<T>;
        required: false;
    }) | undefined;
    autocomplete?: string | undefined;
    placeholder?: string | undefined;
    maxlength?: string | number | undefined;
    itemKey?: string | ((item: T) => any) | undefined;
    displayCount?: string | number | undefined;
}>, () => VNode<import("vue").RendererNode, import("vue").RendererElement>, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string> & {
    props: {
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
            default: any;
        };
        itemValue: {
            type: PropType<Extractor<T>>;
            default: any;
        };
        itemDisabled: {
            type: PropType<Extractor<T>>;
            default: any;
        };
        displayCount: {
            type: (StringConstructor | NumberConstructor)[];
        };
        themeMap: {
            type: PropType<import("../../../types/ThemeColorMap").ThemeColorMap>;
            required: boolean;
            default: import("fp-ts/lib/function").Lazy<import("../../../types/ThemeColorMap").ThemeColorMap>;
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
            type: PropType<import("../../../types/ColorVariants").ColorVariant>;
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
            type: PropType<import("../../../types/SizeVariants").SizeVariant>;
            default: import("../../../types/SizeVariants").SizeVariant;
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
        eq: {
            type: PropType<Eq<T>>;
            default: import("fp-ts/lib/function").Lazy<Eq<T>>;
        };
    };
} & ThisType<import("vue").ComponentPublicInstance<Readonly<{
    size: import("../../../types/SizeVariants").SizeVariant;
    isThemeable: boolean;
    themeMap: import("../../../types/ThemeColorMap").ThemeColorMap;
    isExpanded: boolean;
    variant: import("../../../types/ColorVariants").ColorVariant;
    isDisabled: boolean;
    isFocused: boolean;
    focusOnMount: boolean;
    "onUpdate:modelValue": import("fp-ts/lib/function").FunctionN<[T], void>;
    isReadonly: boolean;
    disableIfReadonly: boolean;
    useNativeValidation: boolean;
    isValid: boolean;
    "onUpdate:isValid": import("fp-ts/lib/function").FunctionN<[boolean], void>;
    isRequired: boolean;
    isLoading: boolean;
    isRounded: boolean;
    usePasswordReveal: boolean;
    items: T[];
    itemText: any;
    eq: Eq<T>;
    isMultiple: boolean;
    itemValue: any;
    itemDisabled: any;
} & {
    type?: string | undefined;
    icon?: any;
    onFocus?: import("fp-ts/lib/IO").IO<void> | undefined;
    onBlur?: import("fp-ts/lib/IO").IO<void> | undefined;
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
    } ? {
        [key: string]: any;
    } : {
        type: PropType<T>;
        required: false;
    } extends BooleanConstructor | {
        type: BooleanConstructor;
    } ? boolean : {
        type: PropType<T>;
        required: false;
    } extends import("vue").Prop<infer V> ? V : {
        type: PropType<T>;
        required: false;
    }) | undefined;
    autocomplete?: string | undefined;
    placeholder?: string | undefined;
    maxlength?: string | number | undefined;
    itemKey?: string | ((item: T) => any) | undefined;
    displayCount?: string | number | undefined;
}>, () => VNode<import("vue").RendererNode, import("vue").RendererElement>, {}, {}, {}, Record<string, any>, Readonly<{
    size: import("../../../types/SizeVariants").SizeVariant;
    isThemeable: boolean;
    themeMap: import("../../../types/ThemeColorMap").ThemeColorMap;
    isExpanded: boolean;
    variant: import("../../../types/ColorVariants").ColorVariant;
    isDisabled: boolean;
    isFocused: boolean;
    focusOnMount: boolean;
    "onUpdate:modelValue": import("fp-ts/lib/function").FunctionN<[T], void>;
    isReadonly: boolean;
    disableIfReadonly: boolean;
    useNativeValidation: boolean;
    isValid: boolean;
    "onUpdate:isValid": import("fp-ts/lib/function").FunctionN<[boolean], void>;
    isRequired: boolean;
    isLoading: boolean;
    isRounded: boolean;
    usePasswordReveal: boolean;
    items: T[];
    itemText: any;
    eq: Eq<T>;
    isMultiple: boolean;
    itemValue: any;
    itemDisabled: any;
} & {
    type?: string | undefined;
    icon?: any;
    onFocus?: import("fp-ts/lib/IO").IO<void> | undefined;
    onBlur?: import("fp-ts/lib/IO").IO<void> | undefined;
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
    } ? {
        [key: string]: any;
    } : {
        type: PropType<T>;
        required: false;
    } extends BooleanConstructor | {
        type: BooleanConstructor;
    } ? boolean : {
        type: PropType<T>;
        required: false;
    } extends import("vue").Prop<infer V> ? V : {
        type: PropType<T>;
        required: false;
    }) | undefined;
    autocomplete?: string | undefined;
    placeholder?: string | undefined;
    maxlength?: string | number | undefined;
    itemKey?: string | ((item: T) => any) | undefined;
    displayCount?: string | number | undefined;
}>, import("vue").ComponentOptionsBase<Readonly<{
    size: import("../../../types/SizeVariants").SizeVariant;
    isThemeable: boolean;
    themeMap: import("../../../types/ThemeColorMap").ThemeColorMap;
    isExpanded: boolean;
    variant: import("../../../types/ColorVariants").ColorVariant;
    isDisabled: boolean;
    isFocused: boolean;
    focusOnMount: boolean;
    "onUpdate:modelValue": import("fp-ts/lib/function").FunctionN<[T], void>;
    isReadonly: boolean;
    disableIfReadonly: boolean;
    useNativeValidation: boolean;
    isValid: boolean;
    "onUpdate:isValid": import("fp-ts/lib/function").FunctionN<[boolean], void>;
    isRequired: boolean;
    isLoading: boolean;
    isRounded: boolean;
    usePasswordReveal: boolean;
    items: T[];
    itemText: any;
    eq: Eq<T>;
    isMultiple: boolean;
    itemValue: any;
    itemDisabled: any;
} & {
    type?: string | undefined;
    icon?: any;
    onFocus?: import("fp-ts/lib/IO").IO<void> | undefined;
    onBlur?: import("fp-ts/lib/IO").IO<void> | undefined;
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
    } ? {
        [key: string]: any;
    } : {
        type: PropType<T>;
        required: false;
    } extends BooleanConstructor | {
        type: BooleanConstructor;
    } ? boolean : {
        type: PropType<T>;
        required: false;
    } extends import("vue").Prop<infer V> ? V : {
        type: PropType<T>;
        required: false;
    }) | undefined;
    autocomplete?: string | undefined;
    placeholder?: string | undefined;
    maxlength?: string | number | undefined;
    itemKey?: string | ((item: T) => any) | undefined;
    displayCount?: string | number | undefined;
}>, () => VNode<import("vue").RendererNode, import("vue").RendererElement>, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string>>>;
export declare const BSelect: (new () => import("vue").ComponentPublicInstance<{
    items: any[];
} & {
    type?: string | undefined;
    size?: "" | "is-small" | "is-medium" | "is-large" | undefined;
    icon?: any;
    isThemeable?: boolean | undefined;
    themeMap?: import("../../../types/ThemeColorMap").ThemeColorMap | undefined;
    isExpanded?: boolean | undefined;
    variant?: "" | "is-orange" | "is-primary" | "is-info" | "is-link" | "is-success" | "is-warning" | "is-danger" | undefined;
    isDisabled?: boolean | undefined;
    isFocused?: boolean | undefined;
    onFocus?: import("fp-ts/lib/IO").IO<void> | undefined;
    onBlur?: import("fp-ts/lib/IO").IO<void> | undefined;
    focusOnMount?: boolean | undefined;
    modelValue?: any;
    "onUpdate:modelValue"?: import("fp-ts/lib/function").FunctionN<[any], void> | undefined;
    isReadonly?: boolean | undefined;
    disableIfReadonly?: boolean | undefined;
    useNativeValidation?: boolean | undefined;
    isValid?: boolean | undefined;
    "onUpdate:isValid"?: import("fp-ts/lib/function").FunctionN<[boolean], void> | undefined;
    autocomplete?: string | undefined;
    placeholder?: string | undefined;
    isRequired?: boolean | undefined;
    isLoading?: boolean | undefined;
    isRounded?: boolean | undefined;
    maxlength?: string | number | undefined;
    usePasswordReveal?: boolean | undefined;
    itemText?: any;
    eq?: Eq<any> | undefined;
    isMultiple?: boolean | undefined;
    itemKey?: string | ((item: any) => any) | undefined;
    itemValue?: any;
    itemDisabled?: any;
    displayCount?: string | number | undefined;
}, () => VNode<import("vue").RendererNode, import("vue").RendererElement>, {}, {}, {}, Record<string, any>, import("vue").VNodeProps, import("vue").ComponentOptionsBase<{
    items: any[];
} & {
    type?: string | undefined;
    size?: "" | "is-small" | "is-medium" | "is-large" | undefined;
    icon?: any;
    isThemeable?: boolean | undefined;
    themeMap?: import("../../../types/ThemeColorMap").ThemeColorMap | undefined;
    isExpanded?: boolean | undefined;
    variant?: "" | "is-orange" | "is-primary" | "is-info" | "is-link" | "is-success" | "is-warning" | "is-danger" | undefined;
    isDisabled?: boolean | undefined;
    isFocused?: boolean | undefined;
    onFocus?: import("fp-ts/lib/IO").IO<void> | undefined;
    onBlur?: import("fp-ts/lib/IO").IO<void> | undefined;
    focusOnMount?: boolean | undefined;
    modelValue?: any;
    "onUpdate:modelValue"?: import("fp-ts/lib/function").FunctionN<[any], void> | undefined;
    isReadonly?: boolean | undefined;
    disableIfReadonly?: boolean | undefined;
    useNativeValidation?: boolean | undefined;
    isValid?: boolean | undefined;
    "onUpdate:isValid"?: import("fp-ts/lib/function").FunctionN<[boolean], void> | undefined;
    autocomplete?: string | undefined;
    placeholder?: string | undefined;
    isRequired?: boolean | undefined;
    isLoading?: boolean | undefined;
    isRounded?: boolean | undefined;
    maxlength?: string | number | undefined;
    usePasswordReveal?: boolean | undefined;
    itemText?: any;
    eq?: Eq<any> | undefined;
    isMultiple?: boolean | undefined;
    itemKey?: string | ((item: any) => any) | undefined;
    itemValue?: any;
    itemDisabled?: any;
    displayCount?: string | number | undefined;
}, () => VNode<import("vue").RendererNode, import("vue").RendererElement>, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string>>) & import("vue").ComponentOptionsBase<Readonly<{
    size: import("../../../types/SizeVariants").SizeVariant;
    isThemeable: boolean;
    themeMap: import("../../../types/ThemeColorMap").ThemeColorMap;
    isExpanded: boolean;
    variant: import("../../../types/ColorVariants").ColorVariant;
    isDisabled: boolean;
    isFocused: boolean;
    focusOnMount: boolean;
    "onUpdate:modelValue": import("fp-ts/lib/function").FunctionN<[any], void>;
    isReadonly: boolean;
    disableIfReadonly: boolean;
    useNativeValidation: boolean;
    isValid: boolean;
    "onUpdate:isValid": import("fp-ts/lib/function").FunctionN<[boolean], void>;
    isRequired: boolean;
    isLoading: boolean;
    isRounded: boolean;
    usePasswordReveal: boolean;
    items: any[];
    itemText: any;
    eq: Eq<any>;
    isMultiple: boolean;
    itemValue: any;
    itemDisabled: any;
} & {
    type?: string | undefined;
    icon?: any;
    onFocus?: import("fp-ts/lib/IO").IO<void> | undefined;
    onBlur?: import("fp-ts/lib/IO").IO<void> | undefined;
    modelValue?: any;
    autocomplete?: string | undefined;
    placeholder?: string | undefined;
    maxlength?: string | number | undefined;
    itemKey?: string | ((item: any) => any) | undefined;
    displayCount?: string | number | undefined;
}>, () => VNode<import("vue").RendererNode, import("vue").RendererElement>, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string> & {
    props: {
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
            default: any;
        };
        itemValue: {
            type: PropType<Extractor<any>>;
            default: any;
        };
        itemDisabled: {
            type: PropType<Extractor<any>>;
            default: any;
        };
        displayCount: {
            type: (StringConstructor | NumberConstructor)[];
        };
        themeMap: {
            type: PropType<import("../../../types/ThemeColorMap").ThemeColorMap>;
            required: boolean;
            default: import("fp-ts/lib/function").Lazy<import("../../../types/ThemeColorMap").ThemeColorMap>;
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
            type: PropType<import("../../../types/ColorVariants").ColorVariant>;
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
            type: PropType<import("../../../types/SizeVariants").SizeVariant>;
            default: import("../../../types/SizeVariants").SizeVariant;
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
    };
} & ThisType<import("vue").ComponentPublicInstance<Readonly<{
    size: import("../../../types/SizeVariants").SizeVariant;
    isThemeable: boolean;
    themeMap: import("../../../types/ThemeColorMap").ThemeColorMap;
    isExpanded: boolean;
    variant: import("../../../types/ColorVariants").ColorVariant;
    isDisabled: boolean;
    isFocused: boolean;
    focusOnMount: boolean;
    "onUpdate:modelValue": import("fp-ts/lib/function").FunctionN<[any], void>;
    isReadonly: boolean;
    disableIfReadonly: boolean;
    useNativeValidation: boolean;
    isValid: boolean;
    "onUpdate:isValid": import("fp-ts/lib/function").FunctionN<[boolean], void>;
    isRequired: boolean;
    isLoading: boolean;
    isRounded: boolean;
    usePasswordReveal: boolean;
    items: any[];
    itemText: any;
    eq: Eq<any>;
    isMultiple: boolean;
    itemValue: any;
    itemDisabled: any;
} & {
    type?: string | undefined;
    icon?: any;
    onFocus?: import("fp-ts/lib/IO").IO<void> | undefined;
    onBlur?: import("fp-ts/lib/IO").IO<void> | undefined;
    modelValue?: any;
    autocomplete?: string | undefined;
    placeholder?: string | undefined;
    maxlength?: string | number | undefined;
    itemKey?: string | ((item: any) => any) | undefined;
    displayCount?: string | number | undefined;
}>, () => VNode<import("vue").RendererNode, import("vue").RendererElement>, {}, {}, {}, Record<string, any>, Readonly<{
    size: import("../../../types/SizeVariants").SizeVariant;
    isThemeable: boolean;
    themeMap: import("../../../types/ThemeColorMap").ThemeColorMap;
    isExpanded: boolean;
    variant: import("../../../types/ColorVariants").ColorVariant;
    isDisabled: boolean;
    isFocused: boolean;
    focusOnMount: boolean;
    "onUpdate:modelValue": import("fp-ts/lib/function").FunctionN<[any], void>;
    isReadonly: boolean;
    disableIfReadonly: boolean;
    useNativeValidation: boolean;
    isValid: boolean;
    "onUpdate:isValid": import("fp-ts/lib/function").FunctionN<[boolean], void>;
    isRequired: boolean;
    isLoading: boolean;
    isRounded: boolean;
    usePasswordReveal: boolean;
    items: any[];
    itemText: any;
    eq: Eq<any>;
    isMultiple: boolean;
    itemValue: any;
    itemDisabled: any;
} & {
    type?: string | undefined;
    icon?: any;
    onFocus?: import("fp-ts/lib/IO").IO<void> | undefined;
    onBlur?: import("fp-ts/lib/IO").IO<void> | undefined;
    modelValue?: any;
    autocomplete?: string | undefined;
    placeholder?: string | undefined;
    maxlength?: string | number | undefined;
    itemKey?: string | ((item: any) => any) | undefined;
    displayCount?: string | number | undefined;
}>, import("vue").ComponentOptionsBase<Readonly<{
    size: import("../../../types/SizeVariants").SizeVariant;
    isThemeable: boolean;
    themeMap: import("../../../types/ThemeColorMap").ThemeColorMap;
    isExpanded: boolean;
    variant: import("../../../types/ColorVariants").ColorVariant;
    isDisabled: boolean;
    isFocused: boolean;
    focusOnMount: boolean;
    "onUpdate:modelValue": import("fp-ts/lib/function").FunctionN<[any], void>;
    isReadonly: boolean;
    disableIfReadonly: boolean;
    useNativeValidation: boolean;
    isValid: boolean;
    "onUpdate:isValid": import("fp-ts/lib/function").FunctionN<[boolean], void>;
    isRequired: boolean;
    isLoading: boolean;
    isRounded: boolean;
    usePasswordReveal: boolean;
    items: any[];
    itemText: any;
    eq: Eq<any>;
    isMultiple: boolean;
    itemValue: any;
    itemDisabled: any;
} & {
    type?: string | undefined;
    icon?: any;
    onFocus?: import("fp-ts/lib/IO").IO<void> | undefined;
    onBlur?: import("fp-ts/lib/IO").IO<void> | undefined;
    modelValue?: any;
    autocomplete?: string | undefined;
    placeholder?: string | undefined;
    maxlength?: string | number | undefined;
    itemKey?: string | ((item: any) => any) | undefined;
    displayCount?: string | number | undefined;
}>, () => VNode<import("vue").RendererNode, import("vue").RendererElement>, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string>>>;
