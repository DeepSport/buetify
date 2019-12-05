import { shallowRef } from 'vue';
import { none } from 'fp-ts/lib/Option';
export const STEPS_SYMBOL = Symbol('steps');
export const STEP_ITEM_NAME = 'b-step-item';
export const DEFAULT_STEP_INJECTION = {
  activeLabel: shallowRef(none),
  steps: []
};
export const BStepItemPropsDefinition = {
  label: {
    type: String,
    required: true
  },
  step: {
    type: String,
    required: false
  },
  variant: {
    type: String,
    default: ''
  },
  icon: {
    type: [Function, Object]
  },
  isClickable: {
    type: Boolean,
    default: false
  },
  isCompleted: {
    type: Boolean,
    default: false
  },
  isVisible: {
    type: Boolean,
    default: true
  }
};
//# sourceMappingURL=shared.js.map