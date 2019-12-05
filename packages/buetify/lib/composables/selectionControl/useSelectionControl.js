import { computed, toRef } from 'vue';
import { isEnterEvent, isSpaceEvent } from '../../utils/eventHelpers';
import { toggleListItem } from '../../utils/helpers';
import { useDisable, UseDisablePropsDefinition } from '../disable';
import { useFocus, UseFocusPropsDefinition } from '../focus';
import { useLabelId, UseLabelIdPropsDefinition } from '../labelId';
import { getUseModelPropsDefinition, useModel } from '../model';
import { getEqPropsDefinition } from '../shared';
export function getUseSelectablePropsDefinition() {
  return {
    nativeValue: {
      type: null,
      required: false,
      default: null
    },
    trueValue: {
      type: null,
      default: true
    },
    falseValue: {
      type: null,
      default: false
    },
    isIndeterminate: {
      type: Boolean,
      default: false
    },
    isMultiple: {
      type: Boolean,
      default: false
    },
    variant: {
      type: String,
      default: 'is-primary'
    },
    size: {
      type: String,
      default: ''
    },
    isRequired: {
      type: Boolean,
      default: false
    },
    name: {
      type: String,
      required: false
    },
    ...getEqPropsDefinition(),
    ...getUseModelPropsDefinition(),
    ...UseDisablePropsDefinition,
    ...UseLabelIdPropsDefinition,
    ...UseFocusPropsDefinition
  };
}

function getIsActive(value, trueValue, isMultiple, eq) {
  if (isMultiple) {
    if (!Array.isArray(value)) return false;
    return trueValue !== undefined && value.some(item => eq.equals(item, trueValue));
  }

  if (!Array.isArray(value) && trueValue !== undefined) {
    return value !== undefined && eq.equals(value, trueValue);
  }

  return false;
}

function getOnChange(value, trueValue, falseValue, isDisabled, isMultiple, eq) {
  return function onChange(e) {
    if (isDisabled.value) return;
    if (trueValue.value === undefined) return;
    const currentValue = value.value;
    const tValue = trueValue.value;
    const fValue = falseValue.value;

    if (isMultiple.value) {
      if (!Array.isArray(currentValue)) {
        value.value = [];
      } else {
        value.value = toggleListItem(eq.value)(tValue, currentValue);
      }
    } else if (!Array.isArray(currentValue)) {
      if (currentValue === undefined || currentValue !== undefined && !eq.value.equals(currentValue, tValue)) {
        value.value = tValue;
      } else {
        value.value = fValue;
      }
    }
  };
}

function getInputAttrs(role, type, id, labelId, isActive, isDisabled, isReadonly, isRequired, trueValue, falseValue, nativeValue, isIndeterminate, name) {
  return {
    role,
    type,
    id,
    name,
    checked: isActive,
    'aria-checked': isActive,
    'aria-disabled': isDisabled,
    'aria-labelledby': labelId,
    tabindex: -1,
    readonly: isReadonly,
    disabled: isDisabled,
    required: isRequired,
    indeterminate: isIndeterminate,
    value: JSON.stringify(nativeValue),
    'true-value': JSON.stringify(trueValue),
    'false-value': JSON.stringify(falseValue)
  };
}

export function useSelectionControl(props, ref, role, type) {
  const {
    modelValue
  } = useModel(props);
  const focus = useFocus(props, ref);
  const trueValue = computed(() => props.nativeValue || props.trueValue);
  const label = useLabelId(props, role);
  const isMultiple = computed(() => props.isMultiple || Array.isArray(modelValue.value));
  const isActive = computed(() => getIsActive(modelValue.value, trueValue.value, isMultiple.value, props.eq));
  const isDisabled = useDisable(props);
  const onChange = getOnChange(modelValue, trueValue, toRef(props, 'falseValue'), isDisabled, isMultiple, toRef(props, 'eq'));
  const attrs = computed(() => getInputAttrs(role, type, label.id.value, label.labelId.value, isActive.value, isDisabled.value, props.isReadonly, props.isRequired, props.trueValue, props.falseValue, props.nativeValue, props.isIndeterminate, props.name));

  function onKeydown(e) {
    if (isEnterEvent(e) || isSpaceEvent(e)) {
      ref.value?.click();
    }
  }

  function onClick(e) {
    focus.focus();
  }

  return {
    modelValue,
    ...focus,
    isDisabled,
    isMultiple,
    isActive,
    attrs,
    onChange,
    onKeydown,
    onClick,
    label
  };
}
//# sourceMappingURL=useSelectionControl.js.map