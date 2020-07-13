import { none } from 'fp-ts/lib/Option';
import { shallowRef } from 'vue';
export const TABS_SYMBOL = Symbol('tabs');
export const DEFAULT_TAB_INJECTION = {
    tabs: shallowRef([]),
    activeLabel: shallowRef(none)
};
export const BTabItemPropsDefinition = {
    label: {
        type: String,
        required: true
    },
    icon: {
        type: Function
    },
    isDisabled: {
        type: Boolean,
        default: false
    },
    isVisible: {
        type: Boolean,
        default: true
    }
};
//# sourceMappingURL=shared.js.map