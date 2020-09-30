import { Ref, VNode, shallowRef, PropType, ExtractPropTypes, onMounted, watchEffect } from 'vue';
import { isHTMLElement } from '../../utils/helpers';

export const UseFocusPropsDefinition = {
  isFocused: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  onFocus: {
    type: Function as PropType<(e?: Event) => void>,
    required: false as const
  },
  onBlur: {
    type: Function as PropType<(e?: Event) => void>,
    required: false as const
  },
  focusOnMount: {
    type: Boolean as PropType<boolean>,
    default: false
  }
};

export type UseFocusProps = ExtractPropTypes<typeof UseFocusPropsDefinition>;

export function useFocus(props: UseFocusProps, ref: Ref<HTMLElement | VNode>) {
  const isFocused: Ref<boolean> = shallowRef(false);
  function onFocus(e? : Event) {
    isFocused.value = true;
    if (props.onFocus) props.onFocus(e);
  }
  function focus(e?: Event) {
    if (isFocused.value) {
      return;
    }
    if (isHTMLElement(ref.value)) {
      ref.value.focus();
      isFocused.value = true;
      if (props.onFocus) props.onFocus(e);
    } else {
      if (ref.value && isHTMLElement(ref.value.el)) {
        ref.value.el.focus();
        isFocused.value = true;
        if (props.onFocus) props.onFocus(e);
      }
    }
  }
  watchEffect(() => {
    if (props.isFocused && isFocused.value === false) {
      focus();
    }
  });

  if (props.focusOnMount) {
    onMounted(focus);
  }

  function onBlur(e?: Event) {
    isFocused.value = false;
    if (props.onBlur) props.onBlur(e);
  }
  return {
    isFocused,
    focus,
    onFocus,
    onBlur
  };
}
