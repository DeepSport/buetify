"use strict";
exports.__esModule = true;
exports.useNavigationDrawerController = void 0;
var vue_1 = require("vue");
var provideNavigationDrawerController_1 = require("./provideNavigationDrawerController");
function useNavigationDrawerController() {
    var injection = vue_1.inject(provideNavigationDrawerController_1.NAVIGATION_DRAWER_CONTROLLER_INJECTION_SYMBOL, provideNavigationDrawerController_1.DEFAULT_NAVIGATION_DRAWER_CONTROLLER_INJECTION);
    return injection;
}
exports.useNavigationDrawerController = useNavigationDrawerController;
