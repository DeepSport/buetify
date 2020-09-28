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
require("./slide-right-transition.sass");
var vue_1 = require("vue");
function SlideRightTransition(_, _a) {
    var attrs = _a.attrs, slots = _a.slots;
    return vue_1.h(vue_1.Transition, __assign(__assign({}, attrs), { name: 'slide-right', css: true }), slots["default"]);
}
exports["default"] = SlideRightTransition;
