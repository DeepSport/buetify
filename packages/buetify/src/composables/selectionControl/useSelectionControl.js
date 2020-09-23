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
exports.useSelectionControl = exports.getUseSelectablePropsDefinition = void 0;
var vue_1 = require("vue");
var eventHelpers_1 = require("../../utils/eventHelpers");
var helpers_1 = require("../../utils/helpers");
var disable_1 = require("../disable");
var focus_1 = require("../focus");
var labelId_1 = require("../labelId");
var model_1 = require("../model");
var shared_1 = require("../shared");
function getUseSelectablePropsDefinition() {
    return __assign(__assign(__assign(__assign(__assign({ trueValue: {
            type: null,
            "default": true
        }, falseValue: {
            type: null,
            "default": false
        }, indeterminateValue: {
            type: null
        }, isMultiple: {
            type: Boolean,
            "default": false
        }, variant: {
            type: String,
            "default": 'is-primary'
        }, size: {
            type: String,
            "default": ''
        }, isRequired: {
            type: Boolean,
            "default": false
        } }, shared_1.getEqPropsDefinition()), model_1.getUseModelPropsDefinition()), disable_1.UseDisablePropsDefinition), labelId_1.UseLabelIdPropsDefinition), focus_1.UseFocusPropsDefinition);
}
exports.getUseSelectablePropsDefinition = getUseSelectablePropsDefinition;
function getIsActive(value, trueValue, isMultiple, eq) {
    if (isMultiple) {
        if (!Array.isArray(value))
            return false;
        return trueValue !== undefined && value.some(function (item) { return eq.equals(item, trueValue); });
    }
    if (!Array.isArray(value) && trueValue !== undefined) {
        return value !== undefined && eq.equals(value, trueValue);
    }
    return false;
}
function getOnChange(value, trueValue, falseValue, isDisabled, isMultiple, eq) {
    return function onChange() {
        if (isDisabled.value)
            return;
        if (trueValue.value === undefined)
            return;
        var currentValue = value.value;
        var tValue = trueValue.value;
        if (isMultiple.value) {
            if (!Array.isArray(currentValue)) {
                value.value = [];
            }
            else {
                value.value = helpers_1.toggleListItem(eq.value)(tValue, currentValue);
            }
        }
        else if (!Array.isArray(currentValue)) {
            if (currentValue === undefined || (currentValue !== undefined && !eq.value.equals(currentValue, tValue))) {
                value.value = trueValue.value;
            }
            else {
                value.value = falseValue.value;
            }
        }
    };
}
function getInputAttrs(role, type, id, labelId, isActive, isDisabled, isReadonly, isRequired, value, trueValue, falseValue) {
    return {
        role: role,
        type: type,
        id: id,
        value: value,
        checked: isActive,
        'aria-checked': isActive,
        'aria-disabled': isDisabled,
        'aria-labelledby': labelId,
        tabindex: -1,
        readonly: isReadonly,
        disabled: isDisabled,
        required: isRequired,
        'true-value': JSON.stringify(trueValue),
        'false-value': JSON.stringify(falseValue)
    };
}
function useSelectionControl(props, ref, role, type) {
    var modelValue = model_1.useModel(props).modelValue;
    var focus = focus_1.useFocus(props, ref);
    var label = labelId_1.useLabelId(props, role);
    var isMultiple = vue_1.computed(function () { return props.isMultiple || Array.isArray(modelValue.value); });
    var isActive = vue_1.computed(function () { return getIsActive(modelValue.value, props.trueValue, isMultiple.value, props.eq); });
    var isDisabled = disable_1.useDisable(props);
    var onChange = getOnChange(modelValue, vue_1.toRef(props, 'trueValue'), vue_1.toRef(props, 'falseValue'), isDisabled, isMultiple, vue_1.toRef(props, 'eq'));
    var attrs = vue_1.computed(function () {
        return getInputAttrs(role, type, label.id.value, label.labelId.value, isActive.value, isDisabled.value, props.isReadonly, props.isRequired, modelValue.value, props.trueValue, props.falseValue);
    });
    function onKeydown(e) {
        if (eventHelpers_1.isEnterEvent(e) || eventHelpers_1.isSpaceEvent(e)) {
            onChange();
        }
    }
    function onClick(e) {
        e.preventDefault();
        e.stopPropagation();
        onChange();
    }
    return __assign(__assign({ modelValue: modelValue }, focus), { isDisabled: isDisabled,
        isMultiple: isMultiple,
        isActive: isActive,
        attrs: attrs,
        onChange: onChange,
        onKeydown: onKeydown,
        onClick: onClick,
        label: label });
}
exports.useSelectionControl = useSelectionControl;
