import { shallowRef, onMounted, watchEffect } from 'vue';
import { isHTMLElement } from '../../utils/helpers';
export const UseFocusPropsDefinition = {
  isFocused: {
    type: Boolean,
    default: false
  },
  onFocus: {
    type: Function,
    required: false
  },
  onBlur: {
    type: Function,
    required: false
  },
  focusOnMount: {
    type: Boolean,
    default: false
  }
};
export function useFocus(props, ref) {
  const isFocused = shallowRef(false);

  function onFocus(e) {
    isFocused.value = true;
    if (props.onFocus) props.onFocus(e);
  }

  function focus(e) {
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

  function onBlur(e) {
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
//# sourceMappingURL=useFocus.js.map