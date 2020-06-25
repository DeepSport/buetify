import { IO } from 'fp-ts/lib/IO';
import { Ref, VNode, shallowRef, PropType, ExtractPropTypes, onMounted, watchEffect } from 'vue';
import { isHTMLElement } from '../../utils/helpers';

export const UseFocusPropsDefinition = {
  isFocused: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  onFocus: {
    type: Function as PropType<IO<void>>,
    required: false as const
  },
  onBlur: {
    type: Function as PropType<IO<void>>,
    required: false as const
  },
  focusOnMount: {
    type: Boolean as PropType<boolean>,
    default: false
  }
};

export type UseFocusProps = ExtractPropTypes<typeof UseFocusPropsDefinition>;

export function useFocus(props: UseFocusProps, ref: Ref<HTMLElement | VNode>) {
  const isFocused = shallowRef(false);
  function focus() {
    if (isHTMLElement(ref.value)) {
      ref.value.focus();
      isFocused.value = true;
      if (props.onFocus) onFocus();
    } else {
      if (isHTMLElement(ref.value.el)) {
        ref.value.el.focus();
        isFocused.value = true;
        if (props.onFocus) onFocus();
      }
    }
  }
  watchEffect(() => {
    if (props.isFocused && isFocused.value === false) {
      focus();
    }
  });
  function onFocus() {
    isFocused.value = true;
    if (props.onFocus) onFocus();
  }

  if (props.focusOnMount) {
    onMounted(focus);
  }

  function onBlur() {
    isFocused.value = false;
    if (props.onBlur) onBlur();
  }
  return {
    isFocused,
    focus,
    onFocus,
    onBlur
  };
}
