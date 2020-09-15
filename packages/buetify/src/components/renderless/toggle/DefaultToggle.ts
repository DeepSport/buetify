import { getUseTogglePropsDefinition, useToggle, UseToggleProps } from '../../../composables/toggle';
import { defineComponent } from 'vue';

export function defineToggle<K extends string>(statusName: K) {
  return defineComponent({
    name: 'toggle',
    props: getUseTogglePropsDefinition<K>(statusName),
    setup(props, { slots }) {
      const toggle = useToggle((props as unknown) as UseToggleProps<K>, statusName);
      return () =>
        slots.default &&
        slots.default({
          attrs: toggle.attrs.value,
          listeners: toggle.listeners,
          isOn: toggle.isOn.value,
          isOff: toggle.isOff.value,
          setOn: toggle.setOn,
          setOff: toggle.setOff,
          toggle: toggle.toggle
        });
    }
  });
}

export const DefaultToggle = defineToggle('status');
