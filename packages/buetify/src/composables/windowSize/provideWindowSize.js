"use strict";
exports.__esModule = true;
exports.provideWindowSize = exports.getWindowSize = exports.ProvideWindowSizePropsDefinition = exports.WINDOW_SIZE_SYMBOL = exports.DEFAULT_BREAK_POINTS = exports.DEFAULT_WINDOW_SIZE_INJECTION = void 0;
var function_1 = require("fp-ts/lib/function");
var Option_1 = require("fp-ts/lib/Option");
var lodash_debounce_1 = require("lodash.debounce");
var vue_1 = require("vue");
exports.DEFAULT_WINDOW_SIZE_INJECTION = {
    windowSize: vue_1.shallowRef(Option_1.none)
};
exports.DEFAULT_BREAK_POINTS = vue_1.shallowRef({
    mobile: 768,
    tablet: 1023,
    desktop: 1215,
    widescreen: 1407,
    fullHD: 1408
});
exports.WINDOW_SIZE_SYMBOL = Symbol('window-size');
exports.ProvideWindowSizePropsDefinition = {
    breakPoints: {
        type: Object,
        required: false,
        "default": function_1.constant(exports.DEFAULT_BREAK_POINTS.value)
    }
};
function getWindowSize() {
    var windowWidth = vue_1.shallowRef(window.innerWidth);
    var resizeHandler = lodash_debounce_1["default"](function () {
        windowWidth.value = window.innerWidth;
    }, 250);
    vue_1.onMounted(function () { return window.addEventListener('resize', resizeHandler, { passive: true }); });
    vue_1.onUnmounted(function () { return window.removeEventListener('resize', resizeHandler); });
    return vue_1.computed(function () {
        var breakPoints = exports.DEFAULT_BREAK_POINTS.value;
        var innerWidth = windowWidth.value;
        var isMobile = innerWidth <= breakPoints.mobile;
        var isTablet = innerWidth <= breakPoints.tablet && innerWidth > breakPoints.mobile;
        return {
            windowWidth: innerWidth,
            isMobile: isMobile,
            isTablet: isTablet,
            isTouch: isMobile || isTablet,
            isDesktop: innerWidth <= breakPoints.desktop && innerWidth > breakPoints.tablet,
            isWidescreen: innerWidth <= breakPoints.widescreen && innerWidth > breakPoints.desktop,
            isFullHD: innerWidth >= breakPoints.fullHD
        };
    });
}
exports.getWindowSize = getWindowSize;
function provideWindowSize(props) {
    vue_1.watchEffect(function () {
        exports.DEFAULT_BREAK_POINTS.value = props.breakPoints;
    });
    var windowSize = getWindowSize();
    var injection = {
        windowSize: vue_1.computed(function () { return Option_1.some(windowSize.value); })
    };
    vue_1.provide(exports.WINDOW_SIZE_SYMBOL, injection);
    return {
        windowSize: windowSize
    };
}
exports.provideWindowSize = provideWindowSize;
