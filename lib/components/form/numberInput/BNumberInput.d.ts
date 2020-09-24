import './b-numberinput.sass';
import { IO } from 'fp-ts/lib/IO';
import { FunctionN } from 'fp-ts/lib/function';
import { VNode, PropType, ExtractPropTypes } from 'vue';
import { InputIcons, NumberInputIcons } from '../shared/types';
export declare type BNumberInputControlsPosition = 'compact' | '';
declare const BNumberInputPropsDefinition: {
    modelValue: {
        type: PropType<number>;
        default: number;
    };
    'onUpdate:modelValue': {
        type: PropType<FunctionN<[number], void>>;
        default: import("fp-ts/lib/function").Lazy<() => void>;
    };
    min: {
        type: PropType<number>;
        default: number;
    };
    max: {
        type: PropType<number>;
        default: number;
    };
    step: {
        type: PropType<number>;
        default: number;
    };
    displayControls: {
        type: PropType<boolean>;
        default: boolean;
    };
    controlsRounded: {
        type: PropType<boolean>;
        default: boolean;
    };
    controlsPosition: {
        type: PropType<BNumberInputControlsPosition>;
        default: "";
    };
    inputIcons: {
        type: PropType<InputIcons>;
        default: import("fp-ts/lib/function").Lazy<InputIcons>;
    };
    numberInputIcons: {
        type: PropType<NumberInputIcons>;
        default: import("fp-ts/lib/function").Lazy<NumberInputIcons>;
    };
    isFocused: {
        type: PropType<boolean>;
        default: boolean;
    };
    onFocus: {
        type: PropType<IO<void>>;
        required: false;
    };
    onBlur: {
        type: PropType<IO<void>>;
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
};
export declare type BNumberInputProps = ExtractPropTypes<typeof BNumberInputPropsDefinition>;
export declare function getNumberInputIcons(icons: Partial<NumberInputIcons>): NumberInputIcons;
declare const _default: (new () => import("vue").ComponentPublicInstance<{} & {
    max?: number | undefined;
    type?: string | undefined;
    size?: "" | "is-small" | "is-medium" | "is-large" | undefined;
    icon?: any;
    step?: number | undefined;
    isExpanded?: boolean | undefined;
    variant?: "" | "is-orange" | "is-primary" | "is-info" | "is-link" | "is-success" | "is-warning" | "is-danger" | undefined;
    isDisabled?: boolean | undefined;
    isFocused?: boolean | undefined;
    onFocus?: IO<void> | undefined;
    onBlur?: IO<void> | undefined;
    focusOnMount?: boolean | undefined;
    modelValue?: number | undefined;
    "onUpdate:modelValue"?: FunctionN<[number], void> | undefined;
    isReadonly?: boolean | undefined;
    disableIfReadonly?: boolean | undefined;
    useNativeValidation?: boolean | undefined;
    isValid?: boolean | undefined;
    "onUpdate:isValid"?: FunctionN<[boolean], void> | undefined;
    autocomplete?: string | undefined;
    placeholder?: string | undefined;
    isRequired?: boolean | undefined;
    isLoading?: boolean | undefined;
    isRounded?: boolean | undefined;
    maxlength?: string | number | undefined;
    usePasswordReveal?: boolean | undefined;
    inputIcons?: InputIcons | undefined;
    min?: number | undefined;
    displayControls?: boolean | undefined;
    controlsRounded?: boolean | undefined;
    controlsPosition?: "" | "compact" | undefined;
    numberInputIcons?: NumberInputIcons | undefined;
}, () => VNode<import("vue").RendererNode, import("vue").RendererElement>, {}, {}, {}, Record<string, any>, import("vue").VNodeProps, import("vue").ComponentOptionsBase<{} & {
    max?: number | undefined;
    type?: string | undefined;
    size?: "" | "is-small" | "is-medium" | "is-large" | undefined;
    icon?: any;
    step?: number | undefined;
    isExpanded?: boolean | undefined;
    variant?: "" | "is-orange" | "is-primary" | "is-info" | "is-link" | "is-success" | "is-warning" | "is-danger" | undefined;
    isDisabled?: boolean | undefined;
    isFocused?: boolean | undefined;
    onFocus?: IO<void> | undefined;
    onBlur?: IO<void> | undefined;
    focusOnMount?: boolean | undefined;
    modelValue?: number | undefined;
    "onUpdate:modelValue"?: FunctionN<[number], void> | undefined;
    isReadonly?: boolean | undefined;
    disableIfReadonly?: boolean | undefined;
    useNativeValidation?: boolean | undefined;
    isValid?: boolean | undefined;
    "onUpdate:isValid"?: FunctionN<[boolean], void> | undefined;
    autocomplete?: string | undefined;
    placeholder?: string | undefined;
    isRequired?: boolean | undefined;
    isLoading?: boolean | undefined;
    isRounded?: boolean | undefined;
    maxlength?: string | number | undefined;
    usePasswordReveal?: boolean | undefined;
    inputIcons?: InputIcons | undefined;
    min?: number | undefined;
    displayControls?: boolean | undefined;
    controlsRounded?: boolean | undefined;
    controlsPosition?: "" | "compact" | undefined;
    numberInputIcons?: NumberInputIcons | undefined;
}, () => VNode<import("vue").RendererNode, import("vue").RendererElement>, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string>>) & import("vue").ComponentOptionsBase<Readonly<{
    max: number;
    size: import("../../../types/SizeVariants").SizeVariant;
    step: number;
    isExpanded: boolean;
    variant: import("../../../types/ColorVariants").ColorVariant;
    isDisabled: boolean;
    isFocused: boolean;
    focusOnMount: boolean;
    modelValue: number;
    "onUpdate:modelValue": FunctionN<[number], void>;
    isReadonly: boolean;
    disableIfReadonly: boolean;
    useNativeValidation: boolean;
    isValid: boolean;
    "onUpdate:isValid": FunctionN<[boolean], void>;
    isRequired: boolean;
    isLoading: boolean;
    isRounded: boolean;
    usePasswordReveal: boolean;
    inputIcons: InputIcons;
    min: number;
    displayControls: boolean;
    controlsRounded: boolean;
    controlsPosition: BNumberInputControlsPosition;
    numberInputIcons: NumberInputIcons;
} & {
    type?: string | undefined;
    icon?: any;
    onFocus?: IO<void> | undefined;
    onBlur?: IO<void> | undefined;
    autocomplete?: string | undefined;
    placeholder?: string | undefined;
    maxlength?: string | number | undefined;
}>, () => VNode<import("vue").RendererNode, import("vue").RendererElement>, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string> & {
    props: {
        modelValue: {
            type: PropType<number>;
            default: number;
        };
        'onUpdate:modelValue': {
            type: PropType<FunctionN<[number], void>>;
            default: import("fp-ts/lib/function").Lazy<() => void>;
        };
        min: {
            type: PropType<number>;
            default: number;
        };
        max: {
            type: PropType<number>;
            default: number;
        };
        step: {
            type: PropType<number>;
            default: number;
        };
        displayControls: {
            type: PropType<boolean>;
            default: boolean;
        };
        controlsRounded: {
            type: PropType<boolean>;
            default: boolean;
        };
        controlsPosition: {
            type: PropType<BNumberInputControlsPosition>;
            default: "";
        };
        inputIcons: {
            type: PropType<InputIcons>;
            default: import("fp-ts/lib/function").Lazy<InputIcons>;
        };
        numberInputIcons: {
            type: PropType<NumberInputIcons>;
            default: import("fp-ts/lib/function").Lazy<NumberInputIcons>;
        };
        isFocused: {
            type: PropType<boolean>;
            default: boolean;
        };
        onFocus: {
            type: PropType<IO<void>>;
            required: false;
        };
        onBlur: {
            type: PropType<IO<void>>;
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
    };
} & ThisType<import("vue").ComponentPublicInstance<Readonly<{
    max: number;
    size: import("../../../types/SizeVariants").SizeVariant;
    step: number;
    isExpanded: boolean;
    variant: import("../../../types/ColorVariants").ColorVariant;
    isDisabled: boolean;
    isFocused: boolean;
    focusOnMount: boolean;
    modelValue: number;
    "onUpdate:modelValue": FunctionN<[number], void>;
    isReadonly: boolean;
    disableIfReadonly: boolean;
    useNativeValidation: boolean;
    isValid: boolean;
    "onUpdate:isValid": FunctionN<[boolean], void>;
    isRequired: boolean;
    isLoading: boolean;
    isRounded: boolean;
    usePasswordReveal: boolean;
    inputIcons: InputIcons;
    min: number;
    displayControls: boolean;
    controlsRounded: boolean;
    controlsPosition: BNumberInputControlsPosition;
    numberInputIcons: NumberInputIcons;
} & {
    type?: string | undefined;
    icon?: any;
    onFocus?: IO<void> | undefined;
    onBlur?: IO<void> | undefined;
    autocomplete?: string | undefined;
    placeholder?: string | undefined;
    maxlength?: string | number | undefined;
}>, () => VNode<import("vue").RendererNode, import("vue").RendererElement>, {}, {}, {}, Record<string, any>, Readonly<{
    max: number;
    size: import("../../../types/SizeVariants").SizeVariant;
    step: number;
    isExpanded: boolean;
    variant: import("../../../types/ColorVariants").ColorVariant;
    isDisabled: boolean;
    isFocused: boolean;
    focusOnMount: boolean;
    modelValue: number;
    "onUpdate:modelValue": FunctionN<[number], void>;
    isReadonly: boolean;
    disableIfReadonly: boolean;
    useNativeValidation: boolean;
    isValid: boolean;
    "onUpdate:isValid": FunctionN<[boolean], void>;
    isRequired: boolean;
    isLoading: boolean;
    isRounded: boolean;
    usePasswordReveal: boolean;
    inputIcons: InputIcons;
    min: number;
    displayControls: boolean;
    controlsRounded: boolean;
    controlsPosition: BNumberInputControlsPosition;
    numberInputIcons: NumberInputIcons;
} & {
    type?: string | undefined;
    icon?: any;
    onFocus?: IO<void> | undefined;
    onBlur?: IO<void> | undefined;
    autocomplete?: string | undefined;
    placeholder?: string | undefined;
    maxlength?: string | number | undefined;
}>, import("vue").ComponentOptionsBase<Readonly<{
    max: number;
    size: import("../../../types/SizeVariants").SizeVariant;
    step: number;
    isExpanded: boolean;
    variant: import("../../../types/ColorVariants").ColorVariant;
    isDisabled: boolean;
    isFocused: boolean;
    focusOnMount: boolean;
    modelValue: number;
    "onUpdate:modelValue": FunctionN<[number], void>;
    isReadonly: boolean;
    disableIfReadonly: boolean;
    useNativeValidation: boolean;
    isValid: boolean;
    "onUpdate:isValid": FunctionN<[boolean], void>;
    isRequired: boolean;
    isLoading: boolean;
    isRounded: boolean;
    usePasswordReveal: boolean;
    inputIcons: InputIcons;
    min: number;
    displayControls: boolean;
    controlsRounded: boolean;
    controlsPosition: BNumberInputControlsPosition;
    numberInputIcons: NumberInputIcons;
} & {
    type?: string | undefined;
    icon?: any;
    onFocus?: IO<void> | undefined;
    onBlur?: IO<void> | undefined;
    autocomplete?: string | undefined;
    placeholder?: string | undefined;
    maxlength?: string | number | undefined;
}>, () => VNode<import("vue").RendererNode, import("vue").RendererElement>, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string>>>;
export default _default;
