import { toUndefined } from 'fp-ts/lib/Option';
import { defineComponent, inject, h, computed, withDirectives, vShow } from 'vue';
import { BStepItemPropsDefinition, DEFAULT_STEP_INJECTION, STEP_ITEM_NAME, STEPS_SYMBOL } from './shared';

export default defineComponent({
  name: STEP_ITEM_NAME,
  props: BStepItemPropsDefinition,
  setup(props, { slots }) {
    const injection = inject(STEPS_SYMBOL, DEFAULT_STEP_INJECTION);

    const index = injection.steps.findIndex(p => p.label === props.label);

    if (index > -1) {
      injection.steps.splice(index, 1, props);
    } else {
      injection.steps.push(props);
    }

    const isActive = computed(() => toUndefined(injection.activeLabel.value) === props.label);

    const destroyOnHide = computed(() => props.destroyOnHide ?? injection.destroyOnHide.value);

    return () => {
      if (destroyOnHide.value) {
        return isActive.value
          ? h(
              'section',
              {
                class: 'step-item',
                'aria-label': props.label
              },
              slots.default && slots.default({ isActive: isActive.value })
            )
          : undefined;
      }
      return withDirectives(
        h(
          'section',
          {
            class: 'step-item',
            'aria-label': props.label
          },
          slots.default && slots.default({ isActive: isActive.value })
        ),
        [[vShow, isActive.value]]
      );
    };
  }
});
