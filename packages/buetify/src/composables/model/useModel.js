"use strict";
exports.__esModule = true;
exports.useModel = exports.getUseModelPropsDefinition = void 0;
var function_1 = require("fp-ts/lib/function");
var vue_1 = require("vue");
var helpers_1 = require("../../utils/helpers");
function getUseModelPropsDefinition(valueKey, updateKey) {
    var _a;
    if (valueKey === void 0) { valueKey = 'modelValue'; }
    if (updateKey === void 0) { updateKey = 'onUpdate:modelValue'; }
    // eslint-disable-line
    return _a = {},
        _a[valueKey] = null,
        _a[updateKey] = {
            type: Function,
            "default": function_1.constant(function_1.constVoid)
        },
        _a;
}
exports.getUseModelPropsDefinition = getUseModelPropsDefinition;
function useModel(props, valueKey, updateKey) {
    if (valueKey === void 0) { valueKey = 'modelValue'; }
    if (updateKey === void 0) { updateKey = 'onUpdate:modelValue'; }
    var internalValue = vue_1.shallowRef(props[valueKey]);
    vue_1.watch(vue_1.toRef(props, valueKey), function (newVal) {
        internalValue.value = newVal;
    });
    vue_1.watch(internalValue, function (newVal) { return props[updateKey](newVal); });
    function onUpdate(e) {
        // eslint-disable-next-line
        // @ts-ignore-next-line
        if (helpers_1.isObject(e.target) && helpers_1.exists(e.target.value)) {
            // eslint-disable-next-line
            // @ts-ignore-next-line
            internalValue.value = e.target.value;
        }
    }
    function set(val) {
        internalValue.value = val;
    }
    return {
        modelValue: internalValue,
        set: set,
        onNativeInput: onUpdate
    };
}
exports.useModel = useModel;
