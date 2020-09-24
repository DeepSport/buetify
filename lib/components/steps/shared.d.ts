import { VNode } from 'vue';
import { IO } from 'fp-ts/lib/IO';
import { Component, ExtractPropTypes, PropType, Ref } from 'vue';
import { Option } from 'fp-ts/lib/Option';
import { ColorVariant } from '../../types/ColorVariants';
export declare const STEPS_SYMBOL: unique symbol;
export interface BStepItemData {
    props: BTabItemProps;
    render: IO<VNode[]>;
}
export interface StepInjection {
    steps: Ref<BStepItemData[]>;
    activeLabel: Ref<Option<string>>;
}
export declare const DEFAULT_STEP_INJECTION: StepInjection;
export declare const BStepItemPropsDefinition: {
    label: {
        type: PropType<string>;
        required: true;
    };
    variant: {
        type: PropType<ColorVariant>;
        default: "";
    };
    icon: {
        type: PropType<Component>;
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
export declare type BTabItemProps = ExtractPropTypes<typeof BStepItemPropsDefinition>;
