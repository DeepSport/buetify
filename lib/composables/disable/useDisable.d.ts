import { Ref, PropType, ExtractPropTypes } from 'vue';
export declare const UseDisablePropsDefinition: {
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
};
export declare type UseDisableProps = ExtractPropTypes<typeof UseDisablePropsDefinition>;
export declare function useDisable(props: UseDisableProps): Ref<boolean>;
