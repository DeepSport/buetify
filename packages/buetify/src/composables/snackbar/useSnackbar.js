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
exports.useSnackbar = exports.SnackbarPropsDefinition = void 0;
var function_1 = require("fp-ts/lib/function");
var vue_1 = require("vue");
var helpers_1 = require("../../utils/helpers");
var noticeController_1 = require("../noticeController");
exports.SnackbarPropsDefinition = __assign(__assign({}, noticeController_1.UseNoticePropsDefinition), { actionText: {
        type: String,
        "default": 'OK'
    }, onAction: {
        type: Function,
        "default": function_1.constant(function_1.constVoid)
    } });
var DEFAULT_SNACKBAR_PROPS = __assign(__assign({}, noticeController_1.DEFAULT_USE_NOTICE_PROPS), { actionText: exports.SnackbarPropsDefinition.actionText["default"], onAction: exports.SnackbarPropsDefinition.onAction["default"]() });
function generateMessage(slots, message) {
    return vue_1.h('p', { "class": 'text' }, slots.message ? slots.message() : message);
}
function generateAction(props, slots, noticeController, options) {
    return vue_1.h('div', {
        "class": ['action', options.variant || props.variant, options.position || props.position]
    }, [
        vue_1.h('button', {
            "class": 'button',
            onClick: function () {
                props.onAction();
                noticeController.close();
            }
        }, slots.action ? slots.action() : props.actionText)
    ]);
}
function getGenerateSnackbar(props, slots, noticeController) {
    return function (options) { return function () {
        var _a;
        return [
            vue_1.h('article', {
                "class": ['snackbar', options.position || props.position],
                role: 'alert'
            }, [
                generateMessage(slots, (_a = options.message) !== null && _a !== void 0 ? _a : props.message),
                generateAction(props, slots, noticeController, options)
            ])
        ];
    }; };
}
function useSnackbar(props, slots) {
    if (props === void 0) { props = DEFAULT_SNACKBAR_PROPS; }
    if (slots === void 0) { slots = {}; }
    var renderNotification = vue_1.shallowRef(function_1.constant(helpers_1.constEmptyArray));
    var controller = noticeController_1.useNoticeController(props, renderNotification);
    renderNotification.value = getGenerateSnackbar(props, slots, controller);
    return controller;
}
exports.useSnackbar = useSnackbar;
