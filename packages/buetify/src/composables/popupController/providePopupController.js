"use strict";
exports.__esModule = true;
exports.providePopupController = exports.DEFAULT_POPUP_CONTROLLER_INJECTION = exports.POPUP_CONTROLLER_SYMBOL = void 0;
var function_1 = require("fp-ts/lib/function");
var vue_1 = require("vue");
exports.POPUP_CONTROLLER_SYMBOL = Symbol('popup-controller');
exports.DEFAULT_POPUP_CONTROLLER_INJECTION = {
    showPopup: function_1.constant(function_1.constVoid)
};
function providePopupController(showPopup) {
    var injection = {
        showPopup: showPopup
    };
    vue_1.provide(exports.POPUP_CONTROLLER_SYMBOL, injection);
    return injection;
}
exports.providePopupController = providePopupController;
