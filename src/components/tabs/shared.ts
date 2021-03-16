import { none, Option } from 'fp-ts/lib/Option';
import { PropType, ExtractPropTypes, Component, Ref, shallowRef } from 'vue';

export const TABS_SYMBOL = Symbol('tabs');

export const TAB_ITEM_NAME = 'b-tab-item';

export const BTabItemPropsDefinition = {
  label: {
    type: String as PropType<string>,
    required: true as const
  },
  icon: {
    type: [Function, Object] as PropType<Component>
  },
  isDisabled: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  isVisible: {
    type: Boolean as PropType<boolean>,
    default: true
  },
  destroyOnHide: {
    type: Boolean as PropType<boolean>,
    default: undefined
  }
};

export type BTabItemProps = ExtractPropTypes<typeof BTabItemPropsDefinition>;

export interface TabInjection {
  activeLabel: Ref<Option<string>>;
  destroyOnHide: Ref<boolean>;
  tabs: BTabItemProps[];
}

export const DEFAULT_TAB_INJECTION: TabInjection = {
  activeLabel: shallowRef(none),
  destroyOnHide: shallowRef(false),
  tabs: []
};
