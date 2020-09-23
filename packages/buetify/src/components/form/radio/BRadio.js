"use strict";
exports.__esModule = true;
exports.BRadio = exports.defineRadio = void 0;
require("./radio.sass");
var useSelectionControl_1 = require("../shared/useSelectionControl");
exports.defineRadio = useSelectionControl_1.useSelectionControl('radio', 'radio', 'b-radio', 'b-radio radio');
exports.BRadio = exports.defineRadio();
