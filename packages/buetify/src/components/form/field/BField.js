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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.BFieldPropsDefinition = void 0;
require("../sass/tools.sass");
var function_1 = require("fp-ts/lib/function");
var fieldData_1 = require("../../../composables/fieldData");
var theme_1 = require("../../../composables/theme");
var vue_1 = require("vue");
var mergeClasses_1 = require("../../../utils/mergeClasses");
function getFieldClasses(props) {
    return vue_1.computed(function () {
        var isGrouped = props.isGrouped;
        var position = props.position;
        return {
            'flex-grow-1': props.isExpanded,
            'is-grouped-multiline': props.isGroupedMultiline,
            'is-horizontal': props.isHorizontal,
            'is-grouped-centered': isGrouped && position === 'is-centered',
            'is-grouped-right': isGrouped && position === 'is-right',
            'has-addons-centered': !isGrouped && position === 'is-centered',
            'has-addons-right': !isGrouped && position === 'is-right'
        };
    });
}
exports.BFieldPropsDefinition = __assign(__assign(__assign({}, theme_1.DefaultThemePropsDefinition), fieldData_1.ProvideFieldDataPropsDefinition), { isGrouped: {
        type: Boolean,
        "default": false
    }, isGroupedMultiline: {
        type: Boolean,
        "default": false
    }, position: {
        type: String,
        "default": 'is-left'
    }, isHorizontal: {
        type: Boolean,
        "default": false
    }, hasAddons: {
        type: Boolean,
        "default": true
    }, customLabelClass: {
        type: String,
        "default": ''
    } });
function generateInnerLabel(fieldData, customClass) {
    return vue_1.h('label', {
        "class": ['label', customClass],
        id: fieldData.labelId.value,
        "for": fieldData.id.value
    }, fieldData.label.value);
}
function generateHorizontalLabel(fieldData, customClass, size) {
    return vue_1.h('div', { "class": ['field-label', size] }, [generateInnerLabel(fieldData, customClass)]);
}
function generateLabel(isHorizontal, fieldData, customClass, size) {
    var label = fieldData.label.value;
    if (isHorizontal && !!label) {
        return [generateHorizontalLabel(fieldData, customClass, size)];
    }
    else if (!isHorizontal && !!label) {
        return [generateInnerLabel(fieldData, customClass)];
    }
    else {
        return [];
    }
}
function generateHelpMessage(isHorizontal, fieldDataAttrs) {
    var showHelpMessage = !isHorizontal && !!fieldDataAttrs.message.value;
    return vue_1.withDirectives(vue_1.h('p', {
        "class": ['help', fieldDataAttrs.messageVariant.value],
        'aria-hidden': showHelpMessage,
        innerHTML: fieldDataAttrs.message.value
    }), [[vue_1.vShow, showHelpMessage]]);
}
function generateBody(isHorizontal, fieldData, role, slots) {
    if (isHorizontal) {
        return [
            vue_1.h(BFieldBody, // eslint-disable-line
            {
                "class": { 'is-expanded': fieldData.isExpanded.value },
                message: fieldData.message.value,
                variant: fieldData.messageVariant.value,
                role: role
            }, slots["default"])
        ];
    }
    else {
        return slots["default"] ? slots["default"]() : [];
    }
}
function getFieldType(isGrouped, hasAddons, isHorizontal, slots) {
    return isGrouped
        ? 'is-grouped'
        : hasAddons && !isHorizontal && slots["default"] && slots["default"]().filter(function (n) { return !!n.el; }).length > 1
            ? 'has-addons'
            : '';
}
var BField = vue_1.defineComponent({
    name: 'b-field',
    props: exports.BFieldPropsDefinition,
    setup: function (props, _a) {
        var slots = _a.slots;
        var field = vue_1.shallowRef(null);
        var fieldData = fieldData_1.provideFieldData(props);
        var classes = getFieldClasses(props);
        var role = vue_1.computed(function () { return (props.isGrouped ? 'group' : ''); });
        var size = vue_1.shallowRef('');
        vue_1.watch(field, function (newVal) {
            if (props.isHorizontal && newVal) {
                // Bulma docs: .is-normal for any .input or .button
                var elements = newVal.querySelectorAll('.input, .select, .button, .textarea');
                if (elements.length > 0) {
                    size.value = 'is-normal';
                }
            }
        });
        return function () {
            return vue_1.h('div', {
                ref: field,
                "class": ['field', classes.value, getFieldType(props.isGrouped, props.hasAddons, props.isHorizontal, slots)],
                role: role.value
            }, __spreadArrays([
                generateLabel(props.isHorizontal, fieldData.attrs, props.customLabelClass, size.value)
            ], generateBody(props.isHorizontal, fieldData.attrs, role.value, slots), [
                generateHelpMessage(props.isHorizontal, fieldData.attrs)
            ]));
        };
    }
});
// eslint-disable-next-line
function BFieldBody(props, _a) {
    var _b;
    var attrs = _a.attrs, slots = _a.slots;
    var nodes = slots["default"] ? slots["default"]() : [];
    return vue_1.h((_b = props.tag) !== null && _b !== void 0 ? _b : 'div', {
        "class": mergeClasses_1.mergeClasses(attrs["class"], 'field-body')
    }, nodes.map(function (element) { return (element.el ? element : vue_1.h(BField, props, function_1.constant(element))); }));
}
exports["default"] = BField;
