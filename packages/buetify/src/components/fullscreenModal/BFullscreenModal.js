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
require("./fullscreen-modal.sass");
var popupController_1 = require("../../composables/popupController");
var helpers_1 = require("../../utils/helpers");
var BOverlay_1 = require("../overlay/BOverlay");
var BSheet_1 = require("../sheet/BSheet");
var vue_1 = require("vue");
function generateTitle(slots) {
    return vue_1.h('div', { "class": 'main-slot' }, slots.title());
}
function generateCloseButton(popupController, slots) {
    return vue_1.h('button', __assign({ "class": 'navigation-icon has-text-link-hover', 'aria-label': 'close' }, popupController.listeners), slots.close());
}
function generateHeader(popupController, slots) {
    return vue_1.h('header', {
        "class": 'b-app-header is-flex flex-direction-row justify-content-center align-items-center'
    }, slots.header ? slots.header(popupController) : [generateCloseButton(popupController, slots), generateTitle(slots)]);
}
function generateContent(popupController, slots) {
    var nodes = slots["default"]();
    if (slots.header || slots.title) {
        nodes.unshift(generateHeader(popupController, slots));
    }
    return vue_1.h(BSheet_1["default"], { "class": 'is-fullheight', tag: 'article' }, nodes);
}
function generateModal(popupController, slots) {
    return vue_1.h(BOverlay_1["default"], {
        isFullscreen: true,
        isActive: true,
        onClick: popupController.close
    }, function () { return [generateContent(popupController, slots)]; });
}
exports["default"] = vue_1.defineComponent({
    name: 'b-fullscreen-modal',
    props: popupController_1.UsePopupControllerPropsDefinition,
    setup: function (props, _a) {
        var slots = _a.slots, attrs = _a.attrs;
        var render = vue_1.shallowRef(helpers_1.constEmptyArray);
        var popupController = popupController_1.usePopupController(props, render);
        render.value = function () {
            return [generateModal(popupController, slots)];
        };
        return function () { return slots.trigger && slots.trigger(popupController); };
    }
});
