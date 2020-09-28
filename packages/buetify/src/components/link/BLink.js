"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
require("./link.sass");
var theme_1 = require("../../composables/theme");
var vue_1 = require("vue");
var theme_2 = require("./theme");
function BLink(props, _a) {
    var _b, _c, _d;
    var attrs = _a.attrs, slots = _a.slots;
    var themeClasses = theme_1.useTheme({
        isThemeable: (_b = props.isThemeable) !== null && _b !== void 0 ? _b : true,
        themeMap: (_c = props.themeMap) !== null && _c !== void 0 ? _c : theme_2.LinkThemeMap
    }).themeClasses;
    return vue_1.h((_d = props.tag) !== null && _d !== void 0 ? _d : 'a', {
        "class": __spreadArrays(['b-link'], themeClasses.value, [{ 'is-disabled': props.isDisabled }]),
        onClick: props.isDisabled ? undefined : attrs.onClick
    }, slots["default"] && slots["default"]());
}
exports["default"] = BLink;
