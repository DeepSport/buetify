"use strict";
exports.__esModule = true;
exports.ScreenSizeDependentComponent = void 0;
var windowSize_1 = require("../../../composables/windowSize");
var vue_1 = require("vue");
exports.ScreenSizeDependentComponent = function (components) { return function (props, context) {
    var windowSize = windowSize_1.useWindowSize();
    if (windowSize.value.isMobile) {
        return vue_1.h(components.mobile, props, context.slots);
    }
    else if (windowSize.value.isTablet) {
        return vue_1.h(components.tablet, props, context.slots);
    }
    else if (windowSize.value.isDesktop) {
        return vue_1.h(components.desktop, props, context.slots);
    }
    else if (windowSize.value.isWidescreen) {
        return vue_1.h(components.widescreen, props, context.slots);
    }
    else {
        return vue_1.h(components.fullHD, props, context.slots);
    }
}; };
