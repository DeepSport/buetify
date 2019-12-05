import { none } from 'fp-ts/lib/Option';
import { shallowRef } from 'vue';
export const TABS_SYMBOL = Symbol('tabs');
export const TAB_ITEM_NAME = 'b-tab-item';
export const BTabItemPropsDefinition = {
  label: {
    type: String,
    required: true
  },
  icon: {
    type: [Function, Object]
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
export const DEFAULT_TAB_INJECTION = {
  activeLabel: shallowRef(none),
  tabs: []
};
//# sourceMappingURL=shared.js.map