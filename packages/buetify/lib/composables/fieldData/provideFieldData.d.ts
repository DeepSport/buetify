import { FunctionN } from 'fp-ts/lib/function';
import { PropType, ExtractPropTypes, Ref } from 'vue';
import { AllColorsVariant } from '../../types/ColorVariants';
export declare const PROVIDE_FIELD_DATA_INJECTION_SYMBOL: unique symbol;
export declare const ProvideFieldDataPropsDefinition: {
    variant: {
        type: PropType<AllColorsVariant>;
        required: boolean;
    };
    message: {
        type: PropType<string | {
            [K: string]: boolean;
        } | (string | {
            [K: string]: boolean;
        })[]>;
        required: boolean;
    };
    isExpanded: {
        type: PropType<boolean>;
        default: boolean;
    };
    labelFor: PropType<string>;
    label: {
        type: PropType<string>;
        default: string;
    };
};
export declare type ProvideFieldDataProps = ExtractPropTypes<typeof ProvideFieldDataPropsDefinition>;
export declare function formatMessage(message: string | {
    [K: string]: boolean;
} | Array<string | {
    [K: string]: boolean;
}> | undefined): string;
export interface FieldDataAttrs {
    label: Ref<string>;
    isFullwidth: Ref<boolean>;
    isExpanded: Ref<boolean>;
    message: Ref<string>;
    messageVariant: Ref<undefined | AllColorsVariant>;
    id: Ref<string | undefined>;
    labelId: Ref<string | undefined>;
}
export interface FieldDataListeners {
    onNewMessage: FunctionN<[string | {
        [K: string]: boolean;
    } | Array<string | {
        [K: string]: boolean;
    }>], void>;
    onNewVariant: FunctionN<[AllColorsVariant], void>;
}
export interface FieldDataInjection {
    attrs: FieldDataAttrs;
    setters: FieldDataListeners;
}
export declare const DEFAULT_FIELD_DATA_INJECTION: FieldDataInjection;
export declare function provideFieldData(props: ProvideFieldDataProps): FieldDataInjection;
