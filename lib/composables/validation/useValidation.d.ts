import { FunctionN } from 'fp-ts/lib/function';
import { Ref, ExtractPropTypes, PropType } from 'vue';
export declare const UseValidationPropsDefinition: {
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
};
export declare type UseValidationProps = ExtractPropTypes<typeof UseValidationPropsDefinition>;
export declare function useValidation(props: UseValidationProps, ref: Ref<HTMLElement>): {
    isDisabled: Ref<boolean>;
    isValid: Ref<false> | Ref<true>;
    validate: () => void;
};
