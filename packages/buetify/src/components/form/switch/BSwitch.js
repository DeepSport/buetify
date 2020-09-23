"use strict";
exports.__esModule = true;
exports.BSwitch = exports.defineSwitch = void 0;
require("./switch.sass");
var useSelectionControl_1 = require("../shared/useSelectionControl");
exports.defineSwitch = useSelectionControl_1.useSelectionControl('switch', 'checkbox', 'b-switch', 'switch');
exports.BSwitch = exports.defineSwitch();
