import { toUndefined } from 'fp-ts/lib/Option';
import { defineComponent, h, inject, withDirectives, vShow, computed } from 'vue';
import { BTabItemPropsDefinition, DEFAULT_TAB_INJECTION, TAB_ITEM_NAME, TABS_SYMBOL } from './shared';

export default defineComponent({
  name: TAB_ITEM_NAME,
  props: BTabItemPropsDefinition,
  setup(props, { slots }) {
    const injection = inject(TABS_SYMBOL, DEFAULT_TAB_INJECTION);

    const index = injection.tabs.findIndex(p => p.label === props.label);

    if (index > -1) {
      injection.tabs.splice(index, 1, props);
    } else {
      injection.tabs.push(props);
    }

    const isActive = computed(() => toUndefined(injection.activeLabel.value) === props.label);

    const destroyOnHide = computed(() => props.destroyOnHide ?? injection.destroyOnHide.value);

    return () => {
      if (destroyOnHide.value) {
        return isActive.value
          ? h(
              'section',
              {
                class: 'tab-item',
                'aria-label': props.label
              },
              slots.default && slots.default({ isActive: toUndefined(injection.activeLabel.value) === props.label })
            )
          : undefined;
      }
      return withDirectives(
        h(
          'section',
          {
            class: 'tab-item',
            'aria-label': props.label
          },
          slots.default && slots.default({ isActive: toUndefined(injection.activeLabel.value) === props.label })
        ),
        [[vShow, isActive.value]]
      );
    };
  }
});
