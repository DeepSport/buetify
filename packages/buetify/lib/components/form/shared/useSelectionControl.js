import { getUseSelectablePropsDefinition, useSelectionControl as useControl } from '../../../composables/selectionControl/useSelectionControl';
import { defineComponent, shallowRef, h } from 'vue';

function generateCheck(variant) {
  return h('span', {
    class: [variant, 'check']
  });
}

function generateInput(selectionControl) {
  return h('input', {
    onChange: selectionControl.onChange,
    onBlur: selectionControl.onBlur,
    onFocus: selectionControl.onFocus,
    ...selectionControl.attrs.value
  });
}

function generateLabelText(selectionControl, slots) {
  return h('span', {
    class: 'control-label'
  }, slots.default && slots.default());
}

export function useSelectionControl(role, type, name, staticClass) {
  return () => defineComponent({
    name,
    props: getUseSelectablePropsDefinition(),

    setup(props, {
      slots
    }) {
      const label = shallowRef(null);
      const selection = useControl(props, label, role, type);
      return () => {
        return h('label', {
          class: [staticClass, props.size, {
            'is-disabled': selection.isDisabled.value
          }],
          ref: label,
          id: selection.label.labelId.value,
          for: selection.label.id.value,
          disabled: selection.isDisabled.value || null,
          tabindex: selection.isDisabled.value ? -1 : 0,
          onKeydown: selection.onKeydown,
          onBlur: selection.onBlur,
          onClick: selection.onClick
        }, [generateInput(selection), generateCheck(props.variant), generateLabelText(selection, slots)]);
      };
    }

  });
}
//# sourceMappingURL=useSelectionControl.js.map