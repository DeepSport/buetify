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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
require("./dropdown.sass");
var theme_1 = require("../../composables/theme");
var vue_1 = require("vue");
var theme_2 = require("./theme");
exports["default"] = vue_1.defineComponent({
    name: 'b-dropdown-item',
    props: __assign(__assign({}, theme_1.useThemePropsDefinition(theme_2.DropdownThemeMap, true)), { isActive: {
            type: Boolean,
            "default": false
        }, tag: {
            type: String,
            "default": 'li'
        } }),
    setup: function (props, _a) {
        var slots = _a.slots;
        var themeClasses = theme_1.useTheme(props).themeClasses;
        return function () {
            var _a;
            return vue_1.h((_a = props.tag) !== null && _a !== void 0 ? _a : 'li', {
                role: 'menuitem',
                tabindex: 0,
                "class": __spreadArrays(['dropdown-item'], themeClasses.value, [{ 'is-active': props.isActive }])
            }, slots["default"] && slots["default"]());
        };
    }
});
