
import { AllColorsVariant } from '../../types/ColorVariants';
import { SizeVariant } from '../../types/SizeVariants';
import { isObject, isString } from '../../utils/helpers';
import { PropType, ExtractPropTypes, Ref, Component, computed, toRef } from 'vue';
import { useFieldData } from '../fieldData';
import { useFocus, UseFocusPropsDefinition } from '../focus';
import { getUseModelPropsDefinition, useModel, UseModelProps } from '../model';
import { useValidation, UseValidationPropsDefinition } from '../validation';

const StaticUseInputProps = {
  type: {
    type: String as PropType<string>
  },
  autocomplete: {
    type: String as PropType<string>
  },
  placeholder: {
    type: String as PropType<string>
  },
  size: {
    type: String as PropType<SizeVariant>
  },
  isRequired: {
    type: Boolean,
    default: true
  },
  isExpanded: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  isLoading: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  isRounded: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  maxLength: {
    type: [Number, String] as PropType<number | string>
  },
  icon: {
    type: Function as PropType<Component>
  },
  ...UseValidationPropsDefinition,
  ...UseFocusPropsDefinition
};

type StaticInputProps = ExtractPropTypes<typeof StaticUseInputProps>;

export function getUseInputPropsDefinition<T>() {
  return {
    ...getUseModelPropsDefinition<T>(),
    ...StaticUseInputProps
  };
}

export type UseInputProps<T> = UseModelProps<T> & StaticInputProps;

function getIconSize(size?: SizeVariant) {
  switch (size) {
    case 'is-small':
      return size;
    default:
      return '';
  }
}

function getMessageVariant(variant: undefined | AllColorsVariant | Partial<{ [K in AllColorsVariant]: boolean }>) {
  if (isString(variant)) {
    return variant;
  } else if (isObject(variant)) {
    return Object.values(variant)[0] as any;
  } else {
    return undefined;
  }
}

export function useInput<T>(props: UseInputProps<T>, ref: Ref<HTMLElement>) {
  const fieldData = useFieldData();
  const model = useModel(props);
  const focus = useFocus(props, ref);
  const validate = useValidation(props, ref);
  const iconSize = computed(() => getIconSize(props.size));
  const messageVariant = computed(() => getMessageVariant(fieldData.attrs.messageVariant.value));
  return {
    attrs: {
      ...fieldData.attrs,
      required: toRef(props, 'isRequired'),
      messageVariant
    },
    setters: fieldData.setters,
    ...model,
    ...focus,
    ...validate,
    iconSize
  };
}
