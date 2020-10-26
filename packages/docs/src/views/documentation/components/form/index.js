"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.menu = exports.routes = exports.meta = void 0;
var tslib_1 = require("tslib");
var BuetifyMenu_1 = require("../../shared/BuetifyMenu");
var autocomplete = tslib_1.__importStar(require("./autocomplete"));
var checkbox = tslib_1.__importStar(require("./checkbox"));
var datepicker = tslib_1.__importStar(require("./datepicker"));
var field = tslib_1.__importStar(require("./field"));
var input = tslib_1.__importStar(require("./input"));
var numberInput = tslib_1.__importStar(require("./numberInput"));
var radio = tslib_1.__importStar(require("./radio"));
var select = tslib_1.__importStar(require("./select"));
var bSwitch = tslib_1.__importStar(require("./switch"));
exports.meta = (_a = {},
    _a[autocomplete.meta.fullPath] = autocomplete.meta,
    _a[checkbox.meta.fullPath] = checkbox.meta,
    _a[datepicker.meta.fullPath] = datepicker.meta,
    _a[field.meta.fullPath] = field.meta,
    _a[input.meta.fullPath] = input.meta,
    _a[numberInput.meta.fullPath] = numberInput.meta,
    _a[radio.meta.fullPath] = radio.meta,
    _a[select.meta.fullPath] = select.meta,
    _a[bSwitch.meta.fullPath] = bSwitch.meta,
    _a);
exports.routes = [
    autocomplete.route,
    checkbox.route,
    datepicker.route,
    field.route,
    input.route,
    numberInput.route,
    radio.route,
    select.route,
    bSwitch.route
];
exports.menu = BuetifyMenu_1.group('Form Controls', [
    autocomplete.menu,
    checkbox.menu,
    datepicker.menu,
    field.menu,
    input.menu,
    numberInput.menu,
    radio.menu,
    select.menu,
    bSwitch.menu
]);
//# sourceMappingURL=index.js.map