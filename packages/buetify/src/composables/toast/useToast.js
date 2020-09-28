"use strict";
exports.__esModule = true;
exports.useToast = void 0;
var function_1 = require("fp-ts/lib/function");
var vue_1 = require("vue");
var helpers_1 = require("../../utils/helpers");
var noticeController_1 = require("../noticeController");
function useToast(props, slots) {
    if (props === void 0) { props = noticeController_1.DEFAULT_USE_NOTICE_PROPS; }
    if (slots === void 0) { slots = {}; }
    var renderNotification = vue_1.shallowRef(function_1.constant(helpers_1.constEmptyArray));
    var noticeController = noticeController_1.useNoticeController(props, renderNotification);
    renderNotification.value = function (options) { return function () {
        var _a, _b, _c, _d;
        return [
            vue_1.h('div', {
                "class": ['toast', (_a = options.variant) !== null && _a !== void 0 ? _a : props.variant, (_b = options.position) !== null && _b !== void 0 ? _b : props.position],
                role: 'alert'
            }, (_d = (_c = options.message) !== null && _c !== void 0 ? _c : (slots.message && slots.message())) !== null && _d !== void 0 ? _d : props.message)
        ];
    }; };
    return noticeController;
}
exports.useToast = useToast;
