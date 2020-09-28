"use strict";
exports.__esModule = true;
exports.DeferRendering = void 0;
var vue_1 = require("vue");
exports.DeferRendering = vue_1.defineComponent({
    name: 'defer-rendering',
    props: {
        frames: {
            type: Number,
            required: true
        }
    },
    setup: function (props, _a) {
        var slots = _a.slots;
        var currentFrame = vue_1.shallowRef(0);
        function checkRenderingStatus() {
            if (props.frames > 0) {
                if (window && window.requestAnimationFrame) {
                    var step_1 = function () {
                        requestAnimationFrame(function () {
                            if (currentFrame.value < props.frames) {
                                currentFrame.value++;
                                step_1();
                            }
                        });
                    };
                    step_1();
                }
                else {
                    setTimeout(function () { return (currentFrame.value = props.frames); }, props.frames * 16);
                }
            }
        }
        vue_1.onMounted(checkRenderingStatus);
        return function () {
            if (currentFrame.value >= props.frames) {
                return slots["default"]();
            }
            else {
                return undefined;
            }
        };
    }
});
