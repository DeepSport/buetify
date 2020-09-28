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
var vue_1 = require("vue");
function BPricingPlanPrice(props, _a) {
    var attrs = _a.attrs, slots = _a.slots;
    return vue_1.h('div', __assign(__assign({}, attrs), { "class": 'plan-price' }), [
        vue_1.h('span', { "class": 'plan-price-amount' }, [
            vue_1.h('span', { "class": 'plan-price-currency' }, slots.currency ? slots.currency() : '$'),
            "" + props.amount
        ]),
        "/" + props.interval
    ]);
}
exports["default"] = BPricingPlanPrice;
