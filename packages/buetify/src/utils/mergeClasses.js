"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.mergeClasses = void 0;
var function_1 = require("fp-ts/lib/function");
var helpers_1 = require("./helpers");
function mergeClasses(existingClasses, newClasses) {
    if (Array.isArray(existingClasses)) {
        return __spreadArrays(existingClasses.filter(function_1.identity), (Array.isArray(newClasses) ? newClasses.filter(function_1.identity) : [newClasses]));
    }
    else if (helpers_1.isObject(existingClasses) || helpers_1.isString(existingClasses)) {
        return __spreadArrays([existingClasses], (Array.isArray(newClasses) ? newClasses.filter(function_1.identity) : [newClasses]));
    }
    else {
        return newClasses;
    }
}
exports.mergeClasses = mergeClasses;
