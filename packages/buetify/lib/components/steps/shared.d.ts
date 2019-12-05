import { Component, ExtractPropTypes, PropType, Ref } from 'vue';
import { Option } from 'fp-ts/lib/Option';
import { ColorVariant } from '../../types/ColorVariants';
export declare const STEPS_SYMBOL: unique symbol;
export declare const STEP_ITEM_NAME = "b-step-item";
export interface StepInjection {
    activeLabel: Ref<Option<string>>;
    steps: BStepItemProps[];
}
export declare const DEFAULT_STEP_INJECTION: StepInjection;
export declare const BStepItemPropsDefinition: {
    label: {
        type: PropType<string>;
        required: true;
    };
    step: {
        type: StringConstructor;
        required: boolean;
    };
    variant: {
        type: PropType<ColorVariant>;
        default: "";
    };
    icon: {
        type: PropType<Component<any, any, any, Record<string, import("@vue/reactivity").ComputedGetter<any> | import("vue").WritableComputedOptions<any>>, import("vue").MethodOptions>>;
    };
    isClickable: {
        type: PropType<boolean>;
        default: boolean;
    };
    isCompleted: {
        type: PropType<boolean>;
        default: boolean;
    };
    isVisible: {
        type: PropType<boolean>;
        default: boolean;
    };
};
export declare type BStepItemProps = ExtractPropTypes<typeof BStepItemPropsDefinition>;
