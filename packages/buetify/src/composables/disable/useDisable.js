"use strict";
exports.__esModule = true;
exports.useDisable = exports.UseDisablePropsDefinition = void 0;
var vue_1 = require("vue");
exports.UseDisablePropsDefinition = {
    isDisabled: {
        type: Boolean,
        required: false,
        "default": false
    },
    isReadonly: {
        type: Boolean,
        required: false,
        "default": false
    },
    disableIfReadonly: {
        type: Boolean,
        required: false,
        "default": false
    }
};
function useDisable(props) {
    return vue_1.computed(function () { return props.isDisabled || (props.isReadonly && props.disableIfReadonly); });
}
exports.useDisable = useDisable;
