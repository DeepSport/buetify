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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.BNavigationDrawerPropsDefinition = void 0;
require("./navigation-drawer.sass");
var function_1 = require("fp-ts/lib/function");
var Option_1 = require("fp-ts/lib/Option");
var navigationDrawerController_1 = require("../../composables/navigationDrawerController");
var theme_1 = require("../../composables/theme");
var windowSize_1 = require("../../composables/windowSize");
var slideRightTransition_1 = require("../../transitions/slideRightTransition");
var vue_1 = require("vue");
var BOverlay_1 = require("../overlay/BOverlay");
var theme_2 = require("./theme");
exports.BNavigationDrawerPropsDefinition = __assign(__assign({}, theme_1.useThemePropsDefinition(theme_2.NavigationDrawerThemeMap)), { tag: {
        type: String,
        "default": 'nav'
    }, isFullheight: {
        type: Boolean,
        "default": true
    }, currentRoute: {
        type: Object,
        required: false
    } });
function generateDrawer(props, controller, themeClasses, context) {
    return vue_1.h(props.tag, {
        "class": __spreadArrays(['b-navigation-drawer', { 'is-fullheight': props.isFullheight }], themeClasses)
    }, context.slots["default"] &&
        context.slots["default"]({
            showNavigationDrawer: controller.show,
            hideNavigationDrawer: controller.hide,
            navigationDrawerIsVisible: controller.isVisible.value,
            toggleNavigationDrawer: controller.toggle
        }));
}
function generateMobileDrawer(props, controller, themeClasses, context) {
    return vue_1.h(slideRightTransition_1.SlideRightTransition, undefined, function () {
        return vue_1.withDirectives(vue_1.h(BOverlay_1["default"], {
            "class": 'is-left',
            isActive: function_1.pipe(controller.isVisible.value, Option_1.exists(function_1.identity)),
            onClick: controller.hide
        }, function () { return generateDrawer(props, controller, themeClasses, context); }), [[vue_1.vShow, controller.isVisible.value]]);
    });
}
exports["default"] = vue_1.defineComponent({
    name: 'b-navigation-drawer',
    props: exports.BNavigationDrawerPropsDefinition,
    setup: function (props, context) {
        var controller = navigationDrawerController_1.useNavigationDrawerController();
        var windowSize = windowSize_1.useWindowSize();
        var themeClasses = theme_1.useTheme(props).themeClasses;
        var useSideDrawer = vue_1.computed(function () {
            return windowSize.value.isTouch || windowSize.value.isDesktop;
        });
        vue_1.watchEffect(function () {
            useSideDrawer.value ? controller.hide() : controller.show();
        });
        vue_1.watch(vue_1.toRef(props, 'currentRoute'), function (newVal) {
            if (useSideDrawer.value) {
                controller.hide();
            }
        });
        return function () {
            if (useSideDrawer.value) {
                return generateMobileDrawer(props, controller, themeClasses.value, context);
            }
            else {
                return generateDrawer(props, controller, themeClasses.value, context);
            }
        };
    }
});
