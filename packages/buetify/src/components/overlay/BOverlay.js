"use strict";
exports.__esModule = true;
require("./overlay.sass");
var vue_1 = require("vue");
exports["default"] = vue_1.defineComponent({
    name: 'b-overlay',
    props: {
        position: {
            type: String,
            required: false
        },
        isActive: {
            type: Boolean,
            "default": false
        },
        isFullscreen: {
            type: Boolean,
            "default": false
        },
        onClick: {
            type: Function,
            required: false
        }
    },
    setup: function (props, _a) {
        var slots = _a.slots;
        return function () {
            if (props.isFullscreen) {
                return vue_1.withDirectives(vue_1.h('div', {
                    "class": ['b-overlay', props.position]
                }, [
                    vue_1.h('div', {
                        "class": 'b-overlay-background',
                        onClick: props.onClick
                    }),
                    vue_1.h('div', {
                        "class": 'b-overlay-content is-fullscreen'
                    }, slots["default"] && slots["default"]())
                ]), [[vue_1.vShow, props.isActive]]);
            }
            else {
                return vue_1.withDirectives(vue_1.h('div', {
                    "class": ['b-overlay', props.position]
                }, [
                    vue_1.h('div', {
                        onClick: props.onClick,
                        "class": 'b-overlay-background'
                    }),
                    vue_1.h('div', {
                        "class": 'b-overlay-content'
                    }, slots["default"] && slots["default"]())
                ]), [[vue_1.vShow, props.isActive]]);
            }
        };
    }
});
