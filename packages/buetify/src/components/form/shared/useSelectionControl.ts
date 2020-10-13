import {
  getUseSelectablePropsDefinition,
  SelectionControl,
  UseSelectableProps,
  useSelectionControl as useControl
} from '../../../composables/selectionControl/useSelectionControl';
import { ColorVariant } from '../../../types/ColorVariants';
import { defineComponent, shallowRef, Slots, h } from 'vue';

function generateCheck(variant: ColorVariant) {
  return h('span', { class: [variant, 'check'] });
}

function generateInput(selectionControl: SelectionControl) {
  return h('input', {
    onChange: selectionControl.onChange,
    onBlur: selectionControl.onBlur,
    onFocus: selectionControl.onFocus,
    ...selectionControl.attrs.value
  });
}

function generateLabelText(selectionControl: SelectionControl, slots: Slots) {
  return h(
    'span',
    {
      class: 'control-label'
    },
    slots.default && slots.default()
  );
}

export function useSelectionControl(role: string, type: string, name: string, staticClass: string) {
  return <T>() =>
    defineComponent({
      name,
      props: getUseSelectablePropsDefinition<T>(),
      setup(props, { slots }) {
        const label = shallowRef((null as unknown) as HTMLElement);
        const selection = useControl(props as UseSelectableProps<T>, label, role, type);
        return () => {
          return h(
            'label',
            {
              class: [staticClass, props.size, { 'is-disabled': selection.isDisabled.value }],
              ref: label,
              id: selection.label.labelId.value,
              for: selection.label.id.value,
              disabled: selection.isDisabled.value || null,
              tabindex: selection.isDisabled.value ? -1 : 0,
              onKeydown: selection.onKeydown,
              onBlur: selection.onBlur,
              onClick: selection.onClick
            },
            [generateInput(selection), generateCheck(props.variant), generateLabelText(selection, slots)]
          );
        };
      }
    });
}
