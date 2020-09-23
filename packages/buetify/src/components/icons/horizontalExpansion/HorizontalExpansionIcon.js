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
require("./horizontal-expansion-icon.sass");
var vue_1 = require("vue");
var mergeClasses_1 = require("../../../utils/mergeClasses");
var angleRight_1 = require("../angleRight");
function HorizontalExpansionIcon(props, _a) {
    var attrs = _a.attrs;
    return vue_1.h(angleRight_1.AngleRightIcon, __assign(__assign({}, attrs), { "class": mergeClasses_1.mergeClasses(attrs["class"], ['horizontal-expansion-icon', { 'is-expanded': props.isExpanded }]) }));
}
exports["default"] = HorizontalExpansionIcon;
