import { Eq } from 'fp-ts/lib/Eq';
import { PropType, Ref, computed, toRef } from 'vue';
import { ColorVariant } from '../../types/ColorVariants';
import { SizeVariant } from '../../types/SizeVariants';
import { isEnterEvent, isSpaceEvent } from '../../utils/eventHelpers';
import { toggleListItem } from '../../utils/helpers';
import { useDisable, UseDisableProps, UseDisablePropsDefinition } from '../disable';
import {useFocus, UseFocusProps, UseFocusPropsDefinition} from '../focus';
import { useLabelId, UseLabelIdProps, UseLabelIdPropsDefinition } from '../labelId';
import { getUseModelPropsDefinition, useModel, UseModelProps } from '../model';
import { EqProps, getEqPropsDefinition } from '../shared';

export function getUseSelectablePropsDefinition<T>() {
  return {
    trueValue: {
      type: null as unknown as PropType<T>,
      default: true as unknown as T
    },
    falseValue: {
      type: null as unknown as PropType<T>,
      default: false as unknown as T
    },
    indeterminateValue: {
      type: null as unknown as PropType<T>,
    },
    isMultiple: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    variant: {
      type: String as PropType<ColorVariant>,
      default: 'is-primary' as ColorVariant
    },
    size: {
      type: String as PropType<SizeVariant>,
      default: '' as SizeVariant
    },
    isRequired: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    ...getEqPropsDefinition<T>(),
    ...getUseModelPropsDefinition<T>(),
    ...UseDisablePropsDefinition,
    ...UseLabelIdPropsDefinition,
    ...UseFocusPropsDefinition
  };
}

export type UseSelectableProps<T> = {
  trueValue: T;
  falseValue: T;
  indeterminateValue?: T;
  isMultiple: boolean;
  variant: ColorVariant;
  size: SizeVariant;
  isRequired: boolean;
} & EqProps<T> &
  UseModelProps<T> &
  UseDisableProps &
  UseLabelIdProps;

function getIsActive<T>(value: T | T[] | undefined, trueValue: T | undefined, isMultiple: boolean, eq: Eq<T>): boolean {
  if (isMultiple) {
    if (!Array.isArray(value)) return false;
    return trueValue !== undefined && value.some(item => eq.equals(item, trueValue));
  }
  if (!Array.isArray(value) && trueValue !== undefined) {
    return value !== undefined && eq.equals(value, trueValue);
  }
  return false;
}

function getOnChange<T>(
  value: Ref<T | T[] | undefined>,
  trueValue: Ref<T | undefined>,
  falseValue: Ref<T | undefined>,
  isDisabled: Ref<boolean>,
  isMultiple: Ref<boolean>,
  eq: Ref<Eq<T>>
) {
  return function onChange() {
    if (isDisabled.value) return;
    if (trueValue.value === undefined) return;
    const currentValue = value.value;
    const tValue = trueValue.value;

    if (isMultiple.value) {
      if (!Array.isArray(currentValue)) {
        value.value = [];
      } else {
        value.value = toggleListItem(eq.value)(tValue, currentValue) as T[];
      }
    } else if (!Array.isArray(currentValue)) {
      if (currentValue === undefined || (currentValue !== undefined && !eq.value.equals(currentValue, tValue))) {
        value.value = trueValue.value;
      } else {
        value.value = falseValue.value;
      }
    }
  };
}

function getInputAttrs<T>(
  role: string,
  type: string,
  id: string,
  labelId: string,
  isActive: boolean,
  isDisabled: boolean,
  isReadonly: boolean,
  isRequired: boolean,
  value: T,
  trueValue: T,
  falseValue: T
) {
  return {
    role,
    type,
    id,
    value,
    checked: isActive,
    'aria-checked': isActive,
    'aria-disabled': isDisabled,
    'aria-labelledby': labelId,
    tabindex: -1,
    readonly: isReadonly,
    disabled: isDisabled,
    required: isRequired,
    'true-value': JSON.stringify(trueValue),
    'false-value': JSON.stringify(falseValue)
  };
}

export function useSelectionControl<T>(
  props: UseSelectableProps<T>,
  ref: Ref<HTMLElement>,
  role: string,
  type: string
) {
  const { value } = useModel<T>(props);
  const focus = useFocus(props as unknown as UseFocusProps, ref);
  const label = useLabelId(props, role);
  const isActive = computed(() => getIsActive(value.value, props.trueValue, isMultiple.value, props.eq));
  const isDisabled = computed(() => useDisable(props).value || (type === 'radio' && isActive.value));
  const isMultiple = computed(() => props.isMultiple || Array.isArray(value.value));

  const onChange = getOnChange(
    value,
    toRef(props, 'trueValue'),
    toRef(props, 'falseValue'),
    isDisabled,
    isMultiple,
    toRef(props, 'eq')
  );

  const attrs = computed(() =>
    getInputAttrs(
      role,
      type,
      label.id.value,
      label.labelId.value,
      isActive.value,
      isDisabled.value,
      props.isReadonly,
      props.isRequired,
      value.value,
      props.trueValue,
      props.falseValue
    )
  );

  function onKeydown(e: KeyboardEvent) {
    if (isEnterEvent(e) || isSpaceEvent(e)) {
      onChange();
    }
  }

  function onClick(e: MouseEvent) {
    e.preventDefault();
    onChange();
  }

  return {
    value,
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

export type SelectionControl = ReturnType<typeof useSelectionControl>;
