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
export declare function defineInput<T>(): (new () => import("vue").ComponentPublicInstance<{} & {
    type?: string | undefined;
    size?: "" | "is-small" | "is-medium" | "is-large" | undefined;
    icon?: any;
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
    hasCounter?: boolean | undefined;
    customInputClass?: string | undefined;
    inputIcons?: InputIcons | undefined;
}, () => VNode<import("vue").RendererNode, import("vue").RendererElement>, {}, {}, {}, Record<string, ((...args: any[]) => any) | null>, import("vue").VNodeProps, import("vue").ComponentOptionsBase<{} & {
    type?: string | undefined;
    size?: "" | "is-small" | "is-medium" | "is-large" | undefined;
    icon?: any;
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
    hasCounter?: boolean | undefined;
    customInputClass?: string | undefined;
    inputIcons?: InputIcons | undefined;
}, () => VNode<import("vue").RendererNode, import("vue").RendererElement>, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, ((...args: any[]) => any) | null>, string>>) & import("vue").ComponentOptionsBase<Readonly<{
    size: SizeVariant;
    isExpanded: boolean;
    variant: ColorVariant;
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
    hasCounter: boolean;
    customInputClass: string;
    inputIcons: InputIcons;
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
}>, () => VNode<import("vue").RendererNode, import("vue").RendererElement>, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, ((...args: any[]) => any) | null>, string> & {
    props: {
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
} & ThisType<import("vue").ComponentPublicInstance<Readonly<{
    size: SizeVariant;
    isExpanded: boolean;
    variant: ColorVariant;
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
    hasCounter: boolean;
    customInputClass: string;
    inputIcons: InputIcons;
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
}>, () => VNode<import("vue").RendererNode, import("vue").RendererElement>, {}, {}, {}, Record<string, ((...args: any[]) => any) | null>, Readonly<{
    size: SizeVariant;
    isExpanded: boolean;
    variant: ColorVariant;
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
    hasCounter: boolean;
    customInputClass: string;
    inputIcons: InputIcons;
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
}>, import("vue").ComponentOptionsBase<Readonly<{
    size: SizeVariant;
    isExpanded: boolean;
    variant: ColorVariant;
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
    hasCounter: boolean;
    customInputClass: string;
    inputIcons: InputIcons;
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
}>, () => VNode<import("vue").RendererNode, import("vue").RendererElement>, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, ((...args: any[]) => any) | null>, string>>>;
export declare const BInput: (new () => import("vue").ComponentPublicInstance<{} & {
    type?: string | undefined;
    size?: "" | "is-small" | "is-medium" | "is-large" | undefined;
    icon?: any;
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
    hasCounter?: boolean | undefined;
    customInputClass?: string | undefined;
    inputIcons?: InputIcons | undefined;
}, () => VNode<import("vue").RendererNode, import("vue").RendererElement>, {}, {}, {}, Record<string, ((...args: any[]) => any) | null>, import("vue").VNodeProps, import("vue").ComponentOptionsBase<{} & {
    type?: string | undefined;
    size?: "" | "is-small" | "is-medium" | "is-large" | undefined;
    icon?: any;
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
    hasCounter?: boolean | undefined;
    customInputClass?: string | undefined;
    inputIcons?: InputIcons | undefined;
}, () => VNode<import("vue").RendererNode, import("vue").RendererElement>, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, ((...args: any[]) => any) | null>, string>>) & import("vue").ComponentOptionsBase<Readonly<{
    size: SizeVariant;
    isExpanded: boolean;
    variant: ColorVariant;
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
    hasCounter: boolean;
    customInputClass: string;
    inputIcons: InputIcons;
} & {
    type?: string | undefined;
    icon?: any;
    onFocus?: import("fp-ts/lib/IO").IO<void> | undefined;
    onBlur?: import("fp-ts/lib/IO").IO<void> | undefined;
    modelValue?: any;
    autocomplete?: string | undefined;
    placeholder?: string | undefined;
    maxlength?: string | number | undefined;
}>, () => VNode<import("vue").RendererNode, import("vue").RendererElement>, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, ((...args: any[]) => any) | null>, string> & {
    props: {
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
    };
} & ThisType<import("vue").ComponentPublicInstance<Readonly<{
    size: SizeVariant;
    isExpanded: boolean;
    variant: ColorVariant;
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
    hasCounter: boolean;
    customInputClass: string;
    inputIcons: InputIcons;
} & {
    type?: string | undefined;
    icon?: any;
    onFocus?: import("fp-ts/lib/IO").IO<void> | undefined;
    onBlur?: import("fp-ts/lib/IO").IO<void> | undefined;
    modelValue?: any;
    autocomplete?: string | undefined;
    placeholder?: string | undefined;
    maxlength?: string | number | undefined;
}>, () => VNode<import("vue").RendererNode, import("vue").RendererElement>, {}, {}, {}, Record<string, ((...args: any[]) => any) | null>, Readonly<{
    size: SizeVariant;
    isExpanded: boolean;
    variant: ColorVariant;
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
    hasCounter: boolean;
    customInputClass: string;
    inputIcons: InputIcons;
} & {
    type?: string | undefined;
    icon?: any;
    onFocus?: import("fp-ts/lib/IO").IO<void> | undefined;
    onBlur?: import("fp-ts/lib/IO").IO<void> | undefined;
    modelValue?: any;
    autocomplete?: string | undefined;
    placeholder?: string | undefined;
    maxlength?: string | number | undefined;
}>, import("vue").ComponentOptionsBase<Readonly<{
    size: SizeVariant;
    isExpanded: boolean;
    variant: ColorVariant;
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
    hasCounter: boolean;
    customInputClass: string;
    inputIcons: InputIcons;
} & {
    type?: string | undefined;
    icon?: any;
    onFocus?: import("fp-ts/lib/IO").IO<void> | undefined;
    onBlur?: import("fp-ts/lib/IO").IO<void> | undefined;
    modelValue?: any;
    autocomplete?: string | undefined;
    placeholder?: string | undefined;
    maxlength?: string | number | undefined;
}>, () => VNode<import("vue").RendererNode, import("vue").RendererElement>, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, ((...args: any[]) => any) | null>, string>>>;
