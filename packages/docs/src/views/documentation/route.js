"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.route = void 0;
var vue_1 = require("vue");
var components_1 = require("./components");
var summary_1 = require("./summary");
exports.route = {
    path: '/documentation',
    component: vue_1.defineAsyncComponent(function () { return Promise.resolve().then(function () { return require('./Documentation.vue'); }); }),
    children: __spreadArrays([{ path: '', redirect: { name: summary_1.meta.fullPath } }, summary_1.route], components_1.routes)
};
