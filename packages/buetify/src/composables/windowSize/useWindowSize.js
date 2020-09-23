"use strict";
exports.__esModule = true;
exports.useWindowSize = void 0;
var Option_1 = require("fp-ts/lib/Option");
var vue_1 = require("vue");
var provideWindowSize_1 = require("./provideWindowSize");
function useWindowSize() {
    var injection = vue_1.inject(provideWindowSize_1.WINDOW_SIZE_SYMBOL, { windowSize: vue_1.shallowRef(Option_1.none) });
    return vue_1.computed(function () {
        return Option_1.isSome(injection.windowSize.value) ? injection.windowSize.value.value : provideWindowSize_1.getWindowSize().value;
    });
}
exports.useWindowSize = useWindowSize;
