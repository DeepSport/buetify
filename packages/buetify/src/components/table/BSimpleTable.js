"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
require("./table.sass");
var theme_1 = require("../../composables/theme");
var BScroll_1 = require("../scroll/BScroll");
var vue_1 = require("vue");
function BSimpleTable(props, _a) {
    var _b, _c;
    var slots = _a.slots;
    var themeClasses = theme_1.useTheme({
        isThemeable: (_b = props.isThemeable) !== null && _b !== void 0 ? _b : true,
        themeMap: (_c = props.themeMap) !== null && _c !== void 0 ? _c : theme_1.DEFAULT_THEME_COLOR_MAP
    }).themeClasses;
    function table() {
        return [
            vue_1.h('div', { "class": 'table-wrapper' }, [
                vue_1.h('table', {
                    "class": __spreadArrays([props.tableClasses, 'table'], themeClasses.value)
                }, slots["default"]())
            ])
        ];
    }
    return vue_1.h('div', {
        "class": ['b-table', { 'is-loading': props.isLoading }]
    }, props.isScrollable ? vue_1.h(BScroll_1["default"], { "class": 'is-fullwidth' }, table) : table());
}
exports["default"] = BSimpleTable;
