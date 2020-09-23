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
require("./pricing-table.sass");
var BPricingPlanPrice_1 = require("./BPricingPlanPrice");
var vue_1 = require("vue");
function BPricingPlan(props, _a) {
    var attrs = _a.attrs, slots = _a.slots;
    var nodes = [];
    if (slots.header) {
        nodes.push(vue_1.h('div', { "class": 'plan-header' }, slots.header()));
    }
    nodes.push(vue_1.h('div', { "class": 'plan-pricing-container' }, slots.price ? slots.price(props) : vue_1.h(BPricingPlanPrice_1["default"], props)));
    nodes.push(vue_1.h('div', { "class": 'plan-items' }, slots.items && slots.items()));
    if (slots.footer) {
        nodes.push(vue_1.h('div', { "class": 'plan-footer' }, slots.footer()));
    }
    return vue_1.h('section', __assign(__assign({}, attrs), { "class": ['pricing-plan', { 'is-active': !!props.isActive }] }), nodes);
}
exports["default"] = BPricingPlan;
