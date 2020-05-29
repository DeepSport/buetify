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
        default: false,
        required: false
    }
};
export function useFocus(props, ref) {
    const isFocused = shallowRef(false);
    function focus() {
        if (isHTMLElement(ref.value)) {
            ref.value.focus();
            isFocused.value = true;
            if (props.onFocus)
                onFocus();
        }
        else {
            if (isHTMLElement(ref.value.el)) {
                ref.value.el.focus();
                isFocused.value = true;
                if (props.onFocus)
                    onFocus();
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
        if (props.onFocus)
            onFocus();
    }
    if (props.focusOnMount) {
        onMounted(focus);
    }
    function onBlur() {
        isFocused.value = false;
        if (props.onBlur)
            onBlur();
    }
    return {
        isFocused,
        focus,
        onFocus,
        onBlur
    };
}
//# sourceMappingURL=useFocus.js.map