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
exports.createJavascriptTransitionGroup = exports.createJavascriptTransition = void 0;
var vue_1 = require("vue");
function createJavascriptTransition(name, functions, mode) {
    if (mode === void 0) { mode = 'in-out'; }
    return function (props, _a) {
        var _b;
        var attrs = _a.attrs, slots = _a.slots;
        return vue_1.h(vue_1.Transition, __assign(__assign({ mode: (_b = props.mode) !== null && _b !== void 0 ? _b : mode }, functions), attrs), slots["default"]);
    };
}
exports.createJavascriptTransition = createJavascriptTransition;
function createJavascriptTransitionGroup(name, functions, mode) {
    if (mode === void 0) { mode = 'in-out'; }
    return function (props, _a) {
        var _b;
        var attrs = _a.attrs, slots = _a.slots;
        return vue_1.h(vue_1.TransitionGroup, __assign(__assign({ mode: (_b = props.mode) !== null && _b !== void 0 ? _b : mode }, functions), attrs), slots["default"]);
    };
}
exports.createJavascriptTransitionGroup = createJavascriptTransitionGroup;
