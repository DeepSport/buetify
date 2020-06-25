import {
  getUseSelectablePropsDefinition,
  SelectionControl,
  UseSelectableProps,
  useSelectionControl
} from '../../../composables/selectionControl/useSelectionControl';
import { ColorVariant } from '../../../types/ColorVariants';
import { defineComponent, shallowRef, Slots, h } from 'vue';

function generateCheck(variant: ColorVariant) {
  return h('span', { class: [variant, 'check'] });
}

function generateInput(selectionControl: SelectionControl) {
  return h('input', {
    ...selectionControl.attrs.value,
    onBlur: selectionControl.onBlur,
    onChange: selectionControl.onChange,
    onFocus: selectionControl.onFocus
  });
}

function generateLabelText(selectionControl: SelectionControl, slots: Slots) {
  return h(
    'span',
    {
      class: 'control-label'
    },
    slots.default ? slots.default() : selectionControl.label.labelId.value
  );
}

export function getSelectionControl(role: string, type: string, name: string, staticClass: string) {
  return <T>() =>
    defineComponent({
      name,
      props: getUseSelectablePropsDefinition<T>(),
      setup(props, { slots }) {
        const label = shallowRef((null as unknown) as HTMLElement);
        const selection = useSelectionControl(props as UseSelectableProps<T>, label, role, type);
        return () => {
          return h(
            'label',
            {
              class: [staticClass, props.size, { 'is-disabled': selection.isDisabled.value }],
              ref: label,
              id: selection.label.labelId.value,
              for: selection.label.id.value,
              disabled: selection.isDisabled.value,
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
