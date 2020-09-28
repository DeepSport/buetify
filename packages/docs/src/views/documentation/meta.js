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
var _a;
exports.__esModule = true;
exports.meta = void 0;
var components_1 = require("./components");
var summary_1 = require("./summary");
exports.meta = __assign((_a = { '/': {
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
        } }, _a[summary_1.meta.fullPath] = summary_1.meta, _a), components_1.meta);
