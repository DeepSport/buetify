"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.useValidation = exports.UseValidationPropsDefinition = void 0;
var function_1 = require("fp-ts/lib/function");
var vue_1 = require("vue");
var helpers_1 = require("../../utils/helpers");
var disable_1 = require("../disable");
var fieldData_1 = require("../fieldData");
exports.UseValidationPropsDefinition = __assign({ useNativeValidation: {
        type: Boolean,
        "default": true
    }, isValid: {
        type: Boolean,
        "default": true
    }, 'onUpdate:isValid': {
        type: Function,
        "default": function_1.constant(function_1.constVoid)
    } }, disable_1.UseDisablePropsDefinition);
function isHtmlInputElement(el) {
    var newEl = el;
    return typeof newEl.checkValidity === 'function' && helpers_1.isString(newEl.validationMessage);
}
function useValidation(props, ref) {
    var setters = fieldData_1.useFieldData().setters;
    var isDisabled = disable_1.useDisable(props);
    var isValid = vue_1.shallowRef(props.isValid);
    vue_1.watch(isValid, function (newValue) {
        props['onUpdate:isValid'](newValue);
    });
    function validate() {
        if (!isDisabled.value && props.useNativeValidation) {
            if (isHtmlInputElement(ref.value)) {
                var el = ref.value;
                if (!el.checkValidity()) {
                    setters.onNewVariant('is-danger');
                    setters.onNewMessage(el.validationMessage);
                    isValid.value = false;
                }
                else {
                    setters.onNewVariant('');
                    setters.onNewMessage('');
                    isValid.value = true;
                }
            }
        }
    }
    return {
        isDisabled: isDisabled,
        isValid: isValid,
        validate: validate
    };
}
exports.useValidation = useValidation;
