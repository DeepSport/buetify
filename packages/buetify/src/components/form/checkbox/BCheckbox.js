"use strict";
exports.__esModule = true;
exports.BCheckbox = exports.defineCheckbox = void 0;
require("./checkbox.sass");
var useSelectionControl_1 = require("../shared/useSelectionControl");
exports.defineCheckbox = useSelectionControl_1.useSelectionControl('checkbox', 'checkbox', 'b-checkbox', 'b-checkbox checkbox');
exports.BCheckbox = exports.defineCheckbox();
