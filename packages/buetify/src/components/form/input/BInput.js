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
exports.BInput = exports.defineInput = exports.getBInputPropsDefinition = void 0;
require("../sass/form.sass");
var useInput_1 = require("../../../composables/input/useInput");
var useTheme_1 = require("../../../composables/theme/useTheme");
var helpers_1 = require("../../../utils/helpers");
var function_1 = require("fp-ts/lib/function");
var types_1 = require("../shared/types");
var vue_1 = require("vue");
function getBInputPropsDefinition() {
    return __assign(__assign(__assign({}, useInput_1.getUseInputPropsDefinition()), useTheme_1.DefaultThemePropsDefinition), { isLoading: {
            type: Boolean,
            "default": false
        }, hasCounter: {
            type: Boolean,
            "default": true
        }, customInputClass: {
            type: String,
            "default": ''
        }, inputIcons: {
            type: Object,
            required: false,
            "default": function_1.constant(types_1.DEFAULT_INPUT_ICONS)
        } });
}
exports.getBInputPropsDefinition = getBInputPropsDefinition;
function getIconPosition(leftIcon, rightIcon) {
    if (leftIcon && rightIcon) {
        return 'has-icons-left has-icons-right';
    }
    else if (rightIcon) {
        return 'has-icons-right';
    }
    else if (leftIcon) {
        return 'has-icons-left';
    }
    else {
        return '';
    }
}
function getRightIcon(icons, variant, usePasswordReveal, passwordIsVisible) {
    if (usePasswordReveal) {
        return passwordIsVisible ? icons.passwordVisible : icons.passwordInvisible;
    }
    else {
        switch (variant) {
            case 'is-danger':
                return icons.isDanger;
            case 'is-info':
                return icons.isInfo;
            case 'is-success':
                return icons.isSuccess;
            case 'is-warning':
                return icons.isWarning;
            default:
                return undefined;
        }
    }
}
function generateLeftIcon(icon, size) {
    return vue_1.h(icon, {
        "class": 'is-left',
        size: size
    });
}
function generateRightIcon(icon, size, variant, usePasswordReveal, passwordToggle) {
    return vue_1.h(icon, __assign(__assign({ "class": ['is-right', { 'is-clickable': usePasswordReveal }], variant: variant,
        size: size }, passwordToggle.attrs.value), passwordToggle.listeners));
}
function generateCounter(isFocused, valueLength, maxLength) {
    return vue_1.h('small', {
        "class": ['help counter', { 'is-invisible': !isFocused }]
    }, valueLength + " / " + maxLength);
}
function getAutocomplete(autocomplete, type) {
    if (autocomplete && autocomplete.value) {
        return autocomplete.value;
    }
    else {
        switch (type) {
            case 'email':
                return 'email';
            case 'password':
                return 'password';
            default:
                return undefined;
        }
    }
}
function getInputClasses(size, isExpanded, isLoading, hasMessage, leftIcon, rightIcon, themeClasses) {
    return __spreadArrays(themeClasses, [
        getIconPosition(leftIcon, rightIcon),
        size,
        {
            'is-expanded': isExpanded,
            'is-loading': isLoading,
            'is-clearfix': !hasMessage
        }
    ]);
}
function generateNonTextInput(inputRef, inputData, isLoading, rightIcon, context, themeClasses) {
    var hasMessage = !!inputData.message.value;
    var type = inputData.type ? inputData.type.value : inputData.usePasswordReveal.value ? 'password' : undefined;
    return vue_1.h('input', __assign(__assign({}, context.attrs), { ref: inputRef, "class": __spreadArrays([
            'input'
        ], getInputClasses(inputData.iconSize.value, inputData.isExpanded.value, isLoading, hasMessage, inputData.icon && inputData.icon.value, rightIcon, themeClasses)), value: inputData.modelValue.value, onInput: inputData.onNativeInput, type: inputData.type ? inputData.type.value : undefined, autocomplete: getAutocomplete(inputData.autocomplete, type), maxlength: inputData.maxlength && inputData.maxlength.value, placeholder: inputData.placeholder && inputData.placeholder.value, onBlur: inputData.onBlur, onFocus: inputData.onFocus, required: inputData.isRequired.value, readonly: inputData.isReadonly.value, disabled: inputData.isDisabled.value, tabindex: inputData.isDisabled.value ? -1 : 0, id: inputData.id.value }));
}
function generateTextarea(inputRef, inputData, isLoading, rightIcon, context, themeClasses) {
    var hasMessage = !!inputData.message.value;
    return vue_1.h('textarea', __assign(__assign({}, context.attrs), { ref: inputRef, "class": __spreadArrays([
            'textarea'
        ], getInputClasses(inputData.iconSize.value, inputData.isExpanded.value, isLoading, hasMessage, inputData.icon && inputData.icon.value, rightIcon, themeClasses)), value: inputData.modelValue.value, onInput: inputData.onNativeInput, maxlength: inputData.maxlength && inputData.maxlength.value, placeholder: inputData.placeholder && inputData.placeholder.value, onBlur: inputData.onBlur, onFocus: inputData.onFocus, required: inputData.isRequired.value, readonly: inputData.isReadonly.value, disabled: inputData.isDisabled.value, tabindex: inputData.isDisabled.value ? -1 : 0, id: inputData.id.value }));
}
function generateInput(inputRef, inputData, isLoading, rightIcon, context, themeClasses) {
    var type = inputData.type && inputData.type.value;
    return type === 'textarea'
        ? generateTextarea(inputRef, inputData, isLoading, rightIcon, context, themeClasses)
        : generateNonTextInput(inputRef, inputData, isLoading, rightIcon, context, themeClasses);
}
function getValueLength(modelValue) {
    if (helpers_1.isString(modelValue)) {
        return modelValue.length;
    }
    else if (helpers_1.isNumber(modelValue)) {
        return modelValue.toString().length;
    }
    return 0;
}
function defineInput() {
    return vue_1.defineComponent({
        name: 'b-input',
        props: getBInputPropsDefinition(),
        setup: function (props, context) {
            var inputRef = vue_1.shallowRef(null);
            var inputData = useInput_1.useInput(props, inputRef);
            var rightIcon = vue_1.computed(function () {
                return getRightIcon(props.inputIcons, inputData.messageVariant.value, props.usePasswordReveal, inputData.passwordToggle.isOn.value);
            });
            var useCounter = vue_1.computed(function () {
                return (inputData.type === undefined || (inputData.modelValue && typeof inputData.modelValue.value !== 'number')) &&
                    !!inputData.maxlength &&
                    props.hasCounter;
            });
            var themeClasses = useTheme_1.useTheme(props).themeClasses;
            return function () {
                var nodes = [
                    generateInput(inputRef, inputData, props.isLoading, rightIcon.value, context, themeClasses.value)
                ];
                if (inputData.icon && inputData.icon.value) {
                    nodes.push(generateLeftIcon(inputData.icon.value, inputData.iconSize.value));
                }
                if (rightIcon.value) {
                    nodes.push(generateRightIcon(rightIcon.value, inputData.iconSize.value, inputData.messageVariant.value, props.usePasswordReveal, inputData.passwordToggle));
                }
                if (useCounter.value && inputData.maxlength && inputData.maxlength.value !== undefined) {
                    nodes.push(generateCounter(inputData.isFocused.value, getValueLength(inputData.modelValue.value), inputData.maxlength.value));
                }
                return vue_1.h('div', {
                    "class": [
                        'control',
                        getInputClasses(props.size, inputData.isExpanded.value, props.isLoading, !!inputData.message.value, inputData.icon && inputData.icon.value, rightIcon.value, themeClasses.value)
                    ]
                }, nodes);
            };
        }
    });
}
exports.defineInput = defineInput;
// eslint-disable-next-line
exports.BInput = defineInput();
