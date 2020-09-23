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
exports.usePopupController = exports.UsePopupControllerPropsDefinition = void 0;
var function_1 = require("fp-ts/lib/function");
var vue_1 = require("vue");
var toggle_1 = require("../toggle");
var transition_1 = require("../transition");
var providePopupController_1 = require("./providePopupController");
exports.UsePopupControllerPropsDefinition = __assign(__assign({}, transition_1.FadeTransitionPropsDefinition), toggle_1.getUseTogglePropsDefinition('isActive'));
function usePopupController(props, render) {
    var hasMounted = vue_1.shallowRef(false);
    vue_1.onMounted(function () {
        hasMounted.value = true;
    });
    var remove = function_1.constVoid;
    var _a = toggle_1.useToggle(props, 'isActive'), isOn = _a.isOn, setOn = _a.setOn, setOff = _a.setOff, toggle = _a.toggle, listeners = _a.listeners;
    var showPopup = vue_1.inject(providePopupController_1.POPUP_CONTROLLER_SYMBOL, providePopupController_1.DEFAULT_POPUP_CONTROLLER_INJECTION).showPopup;
    var isOpen = vue_1.computed(function () { return hasMounted.value && isOn.value; });
    var attrs = toggle_1.getToggleAttrs(isOpen, vue_1.toRef(props, 'hasPopup'));
    vue_1.watch(isOpen, function (newValue) {
        if (newValue) {
            remove();
            remove = showPopup({
                render: render.value,
                transition: props.transition
            });
        }
        else {
            remove();
            remove = function_1.constVoid;
        }
    });
    vue_1.onUnmounted(function () {
        remove();
    });
    return {
        isOpen: isOpen,
        attrs: attrs,
        listeners: listeners,
        props: vue_1.computed(function () { return (__assign(__assign({}, attrs.value), listeners)); }),
        open: setOn,
        close: setOff,
        toggle: toggle
    };
}
exports.usePopupController = usePopupController;
