"use strict";
exports.__esModule = true;
exports.BStepItemPropsDefinition = exports.DEFAULT_STEP_INJECTION = exports.STEP_ITEM_NAME = exports.STEPS_SYMBOL = void 0;
var vue_1 = require("vue");
var Option_1 = require("fp-ts/lib/Option");
exports.STEPS_SYMBOL = Symbol('steps');
exports.STEP_ITEM_NAME = 'b-step-item';
exports.DEFAULT_STEP_INJECTION = {
    activeLabel: vue_1.shallowRef(Option_1.none)
};
exports.BStepItemPropsDefinition = {
    label: {
        type: String,
        required: true
    },
    variant: {
        type: String,
        "default": ''
    },
    icon: {
        type: Function
    },
    isClickable: {
        type: Boolean,
        "default": false
    },
    isCompleted: {
        type: Boolean,
        "default": false
    },
    isVisible: {
        type: Boolean,
        "default": true
    }
};
