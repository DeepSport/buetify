"use strict";
exports.__esModule = true;
exports.provideNoticeController = exports.DEFAULT_NOTICE_CONTROLLER_INJECTION = exports.NOTICE_CONTROLLER_SYMBOL = void 0;
var function_1 = require("fp-ts/lib/function");
var vue_1 = require("vue");
exports.NOTICE_CONTROLLER_SYMBOL = Symbol('notice-controller');
exports.DEFAULT_NOTICE_CONTROLLER_INJECTION = {
    showNotice: function_1.constant(function_1.constVoid)
};
function provideNoticeController(showNotice) {
    var injection = {
        showNotice: showNotice
    };
    vue_1.provide(exports.NOTICE_CONTROLLER_SYMBOL, injection);
    return injection;
}
exports.provideNoticeController = provideNoticeController;
