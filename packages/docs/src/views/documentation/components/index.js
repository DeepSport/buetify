"use strict";
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.menu = exports.routes = exports.meta = void 0;
var tslib_1 = require("tslib");
var BuetifyMenu_1 = require("../shared/BuetifyMenu");
var accordion = tslib_1.__importStar(require("./accordion"));
var button = tslib_1.__importStar(require("./button"));
var dialog = tslib_1.__importStar(require("./dialog"));
var dropdown = tslib_1.__importStar(require("./dropdown"));
var form = tslib_1.__importStar(require("./form"));
var icon = tslib_1.__importStar(require("./icon"));
var menu_ = tslib_1.__importStar(require("./menu"));
var message = tslib_1.__importStar(require("./message"));
var modal = tslib_1.__importStar(require("./modal"));
var loading = tslib_1.__importStar(require("./loading"));
var notification = tslib_1.__importStar(require("./notification"));
var pagination = tslib_1.__importStar(require("./pagination"));
var snackbar = tslib_1.__importStar(require("./snackbar"));
var steps = tslib_1.__importStar(require("./steps"));
var table = tslib_1.__importStar(require("./table"));
var tabs = tslib_1.__importStar(require("./tabs"));
var tag = tslib_1.__importStar(require("./tag"));
var toast = tslib_1.__importStar(require("./toast"));
var tooltip = tslib_1.__importStar(require("./tooltip"));
exports.meta = tslib_1.__assign(tslib_1.__assign((_a = {}, _a[accordion.meta.fullPath] = accordion.meta, _a[button.meta.fullPath] = button.meta, _a[dialog.meta.fullPath] = dialog.meta, _a[dropdown.meta.fullPath] = dropdown.meta, _a), form.meta), (_b = {}, _b[icon.meta.fullPath] = icon.meta, _b[loading.meta.fullPath] = loading.meta, _b[menu_.meta.fullPath] = menu_.meta, _b[message.meta.fullPath] = message.meta, _b[modal.meta.fullPath] = modal.meta, _b[notification.meta.fullPath] = notification.meta, _b[pagination.meta.fullPath] = pagination.meta, _b[snackbar.meta.fullPath] = snackbar.meta, _b[steps.meta.fullPath] = steps.meta, _b[table.meta.fullPath] = steps.meta, _b[tabs.meta.fullPath] = tabs.meta, _b[tag.meta.fullPath] = tag.meta, _b[toast.meta.fullPath] = tag.meta, _b[tooltip.meta.fullPath] = tooltip.meta, _b));
exports.routes = tslib_1.__spreadArrays([
    accordion.route,
    button.route,
    dialog.route,
    dropdown.route
], form.routes, [
    icon.route,
    loading.route,
    menu_.route,
    message.route,
    modal.route,
    notification.route,
    pagination.route,
    snackbar.route,
    steps.route,
    table.route,
    tabs.route,
    tag.route,
    toast.route,
    tooltip.route
]);
exports.menu = BuetifyMenu_1.group('UI Components', [
    accordion.menu,
    button.menu,
    dialog.menu,
    dropdown.menu,
    form.menu,
    icon.menu,
    loading.menu,
    menu_.menu,
    message.menu,
    modal.menu,
    notification.menu,
    pagination.menu,
    snackbar.menu,
    steps.menu,
    table.menu,
    tabs.menu,
    tag.menu,
    toast.menu,
    tooltip.menu
]);
//# sourceMappingURL=index.js.map