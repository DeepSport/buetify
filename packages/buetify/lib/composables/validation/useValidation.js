import { constant, constVoid } from 'fp-ts/lib/function';
import { shallowRef, watch } from 'vue';
import { isString } from '../../utils/helpers';
import { useDisable, UseDisablePropsDefinition } from '../disable';
import { useFieldData } from '../fieldData';
export const UseValidationPropsDefinition = {
  useNativeValidation: {
    type: Boolean,
    default: true
  },
  isValid: {
    type: Boolean,
    default: true
  },
  'onUpdate:isValid': {
    type: Function,
    default: constant(constVoid)
  },
  ...UseDisablePropsDefinition
};

function isHtmlInputElement(el) {
  const newEl = el;
  return el && typeof newEl.checkValidity === 'function' && isString(newEl.validationMessage);
}

export function useValidation(props, ref) {
  const {
    setters
  } = useFieldData();
  const isDisabled = useDisable(props);
  const isValid = shallowRef(props.isValid);
  watch(isValid, newValue => {
    props['onUpdate:isValid'](newValue);
  });

  function validate() {
    if (!isDisabled.value && props.useNativeValidation) {
      if (isHtmlInputElement(ref.value)) {
        const el = ref.value;

        if (!el.checkValidity()) {
          setters.onNewVariant('is-danger');
          setters.onNewMessage(el.validationMessage);
          isValid.value = false;
        } else {
          setters.onNewVariant('is-success');
          setters.onNewMessage('');
          isValid.value = true;
        }
      }
    }
  }

  return {
    isDisabled,
    isValid,
    validate
  };
}
//# sourceMappingURL=useValidation.js.map