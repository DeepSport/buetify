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
require("./app-header.sass");
var Option_1 = require("fp-ts/lib/Option");
var navigationDrawerController_1 = require("../../composables/navigationDrawerController");
var vue_1 = require("vue");
var BNavbarBurger_1 = require("../navbar/BNavbarBurger");
function generateMainSlot(injection, includeClickHandler, slots) {
    return vue_1.h('div', __assign({ "class": 'main-slot' }, (includeClickHandler && Option_1.isSome(injection.listeners.value)
        ? { onClick: injection.listeners.value.value.onClick }
        : {})), slots["default"]());
}
function generateNavigationButton(injection, slots) {
    var listeners = Option_1.isSome(injection.listeners.value) ? injection.listeners.value.value : {};
    var attrs = Option_1.isSome(injection.listeners.value) ? injection.listeners.value.value : {};
    return vue_1.h('button', __assign(__assign(__assign({ "class": 'navigation-icon is-hidden-desktop' }, listeners), attrs), { 'aria-label': 'Toggle navigation pane' }), slots.trigger
        ? slots.trigger({ isVisible: injection.isVisible.value })
        : vue_1.h(BNavbarBurger_1["default"], { isActive: !injection.isVisible.value }));
}
function default_1(_, _a) {
    var attrs = _a.attrs, slots = _a.slots;
    var navigationDrawerController = navigationDrawerController_1.useNavigationDrawerController();
    var isInvisible = !navigationDrawerController.isVisible.value;
    return vue_1.h('header', __assign(__assign({}, attrs), { "class": [
            'b-app-header is-flex flex-direction-row justify-content-center align-items-center',
            {
                'has-navigation': isInvisible
            }
        ] }), [
        generateNavigationButton(navigationDrawerController, slots),
        generateMainSlot(navigationDrawerController, isInvisible, slots)
    ]);
}
exports["default"] = default_1;
