import './tabs.sass';
import { toUndefined } from 'fp-ts/lib/Option';
import { defineComponent, h, inject } from 'vue';
import { BTabItemPropsDefinition, DEFAULT_TAB_INJECTION, TAB_ITEM_NAME, TABS_SYMBOL } from './shared';

export default defineComponent({
  name: TAB_ITEM_NAME,
  props: BTabItemPropsDefinition,
  setup(props, { slots }) {
    const injection = inject(TABS_SYMBOL, DEFAULT_TAB_INJECTION);

    return () => {
      return [
        h(
          'section',
          {
            class: 'tab-item',
            'aria-label': props.label
          },
          slots.default!({ isActive: toUndefined(injection.activeLabel.value) === props.label })
        )
      ];
    };
  }
});
