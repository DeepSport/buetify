"use strict";
exports.__esModule = true;
exports.useFocus = exports.UseFocusPropsDefinition = void 0;
var vue_1 = require("vue");
var helpers_1 = require("../../utils/helpers");
exports.UseFocusPropsDefinition = {
    isFocused: {
        type: Boolean,
        "default": false
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
        "default": false
    }
};
function useFocus(props, ref) {
    var isFocused = vue_1.shallowRef(false);
    function onFocus() {
        isFocused.value = true;
        if (props.onFocus)
            props.onFocus();
    }
    function focus() {
        if (isFocused.value || props.isFocused === false) {
            return;
        }
        if (helpers_1.isHTMLElement(ref.value)) {
            ref.value.focus();
            isFocused.value = true;
            if (props.onFocus)
                props.onFocus();
        }
        else {
            if (ref.value && helpers_1.isHTMLElement(ref.value.el)) {
                ref.value.el.focus();
                isFocused.value = true;
                if (props.onFocus)
                    props.onFocus();
            }
        }
    }
    vue_1.watchEffect(function () {
        if (props.isFocused && isFocused.value === false) {
            focus();
        }
    });
    if (props.focusOnMount) {
        vue_1.onMounted(focus);
    }
    function onBlur() {
        isFocused.value = false;
        if (props.onBlur)
            props.onBlur();
    }
    return {
        isFocused: isFocused,
        focus: focus,
        onFocus: onFocus,
        onBlur: onBlur
    };
}
exports.useFocus = useFocus;
