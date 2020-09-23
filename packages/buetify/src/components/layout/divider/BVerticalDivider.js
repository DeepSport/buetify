"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
require("./divider.sass");
var theme_1 = require("../../../composables/theme");
var mergeClasses_1 = require("../../../utils/mergeClasses");
var vue_1 = require("vue");
function BVerticalDivider(props, _a) {
    var _b, _c, _d;
    var attrs = _a.attrs;
    var themeClasses = theme_1.useTheme({
        themeMap: (_b = props.themeMap) !== null && _b !== void 0 ? _b : theme_1.DEFAULT_THEME_COLOR_MAP,
        isThemeable: (_c = props.isThemeable) !== null && _c !== void 0 ? _c : true
    }).themeClasses;
    attrs["class"] = mergeClasses_1.mergeClasses(attrs["class"], __spreadArrays(['is-divider-vertical'], themeClasses.value));
    if (props.text) {
        attrs['data-content'] = props.text;
    }
    return vue_1.h((_d = props.tag) !== null && _d !== void 0 ? _d : 'div', attrs);
}
exports["default"] = BVerticalDivider;
