import { AllColorsVariant, ColorVariant } from '../../types/ColorVariants';
import { SizeVariant } from '../../types/SizeVariants';
import { isObject, isString } from '../../utils/helpers';
import { PropType, ExtractPropTypes, Ref, computed, toRefs, watch } from 'vue';
import { useFieldData } from '../fieldData';
import { useFocus, UseFocusPropsDefinition } from '../focus';
import { getUseModelPropsDefinition, useModel, UseModelProps } from '../model';
import { useValidation, UseValidationPropsDefinition } from '../validation';

const StaticUseInputProps = {
  variant: {
    type: String as PropType<ColorVariant>,
    default: 'is-primary' as const
  },
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
    type: String as PropType<SizeVariant>,
    default: '' as SizeVariant
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
  maxlength: {
    type: [Number, String] as PropType<number | string>
  },
  icon: {
    type: Function as PropType<any>
  },
  usePasswordReveal: {
    type: Boolean as PropType<boolean>,
    default: false
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
  const isExpanded = computed(() => props.isExpanded || fieldData.attrs.isExpanded.value);
  const model = useModel(props);
  const focus = useFocus(props, ref);
  const validate = useValidation(props, ref);
  watch(model.value, validate.validate);
  const iconSize = computed(() => getIconSize(props.size));
  const messageVariant = computed(() => getMessageVariant(fieldData.attrs.messageVariant.value));
  return {
    ...toRefs(props),
    ...fieldData.attrs,
    ...fieldData.setters,
    isExpanded,
    isFullwidth: isExpanded,
    messageVariant,
    setters: fieldData.setters,
    ...model,
    ...focus,
    ...validate,
    iconSize
  };
}

export type Input = ReturnType<typeof useInput>;
