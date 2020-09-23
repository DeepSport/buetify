"use strict";
exports.__esModule = true;
exports.getSimpleFunctionalComponent = void 0;
var vue_1 = require("vue");
function getSimpleFunctionalComponent(cls, el) {
    if (el === void 0) { el = 'div'; }
    return function (props, _a) {
        var _b;
        var slots = _a.slots;
        return vue_1.h((_b = props.tag) !== null && _b !== void 0 ? _b : el, { "class": cls }, slots["default"] ? slots["default"]() : undefined);
    };
}
exports.getSimpleFunctionalComponent = getSimpleFunctionalComponent;
