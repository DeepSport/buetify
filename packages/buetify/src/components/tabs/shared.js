"use strict";
exports.__esModule = true;
exports.BTabItemPropsDefinition = exports.DEFAULT_TAB_INJECTION = exports.TAB_ITEM_NAME = exports.TABS_SYMBOL = void 0;
var Option_1 = require("fp-ts/lib/Option");
var vue_1 = require("vue");
exports.TABS_SYMBOL = Symbol('tabs');
exports.TAB_ITEM_NAME = 'b-tab-item';
exports.DEFAULT_TAB_INJECTION = {
    activeLabel: vue_1.shallowRef(Option_1.none)
};
exports.BTabItemPropsDefinition = {
    label: {
        type: String,
        required: true
    },
    icon: {
        type: Function
    },
    isDisabled: {
        type: Boolean,
        "default": false
    },
    isVisible: {
        type: Boolean,
        "default": true
    }
};
