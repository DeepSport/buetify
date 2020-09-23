"use strict";
exports.__esModule = true;
exports.WindowSizeSlot = void 0;
var vue_1 = require("vue");
var windowSize_1 = require("../../../composables/windowSize");
exports.WindowSizeSlot = vue_1.defineComponent({
    name: 'window-size',
    setup: function (_, _a) {
        var slots = _a.slots;
        var windowSize = windowSize_1.useWindowSize();
        return function () { return slots["default"] && slots["default"](windowSize.value); };
    }
});
