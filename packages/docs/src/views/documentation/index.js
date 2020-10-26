"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.route = exports.meta = exports.menu = void 0;
var tslib_1 = require("tslib");
var vue_1 = require("vue");
var installation = tslib_1.__importStar(require("./installation"));
var components = tslib_1.__importStar(require("./components"));
var summary = tslib_1.__importStar(require("./summary"));
exports.menu = [installation.menu, components.menu];
exports.meta = tslib_1.__assign(tslib_1.__assign((_a = { '/': {
            title: 'Home',
            fullPath: '/',
            subPath: '',
            menu: '',
            breadcrumbs: ['/']
        }, '/documentation': {
            title: 'Documentation',
            subtitle: 'Info on how to get Buetify up and running',
            fullPath: '/documentation',
            subPath: 'documentation',
            menu: 'documentation',
            since: '0.1.0',
            breadcrumbs: ['/', '/documentation']
        } }, _a[summary.meta.fullPath] = summary.meta, _a), installation.meta), components.meta);
exports.route = {
    path: '/documentation',
    component: vue_1.defineAsyncComponent(function () { return Promise.resolve().then(function () { return tslib_1.__importStar(require('./Documentation.vue')); }); }),
    children: tslib_1.__spreadArrays([
        { path: '', redirect: { name: summary.meta.fullPath } },
        summary.route
    ], installation.routes, components.routes)
};
//# sourceMappingURL=index.js.map