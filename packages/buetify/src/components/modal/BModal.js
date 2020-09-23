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
require("./modal.sass");
var popupController_1 = require("../../composables/popupController");
var helpers_1 = require("../../utils/helpers");
var BOverlay_1 = require("../overlay/BOverlay");
var BBox_1 = require("../layout/box/BBox");
var vue_1 = require("vue");
var BModalPropsDefinition = __assign(__assign({}, popupController_1.UsePopupControllerPropsDefinition), { showExit: {
        type: Boolean,
        required: false,
        "default": false
    } });
function generateCloseButton(close) {
    return vue_1.h('button', {
        "class": 'modal-exit delete is-small',
        onClick: close
    });
}
function generateModalBox(props, context, controller) {
    return vue_1.h(BBox_1["default"], {
        "class": 'is-paddingless is-fullheight is-fullwidth overflow-scroll'
    }, function () { return [
        vue_1.h('div', { "class": 'is-fullheight' }, function () {
            return props.showExit ? [generateCloseButton(controller.close), context.slots["default"]()] : context.slots["default"]();
        })
    ]; });
}
exports["default"] = vue_1.defineComponent({
    name: 'b-modal',
    props: BModalPropsDefinition,
    setup: function (props, context) {
        var generateModal = vue_1.shallowRef(helpers_1.constEmptyArray);
        var popup = popupController_1.usePopupController(props, generateModal);
        generateModal.value = function () {
            return [
                vue_1.h(BOverlay_1["default"], __assign(__assign({}, context.attrs), { onClick: popup.close }), function () { return [generateModalBox(props, context, popup)]; })
            ];
        };
        return { popup: popup };
    },
    render: function () {
        return this.$slots.trigger && this.$slots.trigger(this.popup);
    }
});
