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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.B_DIALOG_CONTENT_NAME = void 0;
require("./dialog.sass");
var theme_1 = require("../../composables/theme");
var vue_1 = require("vue");
var theme_2 = require("./theme");
exports.B_DIALOG_CONTENT_NAME = 'b-dialog-content';
exports["default"] = vue_1.defineComponent({
    name: exports.B_DIALOG_CONTENT_NAME,
    props: __assign(__assign({}, theme_1.useThemePropsDefinition(theme_2.DialogTheme, true)), { size: {
            type: String,
            required: false
        }, cardClass: {
            type: String,
            required: false
        }, asCard: {
            type: Boolean,
            "default": true
        } }),
    setup: function (props, _a) {
        var slots = _a.slots;
        var themeClasses = theme_1.useTheme(props).themeClasses;
        return function () {
            var nodes = [];
            if (slots.header) {
                nodes.push(vue_1.h('header', { "class": 'modal-card-head' }, slots.header()));
            }
            nodes.push(vue_1.h('section', { "class": 'modal-card-body', 'is-titleless': !slots.header }, slots["default"] && slots["default"]()));
            if (slots.footer) {
                nodes.push(vue_1.h('footer', { "class": 'modal-card-foot' }, slots.footer()));
            }
            return vue_1.h('div', { "class": [props.size, 'b-dialog'] }, [
                vue_1.h('article', {
                    "class": __spreadArrays(['modal-card', { card: props.asCard }], themeClasses.value, [props.cardClass])
                }, nodes)
            ]);
        };
    }
});
