"use strict";
var _a;
exports.__esModule = true;
exports.menu = exports.routes = exports.meta = void 0;
var BuetifyMenu_1 = require("../shared/BuetifyMenu");
var accordion = require("./accordion");
var button = require("./button");
var dialog = require("./dialog");
exports.meta = (_a = {},
    _a[accordion.meta.fullPath] = accordion.meta,
    _a[button.meta.fullPath] = button.meta,
    _a[dialog.meta.fullPath] = dialog.meta,
    _a);
exports.routes = [accordion.route, button.route, dialog.route];
exports.menu = BuetifyMenu_1.group('UI Components', [
    accordion.menu,
    button.menu,
    dialog.menu
]);
