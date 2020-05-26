import { Ref, ExtractPropTypes, shallowRef } from 'vue';
import { isString } from '../../utils/helpers';
import { useDisable, UseDisablePropsDefinition } from '../disable';
import { useFieldData } from '../fieldData';

export const UseValidationPropsDefinition = UseDisablePropsDefinition;

export type UseValidationProps = ExtractPropTypes<typeof UseValidationPropsDefinition>;

function isHtmlInputElement(el: HTMLElement): el is HTMLInputElement {
  const newEl = (el as unknown) as HTMLInputElement;
  return typeof newEl.checkValidity === 'function' && isString(newEl.validationMessage);
}

export function useValidation(props: UseValidationProps, ref: Ref<HTMLElement>) {
  const { setters } = useFieldData();
  const isDisabled = useDisable(props);
  const isValid = shallowRef(true);
  function validate() {
    if (!isDisabled.value) {
      if (isHtmlInputElement(ref.value)) {
        const el = ref.value;
        if (!el.checkValidity()) {
          setters.onNewVariant('is-danger');
          setters.onNewMessage(el.validationMessage);
          isValid.value = false;
        } else {
          setters.onNewVariant('');
          setters.onNewMessage('');
          isValid.value = true;
        }
      }
    }
  };
  return {
    isValid,
    validate
  }
}
