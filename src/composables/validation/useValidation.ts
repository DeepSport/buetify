import { constant, constVoid, FunctionN } from 'fp-ts/lib/function';
import { Ref, ExtractPropTypes, shallowRef, PropType, watch } from 'vue';
import { isString } from '../../utils/helpers';
import { useDisable, UseDisablePropsDefinition } from '../disable';
import { useFieldData } from '../fieldData';

export const UseValidationPropsDefinition = {
  useNativeValidation: {
    type: Boolean as PropType<boolean>,
    default: true
  },
  isValid: {
    type: Boolean as PropType<boolean>,
    default: true
  },
  'onUpdate:isValid': {
    type: Function as PropType<FunctionN<[boolean], void>>,
    default: constant(constVoid)
  },
  ...UseDisablePropsDefinition
};

export type UseValidationProps = ExtractPropTypes<typeof UseValidationPropsDefinition>;

function isHtmlInputElement(el: HTMLElement): el is HTMLInputElement {
  const newEl = (el as unknown) as HTMLInputElement;
  return el && typeof newEl.checkValidity === 'function' && isString(newEl.validationMessage);
}

export function useValidation(props: UseValidationProps, ref: Ref<HTMLElement>) {
  const { setters } = useFieldData();
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
