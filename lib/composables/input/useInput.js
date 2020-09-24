import { isObject, isString } from '../../utils/helpers';
import { computed, toRefs, watch } from 'vue';
import { useFieldData } from '../fieldData';
import { useFocus, UseFocusPropsDefinition } from '../focus';
import { getUseModelPropsDefinition, useModel } from '../model';
import { useValidation, UseValidationPropsDefinition } from '../validation';
export const StaticUseInputProps = Object.assign(Object.assign({
  variant: {
    type: String,
    default: 'is-primary'
  },
  type: {
    type: String
  },
  autocomplete: {
    type: String
  },
  placeholder: {
    type: String
  },
  size: {
    type: String,
    default: ''
  },
  isRequired: {
    type: Boolean,
    default: true
  },
  isExpanded: {
    type: Boolean,
    default: false
  },
  isLoading: {
    type: Boolean,
    default: false
  },
  isRounded: {
    type: Boolean,
    default: false
  },
  maxlength: {
    type: [Number, String]
  },
  icon: {
    type: Function
  },
  usePasswordReveal: {
    type: Boolean,
    default: false
  }
}, UseValidationPropsDefinition), UseFocusPropsDefinition);
export function getUseInputPropsDefinition() {
  return Object.assign(Object.assign({}, getUseModelPropsDefinition()), StaticUseInputProps);
}

function getIconSize(size) {
  switch (size) {
    case 'is-small':
      return size;

    default:
      return '';
  }
}

function getMessageVariant(variant) {
  if (isString(variant)) {
    return variant;
  } else if (isObject(variant)) {
    return Object.values(variant)[0];
  } else {
    return undefined;
  }
}

export function useInput(props, ref) {
  const fieldData = useFieldData();
  const isExpanded = computed(() => props.isExpanded || fieldData.attrs.isExpanded.value);
  const model = useModel(props);
  const focus = useFocus(props, ref);
  const validate = useValidation(props, ref);
  watch(model.modelValue, validate.validate);
  const iconSize = computed(() => getIconSize(props.size));
  const messageVariant = computed(() => getMessageVariant(fieldData.attrs.messageVariant.value));
  return Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, toRefs(props)), fieldData.attrs), fieldData.setters), {
    isExpanded,
    isFullwidth: isExpanded,
    messageVariant,
    setters: fieldData.setters
  }), model), focus), validate), {
    iconSize
  });
}
//# sourceMappingURL=useInput.js.map