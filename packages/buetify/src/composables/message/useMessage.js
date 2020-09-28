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
exports.useMessage = exports.UseMessagePropsDefinition = exports.getMessageIcons = void 0;
var function_1 = require("fp-ts/lib/function");
var vue_1 = require("vue");
var toggle_1 = require("../toggle");
var DEFAULT_MESSAGE_ICONS = {
    'is-info': vue_1.defineAsyncComponent(function () { return Promise.resolve().then(function () { return require('../../components/icons/infoCircle'); }); }),
    'is-success': vue_1.defineAsyncComponent(function () { return Promise.resolve().then(function () { return require('../../components/icons/checkCircle'); }); }),
    'is-warning': vue_1.defineAsyncComponent(function () { return Promise.resolve().then(function () { return require('../../components/icons/exclamationTriangle'); }); }),
    'is-danger': vue_1.defineAsyncComponent(function () { return Promise.resolve().then(function () { return require('../../components/icons/exclamationCircle'); }); })
};
function getMessageIcons(icons) {
    return __assign(__assign({}, DEFAULT_MESSAGE_ICONS), icons);
}
exports.getMessageIcons = getMessageIcons;
exports.UseMessagePropsDefinition = __assign(__assign({}, toggle_1.getUseTogglePropsDefinition('isActive')), { title: {
        type: String
    }, isClosable: {
        type: Boolean,
        "default": true
    }, message: {
        type: String
    }, variant: {
        type: String,
        "default": ''
    }, size: {
        type: String,
        "default": ''
    }, iconSize: {
        type: String,
        "default": ''
    }, useAutoClose: {
        type: Boolean,
        "default": false
    }, duration: {
        type: Number,
        "default": 2000
    }, useIcon: {
        type: Boolean,
        "default": false
    }, icons: {
        type: Object,
        "default": function_1.constant(DEFAULT_MESSAGE_ICONS)
    } });
function useMessage(props) {
    var toggle = toggle_1.useToggle(props, 'isActive');
    var icon = vue_1.computed(function () { return props.icons[props.variant]; });
    var iconSize = vue_1.computed(function () { return props.iconSize || props.size || 'is-large'; });
    function setAutoClose() {
        if (props.useAutoClose) {
            setTimeout(function () {
                if (toggle.isOn.value) {
                    toggle.setOff();
                }
            }, props.duration);
        }
    }
    return __assign(__assign({}, toggle), { icon: icon,
        iconSize: iconSize,
        setAutoClose: setAutoClose });
}
exports.useMessage = useMessage;
