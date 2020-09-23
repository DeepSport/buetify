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
exports.ACCORDION_CONTENT_THEME_MAP = void 0;
require("./accordion.sass");
var vue_1 = require("vue");
var theme_1 = require("../../composables/theme");
var toggle_1 = require("../../composables/toggle");
var transition_1 = require("../../composables/transition");
var getThemeableFunctionalComponent_1 = require("../../utils/getThemeableFunctionalComponent");
var VerticalExpansionIcon_1 = require("../icons/verticalExpansion/VerticalExpansionIcon");
function generateTitle(slots) {
    return vue_1.h('h1', {
        "class": 'card-header-title'
    }, slots.title && slots.title());
}
function generateTriggerButton(toggle, slots) {
    return vue_1.h('button', __assign(__assign(__assign({ "class": 'card-header-icon' }, toggle.listeners), toggle.attrs.value), { onClick: function (e) {
            e.stopPropagation();
            toggle.toggle();
        } }), slots.trigger
        ? slots.trigger({
            isExpanded: toggle.isOn.value
        })
        : vue_1.h(VerticalExpansionIcon_1["default"], { isExpanded: toggle.isOn.value }));
}
function generateHeader(toggle, slots) {
    return vue_1.h('header', {
        "class": 'card-header',
        onClick: toggle.toggle
    }, [generateTitle(slots), generateTriggerButton(toggle, slots)]);
}
exports.ACCORDION_CONTENT_THEME_MAP = {
    dark: 'is-black-ter',
    light: ''
};
var BAccordionContent = getThemeableFunctionalComponent_1.getThemeableFunctionalComponent({
    cls: 'card-content',
    el: 'section',
    themeMap: exports.ACCORDION_CONTENT_THEME_MAP
});
function generateBody(toggle, transition, slots) {
    return vue_1.h(vue_1.Transition, transition.value, function () {
        return vue_1.withDirectives(vue_1.h(BAccordionContent, {
            'aria-hidden': !toggle.isOn.value
        }, slots["default"]), [[vue_1.vShow, toggle.isOn.value]]);
    });
}
exports["default"] = vue_1.defineComponent({
    name: 'b-accordion',
    props: __assign(__assign(__assign({}, toggle_1.getUseTogglePropsDefinition('isExpanded')), transition_1.FadeTransitionPropsDefinition), theme_1.DefaultThemePropsDefinition),
    setup: function (props, _a) {
        var slots = _a.slots;
        var toggle = toggle_1.useToggle(props, 'isExpanded');
        var theme = theme_1.useTheme(props);
        var transition = transition_1.useTransition(props);
        return function () {
            return vue_1.h('article', { "class": __spreadArrays(['b-card card'], theme.themeClasses.value) }, [
                generateHeader(toggle, slots),
                generateBody(toggle, transition, slots)
            ]);
        };
    }
});
