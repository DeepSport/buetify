"use strict";
exports.__esModule = true;
exports.useEqRef = void 0;
var vue_1 = require("vue");
function useEqRef(eq) {
    return function (v) {
        return vue_1.customRef(function (track, trigger) {
            var value = v;
            return {
                get: function () {
                    track();
                    return value;
                },
                set: function (newValue) {
                    if (!eq.equals(newValue, value)) {
                        value = newValue;
                        trigger();
                    }
                }
            };
        });
    };
}
exports.useEqRef = useEqRef;
