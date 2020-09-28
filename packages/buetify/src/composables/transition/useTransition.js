"use strict";
exports.__esModule = true;
exports.useTransition = exports.formatTransition = exports.FadeTransitionPropsDefinition = exports.getUseTransitionPropsDefinition = void 0;
var function_1 = require("fp-ts/lib/function");
var vue_1 = require("vue");
var helpers_1 = require("../../utils/helpers");
function getUseTransitionPropsDefinition(transition) {
    return {
        transition: {
            type: [Object, String],
            "default": function_1.constant(transition)
        }
    };
}
exports.getUseTransitionPropsDefinition = getUseTransitionPropsDefinition;
exports.FadeTransitionPropsDefinition = getUseTransitionPropsDefinition('fade');
function formatTransition(transition) {
    return helpers_1.isString(transition) ? { name: transition, css: true } : transition;
}
exports.formatTransition = formatTransition;
function useTransition(props) {
    return vue_1.computed(function () { return formatTransition(props.transition); });
}
exports.useTransition = useTransition;
