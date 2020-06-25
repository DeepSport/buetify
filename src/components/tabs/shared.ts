import { IO } from 'fp-ts/lib/IO';
import { none, Option } from 'fp-ts/lib/Option';
import { PropType, ExtractPropTypes, Component, VNode, Ref, shallowRef } from 'vue';

export const TABS_SYMBOL = Symbol('tabs');

export interface BTabItemData {
  props: BTabItemProps;
  render: IO<VNode[]>;
}

export interface TabInjection {
  tabs: Ref<BTabItemData[]>;
  activeLabel: Ref<Option<string>>;
}

export const DEFAULT_TAB_INJECTION: TabInjection = {
  tabs: shallowRef([]),
  activeLabel: shallowRef(none)
};

export const BTabItemPropsDefinition = {
  label: {
    type: String as PropType<string>,
    required: true as const
  },
  icon: {
    type: Function as PropType<Component>
  },
  isDisabled: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  isVisible: {
    type: Boolean as PropType<boolean>,
    default: true
  }
};

export type BTabItemProps = ExtractPropTypes<typeof BTabItemPropsDefinition>;
