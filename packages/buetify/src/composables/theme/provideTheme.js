"use strict";
exports.__esModule = true;
exports.provideTheme = exports.ProvideThemePropDefinitions = exports.THEME_INJECTION_SYMBOL = exports.DEFAULT_THEME_INJECTION = void 0;
var fp_ts_local_storage_1 = require("fp-ts-local-storage");
var function_1 = require("fp-ts/lib/function");
var Option_1 = require("fp-ts/lib/Option");
var vue_1 = require("vue");
exports.DEFAULT_THEME_INJECTION = {
    currentTheme: vue_1.shallowRef(Option_1.none),
    isThemeable: vue_1.shallowRef(false),
    setTheme: function_1.constVoid
};
exports.THEME_INJECTION_SYMBOL = Symbol('theme');
var persistentTheme = Option_1.getOrElse(function_1.constant('dark'))(fp_ts_local_storage_1.getItem('theme')());
exports.ProvideThemePropDefinitions = {
    isThemeable: {
        type: Boolean,
        "default": true
    },
    persistTheme: {
        type: Boolean,
        "default": true
    }
};
function provideTheme(props) {
    var isThemeable = vue_1.shallowRef(props.isThemeable);
    vue_1.watch(props, function (newProps) {
        isThemeable.value = newProps.isThemeable;
    });
    var currentTheme = vue_1.shallowRef(Option_1.some(persistentTheme));
    function setTheme(newTheme) {
        currentTheme.value = Option_1.some(newTheme);
        if (props.persistTheme) {
            fp_ts_local_storage_1.setItem('theme', newTheme)();
        }
    }
    var injection = {
        isThemeable: isThemeable,
        currentTheme: currentTheme,
        setTheme: setTheme
    };
    vue_1.provide(exports.THEME_INJECTION_SYMBOL, injection);
    return {
        setTheme: setTheme,
        currentTheme: currentTheme,
        isThemeable: isThemeable
    };
}
exports.provideTheme = provideTheme;
