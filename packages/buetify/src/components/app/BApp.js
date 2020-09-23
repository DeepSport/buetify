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
require("./app.sass");
var Option_1 = require("fp-ts/lib/Option");
var vue_1 = require("vue");
var navigationDrawerController_1 = require("../../composables/navigationDrawerController");
var noticeController_1 = require("../../composables/noticeController");
var popupController_1 = require("../../composables/popupController");
var theme_1 = require("../../composables/theme");
var transition_1 = require("../../composables/transition");
var windowSize_1 = require("../../composables/windowSize");
var BNavigationDrawer_1 = require("../navigationDrawer/BNavigationDrawer");
var BNoticeContainer_1 = require("../notices/noticeContainer/BNoticeContainer");
var BPopupContainer_1 = require("../popupContainer/BPopupContainer");
var DEFAULT_TRANSITION = { name: 'fade' };
function generateNoticeContainer(placement, ref) {
    return vue_1.h(BNoticeContainer_1["default"], { ref: ref, "class": placement === 'top' ? 'notices-is-top' : 'notices-is-bottom' });
}
function generatePopupContainer(ref) {
    return vue_1.h(BPopupContainer_1["default"], { ref: ref });
}
function generateNavigationSlot(slots) {
    return vue_1.h(BNavigationDrawer_1["default"], {
        isFullheight: true
    }, slots['navigation-drawer']);
}
function generateMainContent(slots) {
    return vue_1.h('div', { "class": 'b-app-content' }, slots["default"]());
}
function generateBodyContent(slots, hasNavigationDrawer, displayNavigationDrawer) {
    var nodes = [];
    if (slots.header) {
        var header = slots.header();
        if (header)
            nodes.push.apply(nodes, header);
    }
    nodes.push(vue_1.h('div', { "class": 'b-app-body-content' }, hasNavigationDrawer
        ? [
            vue_1.withDirectives(generateNavigationSlot(slots), [[vue_1.vShow, displayNavigationDrawer]]),
            generateMainContent(slots)
        ]
        : [generateMainContent(slots)]));
    return nodes;
}
exports["default"] = vue_1.defineComponent({
    name: 'b-app',
    props: __assign(__assign(__assign({}, theme_1.ProvideThemePropDefinitions), windowSize_1.ProvideWindowSizePropsDefinition), navigationDrawerController_1.ProvideNavigationDrawerControllerPropsDefinition),
    setup: function (props, _a) {
        var slots = _a.slots;
        var popup = vue_1.shallowRef(null);
        var top = vue_1.shallowRef(null);
        var bottom = vue_1.shallowRef(null);
        function showNotice(params) {
            var options = __assign(__assign({}, params), { transition: params.transition ? transition_1.formatTransition(params.transition) : DEFAULT_TRANSITION });
            return params.placement === 'top' ? top.value.showNotice(options) : bottom.value.showNotice(options);
        }
        function showPopup(params) {
            return popup.value.showPopup({
                render: params.render,
                transition: params.transition ? transition_1.formatTransition(params.transition) : DEFAULT_TRANSITION
            });
        }
        theme_1.provideTheme(props);
        noticeController_1.provideNoticeController(showNotice);
        popupController_1.providePopupController(showPopup);
        windowSize_1.provideWindowSize(props);
        var isVisible = navigationDrawerController_1.provideNavigationDrawerController(props).isVisible;
        return function () {
            var hasNavigationDrawer = !!slots['navigation-drawer'];
            var displayNavigationDrawer = Option_1.isSome(isVisible.value) && isVisible.value.value;
            var nodes = [
                generateNoticeContainer('top', top),
                generateNoticeContainer('bottom', bottom),
                generatePopupContainer(popup)
            ];
            nodes.push(vue_1.h('div', { style: { 'z-index': 0 } }, generateBodyContent(slots, hasNavigationDrawer, displayNavigationDrawer)));
            return vue_1.h('div', {
                "class": [
                    'b-app',
                    { 'has-navigation-drawer': hasNavigationDrawer && displayNavigationDrawer, 'has-header': !!slots.header }
                ]
            }, nodes);
        };
    }
});
