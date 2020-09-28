"use strict";
exports.__esModule = true;
var Option_1 = require("fp-ts/lib/Option");
var vue_1 = require("vue");
var shared_1 = require("./shared");
exports["default"] = vue_1.defineComponent({
    name: shared_1.STEP_ITEM_NAME,
    props: shared_1.BStepItemPropsDefinition,
    setup: function (props, _a) {
        var slots = _a.slots;
        var injection = vue_1.inject(shared_1.STEPS_SYMBOL, shared_1.DEFAULT_STEP_INJECTION);
        return function () {
            return [
                vue_1.h('section', {
                    "class": 'step-item',
                    'aria-label': props.label
                }, slots["default"]({ isActive: Option_1.toUndefined(injection.activeLabel.value) === props.label }))
            ];
        };
    }
});
