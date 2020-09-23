"use strict";
exports.__esModule = true;
exports.route = void 0;
var vue_1 = require("vue");
exports.route = {
    path: '/',
    name: 'home',
    component: vue_1.defineAsyncComponent(function () { return Promise.resolve().then(function () { return require('./Home.vue'); }); })
};
