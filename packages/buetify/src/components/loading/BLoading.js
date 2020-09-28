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
exports.BLoadingPropsDefinition = void 0;
require("./loading.sass");
var popupController_1 = require("../../composables/popupController");
var toggle_1 = require("../../composables/toggle");
var eventHelpers_1 = require("../../utils/eventHelpers");
var vue_1 = require("vue");
var helpers_1 = require("../../utils/helpers");
exports.BLoadingPropsDefinition = __assign(__assign({}, popupController_1.UsePopupControllerPropsDefinition), { isFullscreen: {
        type: Boolean,
        "default": false
    }, canCancel: {
        type: Boolean,
        "default": false
    } });
function getGenerateModal(onClick) {
    return function () { return [
        vue_1.h('div', { "class": 'b-loading-overlay is-active is-fullscreen' }, [
            vue_1.h('div', {
                "class": 'loading-background',
                onClick: onClick
            }),
            vue_1.h('div', { "class": 'loading-icon' })
        ])
    ]; };
}
exports["default"] = vue_1.defineComponent({
    name: 'b-loading',
    props: exports.BLoadingPropsDefinition,
    setup: function (props, _a) {
        var slots = _a.slots;
        if (props.isFullscreen) {
            var generateLoadingPopup = vue_1.shallowRef(helpers_1.constEmptyArray);
            var popup_1 = popupController_1.usePopupController(props, generateLoadingPopup);
            var onClick_1 = function () {
                if (props.canCancel && popup_1.isOpen.value) {
                    popup_1.close();
                }
            };
            var onKeyup_1 = function (e) {
                if (eventHelpers_1.isEscEvent(e)) {
                    onClick_1();
                }
            };
            vue_1.onMounted(function () {
                if (typeof window !== 'undefined') {
                    document.addEventListener('keyup', onKeyup_1);
                }
            });
            vue_1.onUnmounted(function () {
                if (typeof window !== 'undefined') {
                    document.removeEventListener('keyup', onKeyup_1);
                }
            });
            generateLoadingPopup.value = getGenerateModal(onClick_1);
            return function () { return (slots.trigger ? slots.trigger(popup_1) : []); };
        }
        else {
            var toggle_2 = toggle_1.useToggle(props, 'isActive');
            var onClick = function () {
                if (props.canCancel && toggle_2.isOn.value) {
                    toggle_2.setOff();
                }
            };
            var render_1 = getGenerateModal(onClick);
            return function () { return vue_1.h(vue_1.Transition, { name: props.transition }, toggle_2.isOn.value && render_1()); };
        }
    }
});
