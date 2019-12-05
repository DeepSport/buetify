import './checkbox.sass';
import '../sass/form.sass';
export declare const defineCheckbox: <T>() => import("vue").DefineComponent<{
    isFocused: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    onFocus: {
        type: import("vue").PropType<(e?: Event | undefined) => void>;
        required: false;
    };
    onBlur: {
        type: import("vue").PropType<(e?: Event | undefined) => void>;
        required: false;
    };
    focusOnMount: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    labelFor: import("vue").PropType<string>;
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
    nativeValue: {
        type: import("vue").PropType<unknown>;
        required: boolean;
        default: null;
    };
    trueValue: {
        type: import("vue").PropType<T>;
        default: T;
    };
    falseValue: {
        type: import("vue").PropType<T>;
        default: T;
    };
    isIndeterminate: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    isMultiple: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    variant: {
        type: import("vue").PropType<import("../../..").ColorVariant>;
        default: import("../../..").ColorVariant;
    };
    size: {
        type: import("vue").PropType<import("../../..").SizeVariant>;
        default: import("../../..").SizeVariant;
    };
    isRequired: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    name: {
        type: import("vue").PropType<string>;
        required: boolean;
    };
}, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    variant: import("../../..").ColorVariant;
    size: import("../../..").SizeVariant;
    isFocused: boolean;
    isDisabled: boolean;
    label: string;
    focusOnMount: boolean;
    "onUpdate:modelValue": import("fp-ts/lib/function").FunctionN<[T], void>;
    isReadonly: boolean;
    disableIfReadonly: boolean;
    isRequired: boolean;
    eq: import("fp-ts/lib/Eq").Eq<T>;
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
    } ? Record<string, any> : {
        type: import("vue").PropType<T>;
        default: T;
    } extends BooleanConstructor | {
        type: BooleanConstructor;
    } ? boolean : {
        type: import("vue").PropType<T>;
        default: T;
    } extends import("vue").Prop<infer V, infer D> ? unknown extends V ? D : V : {
        type: import("vue").PropType<T>;
        default: T;
    };
    nativeValue: null;
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
    } ? Record<string, any> : {
        type: import("vue").PropType<T>;
        default: T;
    } extends BooleanConstructor | {
        type: BooleanConstructor;
    } ? boolean : {
        type: import("vue").PropType<T>;
        default: T;
    } extends import("vue").Prop<infer V, infer D> ? unknown extends V ? D : V : {
        type: import("vue").PropType<T>;
        default: T;
    };
    isMultiple: boolean;
    isIndeterminate: boolean;
} & {
    name?: string | undefined;
    labelFor?: string | undefined;
    onFocus?: ((e?: Event | undefined) => void) | undefined;
    onBlur?: ((e?: Event | undefined) => void) | undefined;
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
    } ? Record<string, any> : {
        type: import("vue").PropType<T>;
        required: false;
    } extends BooleanConstructor | {
        type: BooleanConstructor;
    } ? boolean : {
        type: import("vue").PropType<T>;
        required: false;
    } extends import("vue").Prop<infer V, infer D> ? unknown extends V ? D : V : {
        type: import("vue").PropType<T>;
        required: false;
    }) | undefined;
}>, {
    variant: import("../../..").ColorVariant;
    size: import("../../..").SizeVariant;
    isFocused: boolean;
    isDisabled: boolean;
    label: string;
    focusOnMount: boolean;
    "onUpdate:modelValue": import("fp-ts/lib/function").FunctionN<[T], void>;
    isReadonly: boolean;
    disableIfReadonly: boolean;
    isRequired: boolean;
    eq: import("fp-ts/lib/Eq").Eq<T>;
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
    } ? Record<string, any> : {
        type: import("vue").PropType<T>;
        default: T;
    } extends BooleanConstructor | {
        type: BooleanConstructor;
    } ? boolean : {
        type: import("vue").PropType<T>;
        default: T;
    } extends import("vue").Prop<infer V, infer D> ? unknown extends V ? D : V : {
        type: import("vue").PropType<T>;
        default: T;
    };
    nativeValue: null;
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
    } ? Record<string, any> : {
        type: import("vue").PropType<T>;
        default: T;
    } extends BooleanConstructor | {
        type: BooleanConstructor;
    } ? boolean : {
        type: import("vue").PropType<T>;
        default: T;
    } extends import("vue").Prop<infer V, infer D> ? unknown extends V ? D : V : {
        type: import("vue").PropType<T>;
        default: T;
    };
    isMultiple: boolean;
    isIndeterminate: boolean;
}>;
export declare const BCheckbox: import("vue").DefineComponent<{
    isFocused: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    onFocus: {
        type: import("vue").PropType<(e?: Event | undefined) => void>;
        required: false;
    };
    onBlur: {
        type: import("vue").PropType<(e?: Event | undefined) => void>;
        required: false;
    };
    focusOnMount: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    labelFor: import("vue").PropType<string>;
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
        type: import("vue").PropType<any>;
        required: false;
    };
    'onUpdate:modelValue': {
        type: import("vue").PropType<import("fp-ts/lib/function").FunctionN<[any], void>>;
        default: import("fp-ts/lib/function").Lazy<import("fp-ts/lib/function").FunctionN<[any], void>>;
    };
    eq: {
        type: import("vue").PropType<import("fp-ts/lib/Eq").Eq<any>>;
        default: import("fp-ts/lib/function").Lazy<import("fp-ts/lib/Eq").Eq<any>>;
    };
    nativeValue: {
        type: import("vue").PropType<unknown>;
        required: boolean;
        default: null;
    };
    trueValue: {
        type: import("vue").PropType<any>;
        default: any;
    };
    falseValue: {
        type: import("vue").PropType<any>;
        default: any;
    };
    isIndeterminate: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    isMultiple: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    variant: {
        type: import("vue").PropType<import("../../..").ColorVariant>;
        default: import("../../..").ColorVariant;
    };
    size: {
        type: import("vue").PropType<import("../../..").SizeVariant>;
        default: import("../../..").SizeVariant;
    };
    isRequired: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    name: {
        type: import("vue").PropType<string>;
        required: boolean;
    };
}, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    variant: import("../../..").ColorVariant;
    size: import("../../..").SizeVariant;
    isFocused: boolean;
    isDisabled: boolean;
    label: string;
    focusOnMount: boolean;
    "onUpdate:modelValue": import("fp-ts/lib/function").FunctionN<[any], void>;
    isReadonly: boolean;
    disableIfReadonly: boolean;
    isRequired: boolean;
    eq: import("fp-ts/lib/Eq").Eq<any>;
    falseValue: any;
    nativeValue: null;
    trueValue: any;
    isMultiple: boolean;
    isIndeterminate: boolean;
} & {
    name?: string | undefined;
    labelFor?: string | undefined;
    onFocus?: ((e?: Event | undefined) => void) | undefined;
    onBlur?: ((e?: Event | undefined) => void) | undefined;
    modelValue?: unknown;
}>, {
    variant: import("../../..").ColorVariant;
    size: import("../../..").SizeVariant;
    isFocused: boolean;
    isDisabled: boolean;
    label: string;
    focusOnMount: boolean;
    "onUpdate:modelValue": import("fp-ts/lib/function").FunctionN<[any], void>;
    isReadonly: boolean;
    disableIfReadonly: boolean;
    isRequired: boolean;
    eq: import("fp-ts/lib/Eq").Eq<any>;
    falseValue: any;
    nativeValue: null;
    trueValue: any;
    isMultiple: boolean;
    isIndeterminate: boolean;
}>;
