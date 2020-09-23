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
exports.useInput = exports.getUseInputPropsDefinition = exports.StaticUseInputProps = void 0;
var helpers_1 = require("../../utils/helpers");
var vue_1 = require("vue");
var fieldData_1 = require("../fieldData");
var focus_1 = require("../focus");
var model_1 = require("../model");
var toggle_1 = require("../toggle");
var validation_1 = require("../validation");
exports.StaticUseInputProps = __assign(__assign({ variant: {
        type: String,
        "default": 'is-primary'
    }, type: {
        type: String
    }, autocomplete: {
        type: String
    }, placeholder: {
        type: String
    }, size: {
        type: String,
        "default": ''
    }, isRequired: {
        type: Boolean,
        "default": true
    }, isExpanded: {
        type: Boolean,
        "default": false
    }, isLoading: {
        type: Boolean,
        "default": false
    }, isRounded: {
        type: Boolean,
        "default": false
    }, maxlength: {
        type: [Number, String]
    }, icon: null, usePasswordReveal: {
        type: Boolean,
        "default": false
    } }, validation_1.UseValidationPropsDefinition), focus_1.UseFocusPropsDefinition);
function getUseInputPropsDefinition() {
    return __assign(__assign({}, model_1.getUseModelPropsDefinition()), exports.StaticUseInputProps);
}
exports.getUseInputPropsDefinition = getUseInputPropsDefinition;
function getIconSize(size) {
    switch (size) {
        case 'is-small':
            return size;
        default:
            return '';
    }
}
function getMessageVariant(variant) {
    if (helpers_1.isString(variant)) {
        return variant;
    }
    else if (helpers_1.isObject(variant)) {
        return Object.values(variant)[0];
    }
    else {
        return undefined;
    }
}
function useInput(props, ref) {
    var fieldData = fieldData_1.useFieldData();
    var isExpanded = vue_1.computed(function () { return props.isExpanded || fieldData.attrs.isExpanded.value; });
    var model = model_1.useModel(props);
    var focus = focus_1.useFocus(props, ref);
    var validate = validation_1.useValidation(props, ref);
    vue_1.watch(model.modelValue, validate.validate);
    var iconSize = vue_1.computed(function () { return getIconSize(props.size); });
    var messageVariant = vue_1.computed(function () { return getMessageVariant(fieldData.attrs.messageVariant.value); });
    var passwordToggle = toggle_1.useToggle(vue_1.shallowReactive({ isVisible: false, hasPopup: false }), 'isVisible');
    var type = vue_1.shallowRef(props.type);
    vue_1.watch(vue_1.toRef(props, 'type'), function (newVal) {
        type.value = newVal;
    });
    vue_1.watch(passwordToggle.isOn, function (newVal) {
        type.value = newVal ? 'text' : 'password';
    });
    return __assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign({}, vue_1.toRefs(props)), fieldData.attrs), fieldData.setters), { isExpanded: isExpanded, isFullwidth: isExpanded, messageVariant: messageVariant, setters: fieldData.setters }), model), focus), validate), { iconSize: iconSize,
        type: type,
        passwordToggle: passwordToggle });
}
exports.useInput = useInput;
