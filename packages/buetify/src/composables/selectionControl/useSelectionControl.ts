import { Eq } from 'fp-ts/lib/Eq';
import { PropType, Ref, computed, toRef } from 'vue';
import { ColorVariant } from '../../types/ColorVariants';
import { SizeVariant } from '../../types/SizeVariants';
import { isEnterEvent, isSpaceEvent } from '../../utils/eventHelpers';
import { toggleListItem } from '../../utils/helpers';
import { useDisable, UseDisableProps, UseDisablePropsDefinition } from '../disable';
import { useFocus, UseFocusProps, UseFocusPropsDefinition } from '../focus';
import { useLabelId, UseLabelIdProps, UseLabelIdPropsDefinition } from '../labelId';
import { getUseModelPropsDefinition, useModel, UseModelProps } from '../model';
import { EqProps, getEqPropsDefinition } from '../shared';

export function getUseSelectablePropsDefinition<T>() {
  return {
    nativeValue: {
      type: (null as unknown) as PropType<unknown>,
      required: false,
      default: null
    },
    trueValue: {
      type: (null as unknown) as PropType<T>,
      default: (true as unknown) as T
    },
    falseValue: {
      type: (null as unknown) as PropType<T>,
      default: (false as unknown) as T
    },
    isIndeterminate: {
      type: Boolean as PropType<boolean>,
      default: false
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
    name: {
      type: String as PropType<string>,
      required: false
    },
    ...getEqPropsDefinition<T>(),
    ...getUseModelPropsDefinition<T>(),
    ...UseDisablePropsDefinition,
    ...UseLabelIdPropsDefinition,
    ...UseFocusPropsDefinition
  };
}

export type UseSelectableProps<T> = {
  nativeValue: unknown;
  trueValue: T;
  falseValue: T;
  indeterminateValue?: T;
  isMultiple: boolean;
  variant: ColorVariant;
  size: SizeVariant;
  isRequired: boolean;
  isIndeterminate: boolean;
  name?: string;
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
  return function onChange(e?: Event) {
    console.log(e);
    if (isDisabled.value) return;
    if (trueValue.value === undefined) return;
    const currentValue = value.value;
    const tValue = trueValue.value;
    const fValue = falseValue.value;

    if (isMultiple.value) {
      if (!Array.isArray(currentValue)) {
        value.value = [];
      } else {
        value.value = toggleListItem(eq.value)(tValue, currentValue) as T[];
      }
    } else if (!Array.isArray(currentValue)) {
      if (currentValue === undefined || (currentValue !== undefined && !eq.value.equals(currentValue, tValue))) {
        console.log('setting true value', tValue);
        value.value = tValue;
      } else {
        console.log('settings false value', fValue);
        value.value = fValue;
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
  trueValue: T,
  falseValue: T,
  nativeValue: unknown,
  isIndeterminate?: boolean,
  name?: string
) {
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

export function useSelectionControl<T>(
  props: UseSelectableProps<T>,
  ref: Ref<HTMLElement>,
  role: string,
  type: string
) {
  const { modelValue } = useModel<T>(props);
  const focus = useFocus((props as unknown) as UseFocusProps, ref);
  const label = useLabelId(props, role);
  const isMultiple = computed(() => props.isMultiple || Array.isArray(modelValue.value));
  const isActive = computed(() => getIsActive(modelValue.value, props.trueValue, isMultiple.value, props.eq));
  const isDisabled = useDisable(props);

  const onChange = getOnChange(
    modelValue,
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
      props.trueValue,
      props.falseValue,
      props.nativeValue,
      props.isIndeterminate,
      props.name
    )
  );

  function onKeydown(e: KeyboardEvent) {
    if (isEnterEvent(e) || isSpaceEvent(e)) {
      ref.value?.click();
    }
  }

  function onClick(e: MouseEvent) {
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

export type SelectionControl = ReturnType<typeof useSelectionControl>;
