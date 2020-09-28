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
exports.useToggle = exports.getToggleAttrs = exports.getUseTogglePropsDefinition = void 0;
var vue_1 = require("vue");
var eventHelpers_1 = require("../../utils/eventHelpers");
function getUseTogglePropsDefinition(statusName) {
    var _a;
    return _a = {},
        _a[statusName] = {
            type: Boolean,
            "default": false
        },
        _a.hasPopup = {
            type: Boolean,
            "default": false
        },
        _a.onToggle = {
            type: Function,
            required: false
        },
        _a.onSetOn = {
            type: Function,
            required: false
        },
        _a.onSetOff = {
            type: Function,
            required: false
        },
        _a;
}
exports.getUseTogglePropsDefinition = getUseTogglePropsDefinition;
function getToggleAttrs(status, hasPopup) {
    return vue_1.computed(function () { return (__assign({ tabindex: 0, role: 'button', type: 'button', 'aria-pressed': status.value, 'aria-expanded': status.value }, (hasPopup.value ? { 'aria-haspopup': true } : {}))); });
}
exports.getToggleAttrs = getToggleAttrs;
function getListeners(toggle) {
    return {
        onClick: toggle,
        onKeydown: function (e) {
            if (eventHelpers_1.isEnterEvent(e)) {
                e.preventDefault();
                toggle();
            }
        }
    };
}
function useToggle(props, statusName) {
    var internalStatus = vue_1.shallowRef(props[statusName]);
    vue_1.watch(function () { return props[statusName]; }, function (status) {
        internalStatus.value = status;
    });
    vue_1.watch(internalStatus, function (value, oldValue) {
        if (value !== oldValue && props.onToggle) {
            props.onToggle(value);
        }
        if (value && oldValue === false && props.onSetOn) {
            props.onSetOn();
        }
        if (value === false && oldValue === true && props.onSetOff) {
            props.onSetOff();
        }
    });
    function setOn() {
        internalStatus.value = true;
    }
    function setOff() {
        internalStatus.value = false;
    }
    function toggle() {
        internalStatus.value = !internalStatus.value;
    }
    var attrs = getToggleAttrs(internalStatus, vue_1.toRef(props, 'hasPopup'));
    var listeners = getListeners(toggle);
    return {
        isOn: internalStatus,
        isOff: vue_1.computed(function () { return internalStatus.value === false; }),
        attrs: attrs,
        listeners: listeners,
        setOn: setOn,
        setOff: setOff,
        toggle: toggle
    };
}
exports.useToggle = useToggle;
