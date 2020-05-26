import { IO } from 'fp-ts/lib/IO';
import { Ref, VNode, shallowRef, PropType, ExtractPropTypes } from 'vue';
import { isHTMLElement } from '../../utils/helpers';

export const UseFocusPropsDefinition = {
  onFocus: {
    type: Function as PropType<IO<void>>,
    required: false
  },
  onBlur: {
    type: Function as PropType<IO<void>>,
    required: false
  }
};

export type UseFocusProps = ExtractPropTypes<typeof UseFocusPropsDefinition>;

export function useFocus(props: UseFocusProps, ref: Ref<HTMLElement | VNode>) {
  const isFocused = shallowRef(false);
  function onFocus() {
    if (isHTMLElement(ref.value)) {
      ref.value.focus();
      isFocused.value = true;
      if (props.onFocus) onFocus();
    } else {
      if (isHTMLElement(ref.value.el)) {
        ref.value.el.focus();
        isFocused.value = true;
      }
    }
  }
  function onBlur() {
    isFocused.value = false;
    if (props.onBlur) onBlur();
  }
  return {
    isFocused,
    onFocus,
    onBlur
  };
}
