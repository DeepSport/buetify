import { isObject, isString } from '../../utils/helpers';
import { computed, toRefs, watch, shallowRef, toRef, reactive } from 'vue';
import { useFieldData } from '../fieldData';
import { useFocus, UseFocusPropsDefinition } from '../focus';
import { getUseModelPropsDefinition, useModel } from '../model';
import { useToggle } from '../toggle';
import { useValidation, UseValidationPropsDefinition } from '../validation';
export const StaticUseInputProps = {
  variant: {
    type: String,
    default: ''
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
    default: false
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
  icon: null,
  usePasswordReveal: {
    type: Boolean,
    default: undefined
  },
  ...UseValidationPropsDefinition,
  ...UseFocusPropsDefinition
};
export function getUseInputPropsDefinition() {
  return { ...getUseModelPropsDefinition(),
    ...StaticUseInputProps
  };
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
  const validate = useValidation(props, ref);
  const focus = useFocus(reactive({
    isFocused: toRef(props, 'isFocused'),
    onFocus: toRef(props, 'onFocus'),
    focusOnMount: toRef(props, 'focusOnMount'),
    onBlur: e => {
      if (props.onBlur) {
        props.onBlur(e);
      }

      validate.validate();
    }
  }), ref); // watch(model.modelValue, (newVal, oldVal) => {
  //   if (newVal !== oldVal) {
  //     validate.validate()
  //   }
  // });

  const iconSize = computed(() => getIconSize(props.size));
  const messageVariant = computed(() => getMessageVariant(fieldData.attrs.messageVariant.value));
  const passwordToggle = useToggle({
    isVisible: false,
    hasPopup: false
  }, 'isVisible');
  const type = shallowRef(props.type);
  const usePasswordReveal = computed(() => {
    return props.type === 'password' && (props.usePasswordReveal === undefined || props.usePasswordReveal);
  });
  watch(toRef(props, 'type'), newVal => {
    type.value = newVal;
  });
  watch(passwordToggle.isOn, newVal => {
    type.value = newVal ? 'text' : 'password';
  });
  return { ...toRefs(props),
    ...fieldData.attrs,
    ...fieldData.setters,
    isExpanded,
    isFullwidth: isExpanded,
    messageVariant,
    setters: fieldData.setters,
    ...model,
    ...focus,
    ...validate,
    iconSize,
    type,
    passwordToggle,
    usePasswordReveal
  };
}
//# sourceMappingURL=useInput.js.map