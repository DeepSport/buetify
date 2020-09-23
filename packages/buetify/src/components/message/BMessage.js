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
require("./message.sass");
var message_1 = require("../../composables/message");
var transition_1 = require("../../composables/transition");
var vue_1 = require("vue");
function generateBody(props, context, message) {
    var nodes = [];
    if (!!message.icon.value && props.useIcon) {
        nodes.push(vue_1.h('div', { "class": 'media-left' }, [
            vue_1.h(message.icon.value, {
                size: message.iconSize.value,
                variant: props.variant,
                "class": props.variant
            })
        ]));
    }
    nodes.push(vue_1.h('div', { "class": 'media-content' }, (context.slots["default"] && context.slots["default"]()) || props.message));
    return vue_1.h('section', {
        "class": 'message-body',
        'aria-label': 'Close message'
    }, [vue_1.h('div', { "class": 'media' }, nodes)]);
}
function generateHeader(props, context, message) {
    var nodes = (context.slots.header && context.slots.header()) || [vue_1.h('h1', props.title)];
    if (props.isClosable) {
        nodes.push(vue_1.h('button', __assign({ "class": 'delete', attrs: { 'aria-label': "Close message" } }, message.listeners)));
    }
    return vue_1.h('header', { "class": 'message-header' }, nodes);
}
function generateMessage(props, context, message) {
    return vue_1.h('article', { "class": ['message', props.variant, props.size] }, context.slots.title || !!props.title
        ? [generateHeader(props, context, message), generateBody(props, context, message)]
        : [generateBody(props, context, message)]);
}
exports["default"] = vue_1.defineComponent({
    name: 'b-message',
    props: __assign(__assign({}, message_1.UseMessagePropsDefinition), transition_1.FadeTransitionPropsDefinition),
    setup: function (props, context) {
        var message = message_1.useMessage(props);
        var transition = transition_1.useTransition(props);
        return vue_1.h(vue_1.Transition, __assign({}, transition.value), message.isOn.value && generateMessage(props, context, message));
    }
});
