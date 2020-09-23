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
exports.useSelectionControl = void 0;
var useSelectionControl_1 = require("../../../composables/selectionControl/useSelectionControl");
var vue_1 = require("vue");
function generateCheck(variant) {
    return vue_1.h('span', { "class": [variant, 'check'] });
}
function generateInput(selectionControl) {
    return vue_1.h('input', __assign(__assign({}, selectionControl.attrs.value), { onBlur: selectionControl.onBlur, onChange: selectionControl.onChange, onFocus: selectionControl.onFocus }));
}
function generateLabelText(selectionControl, slots) {
    return vue_1.h('span', {
        "class": 'control-label'
    }, slots["default"] && slots["default"]());
}
function useSelectionControl(role, type, name, staticClass) {
    return function () {
        return vue_1.defineComponent({
            name: name,
            props: useSelectionControl_1.getUseSelectablePropsDefinition(),
            setup: function (props, _a) {
                var slots = _a.slots;
                var label = vue_1.shallowRef(null);
                var selection = useSelectionControl_1.useSelectionControl(props, label, role, type);
                return function () {
                    return vue_1.h('label', {
                        "class": [staticClass, props.size, { 'is-disabled': selection.isDisabled.value }],
                        ref: label,
                        id: selection.label.labelId.value,
                        "for": selection.label.id.value,
                        disabled: selection.isDisabled.value || null,
                        tabindex: selection.isDisabled.value ? -1 : 0,
                        onKeydown: selection.onKeydown,
                        onBlur: selection.onBlur,
                        onClick: selection.onClick
                    }, [generateInput(selection), generateCheck(props.variant), generateLabelText(selection, slots)]);
                };
            }
        });
    };
}
exports.useSelectionControl = useSelectionControl;
