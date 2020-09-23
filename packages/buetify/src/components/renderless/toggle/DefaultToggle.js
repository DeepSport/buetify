"use strict";
exports.__esModule = true;
exports.DefaultToggle = exports.defineToggle = void 0;
var toggle_1 = require("../../../composables/toggle");
var vue_1 = require("vue");
function defineToggle(statusName) {
    return vue_1.defineComponent({
        name: 'toggle',
        props: toggle_1.getUseTogglePropsDefinition(statusName),
        setup: function (props, _a) {
            var slots = _a.slots;
            var toggle = toggle_1.useToggle(props, statusName);
            return function () {
                return slots["default"] &&
                    slots["default"]({
                        attrs: toggle.attrs.value,
                        listeners: toggle.listeners,
                        isOn: toggle.isOn.value,
                        isOff: toggle.isOff.value,
                        setOn: toggle.setOn,
                        setOff: toggle.setOff,
                        toggle: toggle.toggle
                    });
            };
        }
    });
}
exports.defineToggle = defineToggle;
exports.DefaultToggle = defineToggle('status');
