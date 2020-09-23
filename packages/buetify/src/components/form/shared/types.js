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
exports.getNumberInputIcons = exports.DEFAULT_NUMBER_INPUT_ICONS = exports.getInputIcons = exports.DEFAULT_INPUT_ICONS = void 0;
var vue_1 = require("vue");
exports.DEFAULT_INPUT_ICONS = {
    isSuccess: vue_1.defineAsyncComponent(function () { return Promise.resolve().then(function () { return require('../../icons/check'); }); }),
    isDanger: vue_1.defineAsyncComponent(function () { return Promise.resolve().then(function () { return require('../../icons/exclamationCircle'); }); }),
    isInfo: vue_1.defineAsyncComponent(function () { return Promise.resolve().then(function () { return require('../../icons/infoCircle'); }); }),
    isWarning: vue_1.defineAsyncComponent(function () { return Promise.resolve().then(function () { return require('../../icons/exclamationTriangle'); }); }),
    passwordInvisible: vue_1.defineAsyncComponent(function () { return Promise.resolve().then(function () { return require('../../icons/eye'); }); }),
    passwordVisible: vue_1.defineAsyncComponent(function () { return Promise.resolve().then(function () { return require('../../icons/eyeSlash'); }); })
};
function getInputIcons(icons) {
    return __assign(__assign({}, exports.DEFAULT_INPUT_ICONS), icons);
}
exports.getInputIcons = getInputIcons;
exports.DEFAULT_NUMBER_INPUT_ICONS = {
    minus: vue_1.defineAsyncComponent(function () { return Promise.resolve().then(function () { return require('../../icons/minus'); }); }),
    plus: vue_1.defineAsyncComponent(function () { return Promise.resolve().then(function () { return require('../../icons/plus'); }); })
};
function getNumberInputIcons(icons) {
    return __assign(__assign({}, exports.DEFAULT_NUMBER_INPUT_ICONS), icons);
}
exports.getNumberInputIcons = getNumberInputIcons;
