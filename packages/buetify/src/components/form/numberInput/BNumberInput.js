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
exports.getNumberInputIcons = void 0;
require("./b-numberinput.sass");
var useInput_1 = require("../../../composables/input/useInput");
var function_1 = require("fp-ts/lib/function");
var vue_1 = require("vue");
var BButton_1 = require("../../button/BButton");
var BInput_1 = require("../input/BInput");
var types_1 = require("../shared/types");
var DEFAULT_NUMBER_INPUT_ICONS = {
    minus: vue_1.defineAsyncComponent(function () { return Promise.resolve().then(function () { return require('../../icons/minus'); }); }),
    plus: vue_1.defineAsyncComponent(function () { return Promise.resolve().then(function () { return require('../../icons/plus'); }); })
};
var BNumberInputPropsDefinition = __assign(__assign({}, useInput_1.getUseInputPropsDefinition()), { modelValue: {
        type: Number,
        "default": 0
    }, 'onUpdate:modelValue': {
        type: Function,
        "default": function_1.constant(function_1.constVoid)
    }, min: {
        type: Number,
        "default": Number.MIN_SAFE_INTEGER
    }, max: {
        type: Number,
        "default": Number.MAX_SAFE_INTEGER
    }, step: {
        type: Number,
        "default": 1
    }, displayControls: {
        type: Boolean,
        "default": true
    }, controlsRounded: {
        type: Boolean,
        "default": false
    }, controlsPosition: {
        type: String,
        "default": ''
    }, inputIcons: {
        type: Object,
        "default": function_1.constant(types_1.DEFAULT_INPUT_ICONS)
    }, numberInputIcons: {
        type: Object,
        "default": function_1.constant(DEFAULT_NUMBER_INPUT_ICONS)
    } });
function getNumberInputIcons(icons) {
    return __assign(__assign({}, DEFAULT_NUMBER_INPUT_ICONS), icons);
}
exports.getNumberInputIcons = getNumberInputIcons;
function getFieldClasses(controlsPosition) {
    var isCompact = controlsPosition === 'compact';
    return {
        'has-addons': isCompact,
        'is-grouped': !isCompact
    };
}
function generateControl(props, data, isDecrement) {
    return vue_1.h('p', {
        "class": 'control'
    }, [
        vue_1.h(BButton_1["default"], {
            variant: props.variant,
            size: props.size,
            isRounded: props.controlsRounded,
            isDisabled: isDecrement ? !data.canDecrement : !data.canIncrement,
            onClick: isDecrement ? data.onDecrement : data.onIncrement
        }, function () {
            return vue_1.h((isDecrement ? props.numberInputIcons.minus : props.numberInputIcons.plus), {
                size: props.size
            });
        })
    ]);
}
function generateInput(props) {
    return vue_1.h(BInput_1.BInput, {
        modelValue: props.modelValue,
        'onUpdate:modelValue': props['onUpdate:modelValue'],
        type: 'number',
        size: props.size,
        inputIcons: props.inputIcons,
        isReadonly: props.isReadonly,
        isLoading: props.isLoading,
        isRounded: props.isRounded,
        icon: props.icon,
        isExpanded: props.isExpanded,
        step: props.step,
        max: props.max,
        min: props.min
    });
}
exports["default"] = vue_1.defineComponent({
    name: 'b-number-input',
    props: BNumberInputPropsDefinition,
    setup: function (props) {
        var canDecrement = vue_1.computed(function () { return props.modelValue - props.step > props.min; });
        function onDecrement() {
            if (canDecrement.value) {
                props['onUpdate:modelValue'](props.modelValue - props.step);
            }
        }
        var canIncrement = vue_1.computed(function () { return props.modelValue + props.step < props.max; });
        function onIncrement() {
            if (canIncrement.value) {
                props['onUpdate:modelValue'](props.modelValue + props.step);
            }
        }
        return function () {
            var data = {
                canDecrement: canDecrement.value,
                canIncrement: canIncrement.value,
                onDecrement: onDecrement,
                onIncrement: onIncrement
            };
            var nodes = props.displayControls
                ? [generateControl(props, data, true), generateInput(props), generateControl(props, data, false)]
                : [generateInput(props)];
            return vue_1.h('div', { "class": ['b-number-input field', getFieldClasses(props.controlsPosition)] }, nodes);
        };
    }
});
