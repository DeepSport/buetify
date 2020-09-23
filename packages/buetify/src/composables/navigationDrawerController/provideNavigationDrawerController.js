"use strict";
exports.__esModule = true;
exports.provideNavigationDrawerController = exports.DEFAULT_NAVIGATION_DRAWER_CONTROLLER_INJECTION = exports.ProvideNavigationDrawerControllerPropsDefinition = exports.NAVIGATION_DRAWER_CONTROLLER_INJECTION_SYMBOL = void 0;
var function_1 = require("fp-ts/lib/function");
var Option_1 = require("fp-ts/lib/Option");
var vue_1 = require("vue");
var toggle_1 = require("../toggle");
var provideWindowSize_1 = require("../windowSize/provideWindowSize");
exports.NAVIGATION_DRAWER_CONTROLLER_INJECTION_SYMBOL = Symbol('navigation-drawer-controller');
exports.ProvideNavigationDrawerControllerPropsDefinition = {
    isVisible: {
        type: Boolean,
        required: false,
        "default": !!window && window.innerWidth > provideWindowSize_1.DEFAULT_BREAK_POINTS.value.desktop
    },
    hasPopup: {
        type: Boolean,
        required: false,
        "default": true
    }
};
exports.DEFAULT_NAVIGATION_DRAWER_CONTROLLER_INJECTION = {
    isVisible: vue_1.shallowRef(Option_1.none),
    attrs: vue_1.shallowRef(Option_1.none),
    listeners: vue_1.shallowRef(Option_1.none),
    show: function_1.constVoid,
    hide: function_1.constVoid,
    toggle: function_1.constVoid
};
function provideNavigationDrawerController(props) {
    var toggle = toggle_1.useToggle(props, 'isVisible');
    var injection = {
        isVisible: vue_1.computed(function () { return Option_1.some(toggle.isOn.value); }),
        listeners: vue_1.computed(function () { return Option_1.some(toggle.listeners); }),
        attrs: vue_1.computed(function () { return Option_1.some(toggle.attrs.value); }),
        show: toggle.setOn,
        hide: toggle.setOff,
        toggle: toggle.toggle
    };
    vue_1.provide(exports.NAVIGATION_DRAWER_CONTROLLER_INJECTION_SYMBOL, injection);
    return injection;
}
exports.provideNavigationDrawerController = provideNavigationDrawerController;
