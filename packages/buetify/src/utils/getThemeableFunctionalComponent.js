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
exports.getThemeableFunctionalComponent = exports.isThemeable = void 0;
var Option_1 = require("fp-ts/lib/Option");
var vue_1 = require("vue");
var theme_1 = require("../composables/theme");
var mergeClasses_1 = require("./mergeClasses");
function isThemeable(props, injection) {
    return !!props.isThemeable && !!props.themeMap && Option_1.isSome(injection.currentTheme.value);
}
exports.isThemeable = isThemeable;
function getThemeableFunctionalComponent(_a) {
    var cls = _a.cls, _b = _a.el, el = _b === void 0 ? 'div' : _b, _c = _a.themeMap, themeMap = _c === void 0 ? theme_1.DEFAULT_THEME_COLOR_MAP : _c;
    return vue_1.defineComponent({
        props: __assign(__assign({}, theme_1.useThemePropsDefinition(themeMap, true)), { tag: {
                type: [String, Function],
                "default": el
            } }),
        setup: function (props, _a) {
            var slots = _a.slots;
            var themeInjection = vue_1.inject(theme_1.THEME_INJECTION_SYMBOL, theme_1.DEFAULT_THEME_INJECTION);
            return function () {
                return vue_1.h(props.tag, {
                    "class": isThemeable(props, themeInjection)
                        ? mergeClasses_1.mergeClasses(theme_1.getThemeClasses(props.themeMap, themeInjection), cls)
                        : cls
                }, slots["default"] && slots["default"]());
            };
        }
    });
}
exports.getThemeableFunctionalComponent = getThemeableFunctionalComponent;
