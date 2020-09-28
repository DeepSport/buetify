"use strict";
exports.__esModule = true;
require("bulma/sass/elements/button.sass");
var vue_1 = require("vue");
function useButtonClasses(props) {
    return [
        'button',
        props.variant,
        props.size,
        {
            'is-rounded': props.isRounded,
            'is-loading': props.isLoading,
            'is-outlined': props.isOutlined,
            'is-inverted': props.isInverted,
            'is-focused': props.isFocused,
            'is-active': props.isActive,
            'is-disabled': props.isDisabled,
            'is-hovered': props.isHovered,
            'is-selected': props.isSelected,
            'is-fullwidth': props.isFullwidth
        }
    ];
}
exports["default"] = vue_1.defineComponent({
    name: 'b-button',
    props: {
        tag: {
            type: String,
            "default": 'button',
            validator: function (val) { return ['button', 'a', 'input'].includes(val); }
        },
        size: {
            type: String,
            "default": ''
        },
        variant: {
            type: String,
            "default": ''
        },
        isRounded: {
            type: Boolean,
            "default": false
        },
        isLoading: {
            type: Boolean,
            "default": false
        },
        isOutlined: {
            type: Boolean,
            "default": false
        },
        isInverted: {
            type: Boolean,
            "default": false
        },
        isFocused: {
            type: Boolean,
            "default": false
        },
        isActive: {
            type: Boolean,
            "default": false
        },
        isDisabled: {
            type: Boolean,
            "default": false
        },
        isHovered: {
            type: Boolean,
            "default": false
        },
        isSelected: {
            type: Boolean,
            "default": false
        },
        isFullwidth: {
            type: Boolean,
            "default": false
        }
    },
    setup: function (props, _a) {
        var slots = _a.slots;
        return function () {
            return vue_1.h(props.tag, {
                "class": useButtonClasses(props),
                disabled: props.isDisabled ? true : null
            }, slots["default"] && slots["default"]());
        };
    }
});
