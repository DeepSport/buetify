"use strict";
exports.__esModule = true;
exports.useNoticeController = exports.DEFAULT_USE_NOTICE_PROPS = exports.UseNoticePropsDefinition = void 0;
var function_1 = require("fp-ts/lib/function");
var vue_1 = require("vue");
var transition_1 = require("../transition");
var provideNoticeController_1 = require("./provideNoticeController");
exports.UseNoticePropsDefinition = {
    transition: {
        type: [Object, String],
        required: false
    },
    position: {
        type: String,
        "default": 'is-bottom'
    },
    duration: {
        type: Number,
        "default": 2000
    },
    message: {
        type: String
    },
    shouldQueue: {
        type: Boolean,
        "default": true
    },
    variant: {
        type: String,
        "default": 'is-primary'
    },
    isIndefinite: {
        type: Boolean,
        "default": false
    }
};
exports.DEFAULT_USE_NOTICE_PROPS = {
    position: exports.UseNoticePropsDefinition.position["default"],
    duration: exports.UseNoticePropsDefinition.duration["default"],
    shouldQueue: exports.UseNoticePropsDefinition.shouldQueue["default"],
    variant: exports.UseNoticePropsDefinition.variant["default"],
    isIndefinite: exports.UseNoticePropsDefinition.isIndefinite["default"]
};
function useNoticeTransition(props) {
    if (props === void 0) { props = exports.DEFAULT_USE_NOTICE_PROPS; }
    return vue_1.computed(function () {
        if (props.transition) {
            return transition_1.formatTransition(props.transition);
        }
        else {
            switch (props.position) {
                case 'is-top-right':
                case 'is-top':
                case 'is-top-left':
                    return {
                        'enter-active-class': 'fadeInDown',
                        'leave-active-class': 'fadeOut'
                    };
                case 'is-bottom-right':
                case 'is-bottom':
                case 'is-bottom-left':
                    return {
                        'enter-active-class': 'fadeInUp',
                        'leave-active-class': 'fadeOut'
                    };
            }
        }
    });
}
function useNoticeController(props, render) {
    var remove = vue_1.shallowRef(function_1.constVoid);
    var showNotice = vue_1.inject(provideNoticeController_1.NOTICE_CONTROLLER_SYMBOL, provideNoticeController_1.DEFAULT_NOTICE_CONTROLLER_INJECTION).showNotice;
    var transition = useNoticeTransition(props);
    vue_1.onUnmounted(function () {
        remove.value();
    });
    function open(options) {
        var _a, _b, _c, _d, _e, _f, _g;
        var position = (_a = options.position) !== null && _a !== void 0 ? _a : props.position;
        remove.value();
        console.log({
            placement: position.includes('top') ? 'top' : 'bottom',
            render: render.value(options),
            transition: (_b = options.transition) !== null && _b !== void 0 ? _b : transition.value,
            shouldQueue: (_c = options.shouldQueue) !== null && _c !== void 0 ? _c : props.shouldQueue,
            duration: (_d = options.duration) !== null && _d !== void 0 ? _d : props.duration
        });
        remove.value = showNotice({
            placement: position.includes('top') ? 'top' : 'bottom',
            render: render.value(options),
            transition: (_e = options.transition) !== null && _e !== void 0 ? _e : transition.value,
            shouldQueue: (_f = options.shouldQueue) !== null && _f !== void 0 ? _f : props.shouldQueue,
            duration: (_g = options.duration) !== null && _g !== void 0 ? _g : props.duration
        });
    }
    return {
        open: open,
        close: function () {
            remove.value();
            remove.value = function_1.constVoid;
        }
    };
}
exports.useNoticeController = useNoticeController;
