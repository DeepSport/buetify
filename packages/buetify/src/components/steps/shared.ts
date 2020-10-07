import { VNode } from 'vue';
import { IO } from 'fp-ts/lib/IO';
import { Component, ExtractPropTypes, PropType, Ref, shallowRef } from 'vue';
import { none, Option } from 'fp-ts/lib/Option';
import { ColorVariant } from '../../types/ColorVariants';

export const STEPS_SYMBOL = Symbol('steps');

export const STEP_ITEM_NAME = 'b-step-item';

export interface BStepItemData {
  props: BStepItemProps;
  render: IO<VNode[]>;
}

export type BStepItemDataRefs = {
  [K in keyof BStepItemProps]: Ref<BStepItemProps[K]>
}

export interface StepInjection {
  activeLabel: Ref<Option<string>>;
  steps: BStepItemProps[];
}

export const DEFAULT_STEP_INJECTION: StepInjection = {
  activeLabel: shallowRef(none),
  steps: []
};

export const BStepItemPropsDefinition = {
  label: {
    type: String as PropType<string>,
    required: true as const
  },
  step: {
    type: String,
    required: false
  },
  variant: {
    type: String as PropType<ColorVariant>,
    default: '' as const
  },
  icon: {
    type: [Function, Object] as PropType<Component>
  },
  isClickable: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  isCompleted: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  isVisible: {
    type: Boolean as PropType<boolean>,
    default: true
  }
};

export type BStepItemProps = ExtractPropTypes<typeof BStepItemPropsDefinition>;
