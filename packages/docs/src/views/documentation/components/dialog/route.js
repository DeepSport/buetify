"use strict";
exports.__esModule = true;
exports.route = void 0;
var vue_1 = require("vue");
var meta_1 = require("./meta");
exports.route = {
    component: vue_1.defineAsyncComponent(function () { return Promise.resolve().then(function () { return require('./Dialog.vue'); }); }),
    name: meta_1.meta.fullPath,
    path: meta_1.meta.subPath,
    meta: meta_1.meta
};
