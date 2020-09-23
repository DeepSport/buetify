"use strict";
exports.__esModule = true;
exports.useProxy = void 0;
var vue_1 = require("vue");
function useProxy(ref, onUpdate) {
    var internalValue = vue_1.shallowRef(ref.value);
    vue_1.watch(ref, function (newValue) {
        internalValue.value = newValue;
    });
    var value = vue_1.computed({
        get: function () {
            return internalValue.value;
        },
        set: function (val) {
            internalValue.value = val;
            var update = vue_1.unref(onUpdate);
            if (update) {
                update(val);
            }
        }
    });
    return {
        value: value
    };
}
exports.useProxy = useProxy;
