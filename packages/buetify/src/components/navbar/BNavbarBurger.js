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
exports.__esModule = true;
require("bulma/sass/components/navbar.sass");
var Array_1 = require("fp-ts/lib/Array");
var vue_1 = require("vue");
var hamburgerLines = Array_1.makeBy(3, function () { return vue_1.h('span', { 'aria-hidden': true }); });
function BNavbarBurger(props, _a) {
    var attrs = _a.attrs;
    return vue_1.h(props.tag || 'button', __assign(__assign({}, attrs), { "class": ['navbar-burger', { 'is-active': !!props.isActive }], 'aria-expanded': !!props.isActive }), hamburgerLines);
}
exports["default"] = BNavbarBurger;
