"use strict";
exports.__esModule = true;
exports.useTheme = exports.getThemeClasses = exports.DefaultThemePropsDefinition = exports.useThemePropsDefinition = exports.DEFAULT_THEME_COLOR_MAP = void 0;
var Option_1 = require("fp-ts/lib/Option");
var vue_1 = require("vue");
var function_1 = require("fp-ts/lib/function");
var provideTheme_1 = require("./provideTheme");
exports.DEFAULT_THEME_COLOR_MAP = {
    dark: 'is-black-ter',
    light: ''
};
function useThemePropsDefinition(themeMap, defaultIsThemeable) {
    if (defaultIsThemeable === void 0) { defaultIsThemeable = true; }
    return {
        themeMap: {
            type: Object,
            required: false,
            "default": function_1.constant(themeMap)
        },
        isThemeable: {
            type: Boolean,
            required: false,
            "default": defaultIsThemeable
        }
    };
}
exports.useThemePropsDefinition = useThemePropsDefinition;
exports.DefaultThemePropsDefinition = useThemePropsDefinition(exports.DEFAULT_THEME_COLOR_MAP, true);
function getThemeClasses(themeMap, themeInjection) {
    if (themeInjection.isThemeable.value && Option_1.isSome(themeInjection.currentTheme.value)) {
        var classes = themeMap[themeInjection.currentTheme.value.value];
        return Array.isArray(classes) ? classes : [classes];
    }
    else {
        return [];
    }
}
exports.getThemeClasses = getThemeClasses;
function useTheme(props) {
    var themeInjection = vue_1.inject(provideTheme_1.THEME_INJECTION_SYMBOL, provideTheme_1.DEFAULT_THEME_INJECTION);
    var themeClasses = vue_1.computed(function () { return (props ? getThemeClasses(props.themeMap, themeInjection) : []); });
    return {
        currentTheme: themeInjection.currentTheme,
        setTheme: themeInjection.setTheme,
        toggleTheme: function () {
            if (Option_1.isSome(themeInjection.currentTheme.value)) {
                if (themeInjection.currentTheme.value.value === 'light') {
                    themeInjection.setTheme('dark');
                }
                else {
                    themeInjection.setTheme('light');
                }
            }
        },
        themeClasses: themeClasses
    };
}
exports.useTheme = useTheme;
