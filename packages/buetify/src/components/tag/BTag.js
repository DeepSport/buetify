"use strict";
exports.__esModule = true;
require("./tag.sass");
var vue_1 = require("vue");
exports["default"] = vue_1.defineComponent({
    name: 'b-tag',
    props: {
        tag: {
            type: String,
            "default": 'span'
        },
        isAttached: {
            type: Boolean,
            "default": false
        },
        isClosable: {
            type: Boolean,
            "default": false
        },
        variant: {
            type: String,
            "default": 'is-primary'
        },
        size: {
            type: String,
            "default": ''
        },
        isRounded: {
            type: Boolean,
            "default": false
        },
        isDisabled: {
            type: Boolean,
            "default": false
        },
        hasEllipsis: {
            type: Boolean,
            "default": false
        },
        isTabable: {
            type: Boolean,
            "default": false
        },
        onClose: {
            type: Function,
            required: false
        }
    },
    setup: function (props, _a) {
        var slots = _a.slots;
        return function () {
            if (props.isClosable) {
                return vue_1.h(props.tag, {
                    "class": 'tags has-addons'
                }, [
                    vue_1.h('span', {
                        "class": ['tag', props.variant, props.size, { 'is-rounded': props.isRounded }]
                    }, [vue_1.h('span', { "class": { 'has-ellipsis': props.hasEllipsis } }, slots["default"] && slots["default"]())]),
                    vue_1.h('button', {
                        "class": ['tag is-delete has-cursor-pointer', props.size, { 'is-rounded': props.isRounded }],
                        tabindex: props.isTabable ? 0 : null,
                        disabled: props.isDisabled,
                        onClick: props.isDisabled ? undefined : props.onClose
                    })
                ]);
            }
            else {
                return vue_1.h(props.tag, {
                    "class": ['tag', props.variant, props.size, { 'is-rounded': props.isRounded }]
                }, vue_1.h('span', { "class": { 'has-ellipsis': props.hasEllipsis } }, slots["default"] && slots["default"]()));
            }
        };
    }
});
