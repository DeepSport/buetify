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
require("./dialog.sass");
var BOverlay_1 = require("../overlay/BOverlay");
var vue_1 = require("vue");
function BDialogOverlay(_, _a) {
    var attrs = _a.attrs, slots = _a.slots;
    return vue_1.h(BOverlay_1["default"], __assign(__assign({}, attrs), { "class": 'dialog' }), slots["default"]());
}
exports["default"] = BDialogOverlay;
