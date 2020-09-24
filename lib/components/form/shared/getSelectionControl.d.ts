import { ColorVariant } from '../../../types/ColorVariants';
export declare function getSelectionControl(role: string, type: string, name: string, staticClass: string): <T>() => (new () => import("vue").ComponentPublicInstance<{} & {
    label?: string | undefined;
    id?: string | undefined;
    size?: "" | "is-small" | "is-medium" | "is-large" | undefined;
    variant?: "" | "is-orange" | "is-primary" | "is-info" | "is-link" | "is-success" | "is-warning" | "is-danger" | undefined;
    isDisabled?: boolean | undefined;
    isFocused?: boolean | undefined;
    onFocus?: import("fp-ts/lib/IO").IO<void> | undefined;
    onBlur?: import("fp-ts/lib/IO").IO<void> | undefined;
    focusOnMount?: boolean | undefined;
    modelValue?: ({
        type: import("vue").PropType<T>;
        required: false;
    } extends {
        type: true | null;
    } ? any : {
        type: import("vue").PropType<T>;
        required: false;
    } extends ObjectConstructor | {
        type: ObjectConstructor;
    } ? {
        [key: string]: any;
    } : {
        type: import("vue").PropType<T>;
        required: false;
    } extends BooleanConstructor | {
        type: BooleanConstructor;
    } ? boolean : {
        type: import("vue").PropType<T>;
        required: false;
    } extends import("vue").Prop<infer V> ? V : {
        type: import("vue").PropType<T>;
        required: false;
    }) | undefined;
    "onUpdate:modelValue"?: import("fp-ts/lib/function").FunctionN<[T], void> | undefined;
    isReadonly?: boolean | undefined;
    disableIfReadonly?: boolean | undefined;
    isRequired?: boolean | undefined;
    eq?: import("fp-ts/lib/Eq").Eq<T> | undefined;
    trueValue?: ({
        type: import("vue").PropType<T>;
        default: T;
    } extends {
        type: true | null;
    } ? any : {
        type: import("vue").PropType<T>;
        default: T;
    } extends ObjectConstructor | {
        type: ObjectConstructor;
    } ? {
        [key: string]: any;
    } : {
        type: import("vue").PropType<T>;
        default: T;
    } extends BooleanConstructor | {
        type: BooleanConstructor;
    } ? boolean : {
        type: import("vue").PropType<T>;
        default: T;
    } extends import("vue").Prop<infer V> ? V : {
        type: import("vue").PropType<T>;
        default: T;
    }) | undefined;
    falseValue?: ({
        type: import("vue").PropType<T>;
        default: T;
    } extends {
        type: true | null;
    } ? any : {
        type: import("vue").PropType<T>;
        default: T;
    } extends ObjectConstructor | {
        type: ObjectConstructor;
    } ? {
        [key: string]: any;
    } : {
        type: import("vue").PropType<T>;
        default: T;
    } extends BooleanConstructor | {
        type: BooleanConstructor;
    } ? boolean : {
        type: import("vue").PropType<T>;
        default: T;
    } extends import("vue").Prop<infer V> ? V : {
        type: import("vue").PropType<T>;
        default: T;
    }) | undefined;
    indeterminateValue?: ({
        type: import("vue").PropType<T>;
    } extends {
        type: true | null;
    } ? any : {
        type: import("vue").PropType<T>;
    } extends ObjectConstructor | {
        type: ObjectConstructor;
    } ? {
        [key: string]: any;
    } : {
        type: import("vue").PropType<T>;
    } extends BooleanConstructor | {
        type: BooleanConstructor;
    } ? boolean : {
        type: import("vue").PropType<T>;
    } extends import("vue").Prop<infer V> ? V : {
        type: import("vue").PropType<T>;
    }) | undefined;
    isMultiple?: boolean | undefined;
}, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement>, {}, {}, {}, Record<string, any>, import("vue").VNodeProps, import("vue").ComponentOptionsBase<{} & {
    label?: string | undefined;
    id?: string | undefined;
    size?: "" | "is-small" | "is-medium" | "is-large" | undefined;
    variant?: "" | "is-orange" | "is-primary" | "is-info" | "is-link" | "is-success" | "is-warning" | "is-danger" | undefined;
    isDisabled?: boolean | undefined;
    isFocused?: boolean | undefined;
    onFocus?: import("fp-ts/lib/IO").IO<void> | undefined;
    onBlur?: import("fp-ts/lib/IO").IO<void> | undefined;
    focusOnMount?: boolean | undefined;
    modelValue?: ({
        type: import("vue").PropType<T>;
        required: false;
    } extends {
        type: true | null;
    } ? any : {
        type: import("vue").PropType<T>;
        required: false;
    } extends ObjectConstructor | {
        type: ObjectConstructor;
    } ? {
        [key: string]: any;
    } : {
        type: import("vue").PropType<T>;
        required: false;
    } extends BooleanConstructor | {
        type: BooleanConstructor;
    } ? boolean : {
        type: import("vue").PropType<T>;
        required: false;
    } extends import("vue").Prop<infer V> ? V : {
        type: import("vue").PropType<T>;
        required: false;
    }) | undefined;
    "onUpdate:modelValue"?: import("fp-ts/lib/function").FunctionN<[T], void> | undefined;
    isReadonly?: boolean | undefined;
    disableIfReadonly?: boolean | undefined;
    isRequired?: boolean | undefined;
    eq?: import("fp-ts/lib/Eq").Eq<T> | undefined;
    trueValue?: ({
        type: import("vue").PropType<T>;
        default: T;
    } extends {
        type: true | null;
    } ? any : {
        type: import("vue").PropType<T>;
        default: T;
    } extends ObjectConstructor | {
        type: ObjectConstructor;
    } ? {
        [key: string]: any;
    } : {
        type: import("vue").PropType<T>;
        default: T;
    } extends BooleanConstructor | {
        type: BooleanConstructor;
    } ? boolean : {
        type: import("vue").PropType<T>;
        default: T;
    } extends import("vue").Prop<infer V> ? V : {
        type: import("vue").PropType<T>;
        default: T;
    }) | undefined;
    falseValue?: ({
        type: import("vue").PropType<T>;
        default: T;
    } extends {
        type: true | null;
    } ? any : {
        type: import("vue").PropType<T>;
        default: T;
    } extends ObjectConstructor | {
        type: ObjectConstructor;
    } ? {
        [key: string]: any;
    } : {
        type: import("vue").PropType<T>;
        default: T;
    } extends BooleanConstructor | {
        type: BooleanConstructor;
    } ? boolean : {
        type: import("vue").PropType<T>;
        default: T;
    } extends import("vue").Prop<infer V> ? V : {
        type: import("vue").PropType<T>;
        default: T;
    }) | undefined;
    indeterminateValue?: ({
        type: import("vue").PropType<T>;
    } extends {
        type: true | null;
    } ? any : {
        type: import("vue").PropType<T>;
    } extends ObjectConstructor | {
        type: ObjectConstructor;
    } ? {
        [key: string]: any;
    } : {
        type: import("vue").PropType<T>;
    } extends BooleanConstructor | {
        type: BooleanConstructor;
    } ? boolean : {
        type: import("vue").PropType<T>;
    } extends import("vue").Prop<infer V> ? V : {
        type: import("vue").PropType<T>;
    }) | undefined;
    isMultiple?: boolean | undefined;
}, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement>, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string>>) & import("vue").ComponentOptionsBase<Readonly<{
    label: string;
    size: import("../../../types/SizeVariants").SizeVariant;
    variant: ColorVariant;
    isDisabled: boolean;
    isFocused: boolean;
    focusOnMount: boolean;
    "onUpdate:modelValue": import("fp-ts/lib/function").FunctionN<[T], void>;
    isReadonly: boolean;
    disableIfReadonly: boolean;
    isRequired: boolean;
    eq: import("fp-ts/lib/Eq").Eq<T>;
    trueValue: {
        type: import("vue").PropType<T>;
        default: T;
    } extends {
        type: true | null;
    } ? any : {
        type: import("vue").PropType<T>;
        default: T;
    } extends ObjectConstructor | {
        type: ObjectConstructor;
    } ? {
        [key: string]: any;
    } : {
        type: import("vue").PropType<T>;
        default: T;
    } extends BooleanConstructor | {
        type: BooleanConstructor;
    } ? boolean : {
        type: import("vue").PropType<T>;
        default: T;
    } extends import("vue").Prop<infer V> ? V : {
        type: import("vue").PropType<T>;
        default: T;
    };
    falseValue: {
        type: import("vue").PropType<T>;
        default: T;
    } extends {
        type: true | null;
    } ? any : {
        type: import("vue").PropType<T>;
        default: T;
    } extends ObjectConstructor | {
        type: ObjectConstructor;
    } ? {
        [key: string]: any;
    } : {
        type: import("vue").PropType<T>;
        default: T;
    } extends BooleanConstructor | {
        type: BooleanConstructor;
    } ? boolean : {
        type: import("vue").PropType<T>;
        default: T;
    } extends import("vue").Prop<infer V> ? V : {
        type: import("vue").PropType<T>;
        default: T;
    };
    isMultiple: boolean;
} & {
    id?: string | undefined;
    onFocus?: import("fp-ts/lib/IO").IO<void> | undefined;
    onBlur?: import("fp-ts/lib/IO").IO<void> | undefined;
    modelValue?: ({
        type: import("vue").PropType<T>;
        required: false;
    } extends {
        type: true | null;
    } ? any : {
        type: import("vue").PropType<T>;
        required: false;
    } extends ObjectConstructor | {
        type: ObjectConstructor;
    } ? {
        [key: string]: any;
    } : {
        type: import("vue").PropType<T>;
        required: false;
    } extends BooleanConstructor | {
        type: BooleanConstructor;
    } ? boolean : {
        type: import("vue").PropType<T>;
        required: false;
    } extends import("vue").Prop<infer V> ? V : {
        type: import("vue").PropType<T>;
        required: false;
    }) | undefined;
    indeterminateValue?: ({
        type: import("vue").PropType<T>;
    } extends {
        type: true | null;
    } ? any : {
        type: import("vue").PropType<T>;
    } extends ObjectConstructor | {
        type: ObjectConstructor;
    } ? {
        [key: string]: any;
    } : {
        type: import("vue").PropType<T>;
    } extends BooleanConstructor | {
        type: BooleanConstructor;
    } ? boolean : {
        type: import("vue").PropType<T>;
    } extends import("vue").Prop<infer V> ? V : {
        type: import("vue").PropType<T>;
    }) | undefined;
}>, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement>, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string> & {
    props: {
        isFocused: {
            type: import("vue").PropType<boolean>;
            default: boolean;
        };
        onFocus: {
            type: import("vue").PropType<import("fp-ts/lib/IO").IO<void>>;
            required: false;
        };
        onBlur: {
            type: import("vue").PropType<import("fp-ts/lib/IO").IO<void>>;
            required: false;
        };
        focusOnMount: {
            type: import("vue").PropType<boolean>;
            default: boolean;
        };
        id: import("vue").PropType<string>;
        label: {
            type: import("vue").PropType<string>;
            default: string;
        };
        isDisabled: {
            type: import("vue").PropType<boolean>;
            required: boolean;
            default: boolean;
        };
        isReadonly: {
            type: import("vue").PropType<boolean>;
            required: boolean;
            default: boolean;
        };
        disableIfReadonly: {
            type: import("vue").PropType<boolean>;
            required: boolean;
            default: boolean;
        };
        modelValue: {
            type: import("vue").PropType<T>;
            required: false;
        };
        'onUpdate:modelValue': {
            type: import("vue").PropType<import("fp-ts/lib/function").FunctionN<[T], void>>;
            default: import("fp-ts/lib/function").Lazy<import("fp-ts/lib/function").FunctionN<[T], void>>;
        };
        eq: {
            type: import("vue").PropType<import("fp-ts/lib/Eq").Eq<T>>;
            default: import("fp-ts/lib/function").Lazy<import("fp-ts/lib/Eq").Eq<T>>;
        };
        trueValue: {
            type: import("vue").PropType<T>;
            default: T;
        };
        falseValue: {
            type: import("vue").PropType<T>;
            default: T;
        };
        indeterminateValue: {
            type: import("vue").PropType<T>;
        };
        isMultiple: {
            type: import("vue").PropType<boolean>;
            default: boolean;
        };
        variant: {
            type: import("vue").PropType<ColorVariant>;
            default: ColorVariant;
        };
        size: {
            type: import("vue").PropType<import("../../../types/SizeVariants").SizeVariant>;
            default: import("../../../types/SizeVariants").SizeVariant;
        };
        isRequired: {
            type: import("vue").PropType<boolean>;
            default: boolean;
        };
    };
} & ThisType<import("vue").ComponentPublicInstance<Readonly<{
    label: string;
    size: import("../../../types/SizeVariants").SizeVariant;
    variant: ColorVariant;
    isDisabled: boolean;
    isFocused: boolean;
    focusOnMount: boolean;
    "onUpdate:modelValue": import("fp-ts/lib/function").FunctionN<[T], void>;
    isReadonly: boolean;
    disableIfReadonly: boolean;
    isRequired: boolean;
    eq: import("fp-ts/lib/Eq").Eq<T>;
    trueValue: {
        type: import("vue").PropType<T>;
        default: T;
    } extends {
        type: true | null;
    } ? any : {
        type: import("vue").PropType<T>;
        default: T;
    } extends ObjectConstructor | {
        type: ObjectConstructor;
    } ? {
        [key: string]: any;
    } : {
        type: import("vue").PropType<T>;
        default: T;
    } extends BooleanConstructor | {
        type: BooleanConstructor;
    } ? boolean : {
        type: import("vue").PropType<T>;
        default: T;
    } extends import("vue").Prop<infer V> ? V : {
        type: import("vue").PropType<T>;
        default: T;
    };
    falseValue: {
        type: import("vue").PropType<T>;
        default: T;
    } extends {
        type: true | null;
    } ? any : {
        type: import("vue").PropType<T>;
        default: T;
    } extends ObjectConstructor | {
        type: ObjectConstructor;
    } ? {
        [key: string]: any;
    } : {
        type: import("vue").PropType<T>;
        default: T;
    } extends BooleanConstructor | {
        type: BooleanConstructor;
    } ? boolean : {
        type: import("vue").PropType<T>;
        default: T;
    } extends import("vue").Prop<infer V> ? V : {
        type: import("vue").PropType<T>;
        default: T;
    };
    isMultiple: boolean;
} & {
    id?: string | undefined;
    onFocus?: import("fp-ts/lib/IO").IO<void> | undefined;
    onBlur?: import("fp-ts/lib/IO").IO<void> | undefined;
    modelValue?: ({
        type: import("vue").PropType<T>;
        required: false;
    } extends {
        type: true | null;
    } ? any : {
        type: import("vue").PropType<T>;
        required: false;
    } extends ObjectConstructor | {
        type: ObjectConstructor;
    } ? {
        [key: string]: any;
    } : {
        type: import("vue").PropType<T>;
        required: false;
    } extends BooleanConstructor | {
        type: BooleanConstructor;
    } ? boolean : {
        type: import("vue").PropType<T>;
        required: false;
    } extends import("vue").Prop<infer V> ? V : {
        type: import("vue").PropType<T>;
        required: false;
    }) | undefined;
    indeterminateValue?: ({
        type: import("vue").PropType<T>;
    } extends {
        type: true | null;
    } ? any : {
        type: import("vue").PropType<T>;
    } extends ObjectConstructor | {
        type: ObjectConstructor;
    } ? {
        [key: string]: any;
    } : {
        type: import("vue").PropType<T>;
    } extends BooleanConstructor | {
        type: BooleanConstructor;
    } ? boolean : {
        type: import("vue").PropType<T>;
    } extends import("vue").Prop<infer V> ? V : {
        type: import("vue").PropType<T>;
    }) | undefined;
}>, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement>, {}, {}, {}, Record<string, any>, Readonly<{
    label: string;
    size: import("../../../types/SizeVariants").SizeVariant;
    variant: ColorVariant;
    isDisabled: boolean;
    isFocused: boolean;
    focusOnMount: boolean;
    "onUpdate:modelValue": import("fp-ts/lib/function").FunctionN<[T], void>;
    isReadonly: boolean;
    disableIfReadonly: boolean;
    isRequired: boolean;
    eq: import("fp-ts/lib/Eq").Eq<T>;
    trueValue: {
        type: import("vue").PropType<T>;
        default: T;
    } extends {
        type: true | null;
    } ? any : {
        type: import("vue").PropType<T>;
        default: T;
    } extends ObjectConstructor | {
        type: ObjectConstructor;
    } ? {
        [key: string]: any;
    } : {
        type: import("vue").PropType<T>;
        default: T;
    } extends BooleanConstructor | {
        type: BooleanConstructor;
    } ? boolean : {
        type: import("vue").PropType<T>;
        default: T;
    } extends import("vue").Prop<infer V> ? V : {
        type: import("vue").PropType<T>;
        default: T;
    };
    falseValue: {
        type: import("vue").PropType<T>;
        default: T;
    } extends {
        type: true | null;
    } ? any : {
        type: import("vue").PropType<T>;
        default: T;
    } extends ObjectConstructor | {
        type: ObjectConstructor;
    } ? {
        [key: string]: any;
    } : {
        type: import("vue").PropType<T>;
        default: T;
    } extends BooleanConstructor | {
        type: BooleanConstructor;
    } ? boolean : {
        type: import("vue").PropType<T>;
        default: T;
    } extends import("vue").Prop<infer V> ? V : {
        type: import("vue").PropType<T>;
        default: T;
    };
    isMultiple: boolean;
} & {
    id?: string | undefined;
    onFocus?: import("fp-ts/lib/IO").IO<void> | undefined;
    onBlur?: import("fp-ts/lib/IO").IO<void> | undefined;
    modelValue?: ({
        type: import("vue").PropType<T>;
        required: false;
    } extends {
        type: true | null;
    } ? any : {
        type: import("vue").PropType<T>;
        required: false;
    } extends ObjectConstructor | {
        type: ObjectConstructor;
    } ? {
        [key: string]: any;
    } : {
        type: import("vue").PropType<T>;
        required: false;
    } extends BooleanConstructor | {
        type: BooleanConstructor;
    } ? boolean : {
        type: import("vue").PropType<T>;
        required: false;
    } extends import("vue").Prop<infer V> ? V : {
        type: import("vue").PropType<T>;
        required: false;
    }) | undefined;
    indeterminateValue?: ({
        type: import("vue").PropType<T>;
    } extends {
        type: true | null;
    } ? any : {
        type: import("vue").PropType<T>;
    } extends ObjectConstructor | {
        type: ObjectConstructor;
    } ? {
        [key: string]: any;
    } : {
        type: import("vue").PropType<T>;
    } extends BooleanConstructor | {
        type: BooleanConstructor;
    } ? boolean : {
        type: import("vue").PropType<T>;
    } extends import("vue").Prop<infer V> ? V : {
        type: import("vue").PropType<T>;
    }) | undefined;
}>, import("vue").ComponentOptionsBase<Readonly<{
    label: string;
    size: import("../../../types/SizeVariants").SizeVariant;
    variant: ColorVariant;
    isDisabled: boolean;
    isFocused: boolean;
    focusOnMount: boolean;
    "onUpdate:modelValue": import("fp-ts/lib/function").FunctionN<[T], void>;
    isReadonly: boolean;
    disableIfReadonly: boolean;
    isRequired: boolean;
    eq: import("fp-ts/lib/Eq").Eq<T>;
    trueValue: {
        type: import("vue").PropType<T>;
        default: T;
    } extends {
        type: true | null;
    } ? any : {
        type: import("vue").PropType<T>;
        default: T;
    } extends ObjectConstructor | {
        type: ObjectConstructor;
    } ? {
        [key: string]: any;
    } : {
        type: import("vue").PropType<T>;
        default: T;
    } extends BooleanConstructor | {
        type: BooleanConstructor;
    } ? boolean : {
        type: import("vue").PropType<T>;
        default: T;
    } extends import("vue").Prop<infer V> ? V : {
        type: import("vue").PropType<T>;
        default: T;
    };
    falseValue: {
        type: import("vue").PropType<T>;
        default: T;
    } extends {
        type: true | null;
    } ? any : {
        type: import("vue").PropType<T>;
        default: T;
    } extends ObjectConstructor | {
        type: ObjectConstructor;
    } ? {
        [key: string]: any;
    } : {
        type: import("vue").PropType<T>;
        default: T;
    } extends BooleanConstructor | {
        type: BooleanConstructor;
    } ? boolean : {
        type: import("vue").PropType<T>;
        default: T;
    } extends import("vue").Prop<infer V> ? V : {
        type: import("vue").PropType<T>;
        default: T;
    };
    isMultiple: boolean;
} & {
    id?: string | undefined;
    onFocus?: import("fp-ts/lib/IO").IO<void> | undefined;
    onBlur?: import("fp-ts/lib/IO").IO<void> | undefined;
    modelValue?: ({
        type: import("vue").PropType<T>;
        required: false;
    } extends {
        type: true | null;
    } ? any : {
        type: import("vue").PropType<T>;
        required: false;
    } extends ObjectConstructor | {
        type: ObjectConstructor;
    } ? {
        [key: string]: any;
    } : {
        type: import("vue").PropType<T>;
        required: false;
    } extends BooleanConstructor | {
        type: BooleanConstructor;
    } ? boolean : {
        type: import("vue").PropType<T>;
        required: false;
    } extends import("vue").Prop<infer V> ? V : {
        type: import("vue").PropType<T>;
        required: false;
    }) | undefined;
    indeterminateValue?: ({
        type: import("vue").PropType<T>;
    } extends {
        type: true | null;
    } ? any : {
        type: import("vue").PropType<T>;
    } extends ObjectConstructor | {
        type: ObjectConstructor;
    } ? {
        [key: string]: any;
    } : {
        type: import("vue").PropType<T>;
    } extends BooleanConstructor | {
        type: BooleanConstructor;
    } ? boolean : {
        type: import("vue").PropType<T>;
    } extends import("vue").Prop<infer V> ? V : {
        type: import("vue").PropType<T>;
    }) | undefined;
}>, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement>, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string>>>;
