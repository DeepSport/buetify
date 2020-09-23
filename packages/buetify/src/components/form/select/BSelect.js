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
exports.BSelect = exports.defineSelect = exports.getBSelectPropsDefinition = void 0;
require("./select.sass");
var useInput_1 = require("../../../composables/input/useInput");
var shared_1 = require("../../../composables/shared");
var theme_1 = require("../../../composables/theme");
var helpers_1 = require("../../../utils/helpers");
var vue_1 = require("vue");
function getBSelectPropsDefinition(eq) {
    return __assign(__assign(__assign(__assign({}, shared_1.getEqPropsDefinition(eq)), useInput_1.getUseInputPropsDefinition()), theme_1.DefaultThemePropsDefinition), { items: {
            type: Array,
            required: true
        }, isMultiple: {
            type: Boolean,
            "default": false
        }, itemKey: {
            type: [String, Function]
        }, itemText: {
            type: [String, Function],
            "default": 'text'
        }, itemValue: {
            type: [String, Function],
            "default": 'value'
        }, itemDisabled: {
            type: [String, Function],
            "default": 'isDisabled'
        }, displayCount: {
            type: [String, Number]
        } });
}
exports.getBSelectPropsDefinition = getBSelectPropsDefinition;
function getControlClasses(isExpanded, hasIcon) {
    return {
        'is-expanded': isExpanded,
        'has-icons-left': hasIcon
    };
}
function isMultiple(props, input) {
    return props.isMultiple || (props.isMultiple === undefined && Array.isArray(input.modelValue.value));
}
function isEmpty(val) {
    return val === null || val === undefined || (Array.isArray(val) && val.length === 0);
}
function getSelectClasses(props, input) {
    return [
        input.size.value,
        props.variant,
        {
            'is-fullwidth': input.isFullwidth.value,
            'is-loading': props.isLoading,
            'is-multiple': isMultiple(props, input),
            'is-rounded': props.isRounded,
            'is-empty': isEmpty(input.modelValue.value)
        }
    ];
}
function generatePlaceholder(props, context) {
    return vue_1.h('option', {
        value: '',
        disabled: true,
        selected: true
    }, context.slots.placeholder ? context.slots.placeholder() : props.placeholder);
}
function getIsSelected(props, input) {
    return function (val) {
        var equals = props.eq.equals;
        var value = input.modelValue.value;
        if (value === null || value === undefined) {
            return false;
        }
        else if (isMultiple(props, input)) {
            return Array.isArray(value) ? value.some(function (v) { return equals(v, val); }) : false;
        }
        else {
            return equals(val, value);
        }
    };
}
function generateOptions(props, context, input) {
    var isSelected = getIsSelected(props, input);
    return props.items.map(function (item, index) {
        var isDisabled = helpers_1.extractProp(props.itemDisabled, item);
        return context.slots.option
            ? context.slots.option({ item: item, index: index })
            : vue_1.h('option', {
                key: props.itemKey ? helpers_1.extractProp(props.itemKey, item) : String(index),
                value: helpers_1.extractProp(props.itemValue, item),
                disabled: helpers_1.isBoolean(isDisabled) ? isDisabled : !isDisabled,
                selected: isSelected(item)
            }, context.slots["default"]
                ? context.slots["default"]({ item: item, index: index })
                : helpers_1.extractProp(props.itemText, item));
    });
}
function generateSelect(props, context, ref, input, themeClasses) {
    var value = input.modelValue.value;
    var usePlaceholder = isEmpty(value) && (!!props.placeholder || !!context.slots.placeholder);
    return vue_1.h('select', __assign(__assign({}, context.attrs), { ref: ref,
        value: value, size: props.displayCount, multiple: isMultiple(props, input), "class": themeClasses, onBlur: input.onBlur, onFocus: input.onFocus, onChange: input.onNativeInput }), usePlaceholder
        ? __spreadArrays([generatePlaceholder(props, context)], generateOptions(props, context, input)) : generateOptions(props, context, input));
}
function defineSelect(eq) {
    return vue_1.defineComponent({
        name: 'b-select',
        props: getBSelectPropsDefinition(eq),
        setup: function (props, context) {
            var selectRef = vue_1.shallowRef(null);
            var input = useInput_1.useInput(props, selectRef);
            var themeClasses = theme_1.useTheme(props).themeClasses;
            return function () {
                return vue_1.h('div', { "class": ['control', getControlClasses(input.isExpanded.value, !!input.icon)] }, [
                    vue_1.h('span', {
                        "class": __spreadArrays(['select'], getSelectClasses(props, input))
                    }, [generateSelect(props, context, selectRef, input, themeClasses.value)])
                ]);
            };
        }
    });
}
exports.defineSelect = defineSelect;
// eslint-disable-next-line
exports.BSelect = defineSelect();
