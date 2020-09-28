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
exports.BNotificationPropsDefinition = void 0;
require("../sass/notices.sass");
var function_1 = require("fp-ts/lib/function");
var message_1 = require("../../../composables/message");
var noticeController_1 = require("../../../composables/noticeController");
var transition_1 = require("../../../composables/transition");
var vue_1 = require("vue");
var helpers_1 = require("../../../utils/helpers");
exports.BNotificationPropsDefinition = __assign(__assign(__assign({}, message_1.UseMessagePropsDefinition), noticeController_1.UseNoticePropsDefinition), { isNotice: {
        type: Boolean,
        "default": true
    } });
function generateCloseButton(props, messageController, noticeController) {
    return vue_1.h('button', {
        "class": 'delete',
        onClick: props.isNotice ? noticeController.close : messageController.setOff
    });
}
function generateIcon(messageController) {
    return vue_1.h('div', { "class": 'media-left' }, [
        vue_1.h(messageController.icon.value, { size: messageController.iconSize.value })
    ]);
}
function generateNoticeContent(context, message) {
    return vue_1.h('div', { "class": 'media-content' }, (context.slots.message && context.slots.message()) || vue_1.h('p', message));
}
function generateNoticeBody(props, context, messageController, noticeController, message) {
    return vue_1.h('div', { "class": 'media' }, props.useIcon && messageController.icon.value
        ? [generateIcon(messageController), generateNoticeContent(context, message)]
        : [generateNoticeContent(context, message)]);
}
function getGenerateNotice(props, context, messageController, noticeController) {
    return function (options) { return function () {
        var _a, _b, _c, _d;
        var notice = vue_1.h('article', {
            "class": ['notification', (_a = options.variant) !== null && _a !== void 0 ? _a : props.variant, (_b = options.position) !== null && _b !== void 0 ? _b : props.position]
        }, props.isClosable
            ? [
                generateCloseButton(props, messageController, noticeController),
                generateNoticeBody(props, context, messageController, noticeController, (_c = options.message) !== null && _c !== void 0 ? _c : props.message)
            ]
            : [generateNoticeBody(props, context, messageController, noticeController, (_d = options.message) !== null && _d !== void 0 ? _d : props.message)]);
        return props.isNotice ? [notice] : [vue_1.withDirectives(notice, [[vue_1.vShow, messageController.isOn.value]])];
    }; };
}
exports["default"] = vue_1.defineComponent({
    name: 'b-notification',
    props: exports.BNotificationPropsDefinition,
    setup: function (props, context) {
        var renderNotification = vue_1.shallowRef(function_1.constant(helpers_1.constEmptyArray));
        var noticeController = noticeController_1.useNoticeController(props, renderNotification);
        var messageController = message_1.useMessage(props);
        renderNotification.value = getGenerateNotice(props, context, messageController, noticeController);
        return function () {
            return props.isNotice
                ? context.slots["default"] && context.slots["default"]({ open: noticeController.open, close: noticeController.close })
                : vue_1.h(vue_1.Transition, props.transition ? transition_1.formatTransition(props.transition) : {}, renderNotification.value({}));
        };
    }
});
