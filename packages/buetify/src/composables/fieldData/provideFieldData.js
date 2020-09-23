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
exports.provideFieldData = exports.DEFAULT_FIELD_DATA_INJECTION = exports.formatMessage = exports.ProvideFieldDataPropsDefinition = exports.PROVIDE_FIELD_DATA_INJECTION_SYMBOL = void 0;
var function_1 = require("fp-ts/lib/function");
var vue_1 = require("vue");
var helpers_1 = require("../../utils/helpers");
var labelId_1 = require("../labelId");
exports.PROVIDE_FIELD_DATA_INJECTION_SYMBOL = Symbol('use-field-data');
exports.ProvideFieldDataPropsDefinition = __assign(__assign({}, labelId_1.UseLabelIdPropsDefinition), { variant: {
        type: [String, Object],
        required: false
    }, message: {
        type: [String, Array, Object],
        required: false
    }, isExpanded: {
        type: Boolean,
        "default": false
    } });
function formatMessage(message) {
    if (helpers_1.isString(message)) {
        return message;
    }
    else {
        var messages_1 = [];
        if (Array.isArray(message)) {
            message.forEach(function (m) {
                if (helpers_1.isString(m)) {
                    messages_1.push(m);
                }
                else {
                    for (var key in m) {
                        if (m[key]) {
                            messages_1.push(key);
                        }
                    }
                }
            });
        }
        else {
            for (var key in message) {
                if (message[key]) {
                    messages_1.push(key);
                }
            }
        }
        return messages_1.filter(function_1.not(helpers_1.isEmptyString)).join(' <br> ');
    }
}
exports.formatMessage = formatMessage;
exports.DEFAULT_FIELD_DATA_INJECTION = {
    attrs: {
        label: vue_1.shallowRef(''),
        isFullwidth: vue_1.shallowRef(false),
        isExpanded: vue_1.shallowRef(false),
        message: vue_1.shallowRef(''),
        messageVariant: vue_1.shallowRef(),
        id: vue_1.shallowRef(),
        labelId: vue_1.shallowRef()
    },
    setters: {
        onNewMessage: function_1.constVoid,
        onNewVariant: function_1.constVoid
    }
};
function provideFieldData(props) {
    var label = labelId_1.useLabelId(props, 'field');
    var variant = vue_1.shallowRef(props.variant);
    vue_1.watch(vue_1.toRef(props, 'variant'), function (newVariant) {
        variant.value = newVariant;
    });
    var message = vue_1.shallowRef(props.message);
    vue_1.watch(vue_1.toRef(props, 'message'), function (newMessage) {
        message.value = newMessage;
    });
    var formattedMessage = vue_1.computed(function () { return formatMessage(message.value); });
    var isExpanded = vue_1.toRef(props, 'isExpanded');
    var attrs = {
        label: vue_1.toRef(props, 'label'),
        isFullwidth: isExpanded,
        isExpanded: isExpanded,
        message: formattedMessage,
        messageVariant: variant,
        id: label.id,
        labelId: label.labelId
    };
    var setters = {
        onNewMessage: function (newMessage) {
            message.value = newMessage;
        },
        onNewVariant: function (newVariant) {
            variant.value = newVariant;
        }
    };
    var injection = {
        attrs: attrs,
        setters: setters
    };
    vue_1.provide(exports.PROVIDE_FIELD_DATA_INJECTION_SYMBOL, injection);
    return injection;
}
exports.provideFieldData = provideFieldData;
