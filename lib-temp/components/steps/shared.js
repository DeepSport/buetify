import { shallowRef } from 'vue';
import { none } from 'fp-ts/lib/Option';
export const STEPS_SYMBOL = Symbol('steps');
export const DEFAULT_STEP_INJECTION = {
    steps: shallowRef([]),
    activeLabel: shallowRef(none)
};
export const BStepItemPropsDefinition = {
    label: {
        type: String,
        required: true
    },
    variant: {
        type: String,
        default: ''
    },
    icon: {
        type: Function,
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