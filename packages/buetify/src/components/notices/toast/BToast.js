"use strict";
exports.__esModule = true;
var noticeController_1 = require("../../../composables/noticeController");
var vue_1 = require("vue");
var toast_1 = require("../../../composables/toast");
exports["default"] = vue_1.defineComponent({
    name: 'b-toast',
    props: noticeController_1.UseNoticePropsDefinition,
    setup: function (props, _a) {
        var slots = _a.slots;
        var controller = toast_1.useToast(props, slots);
        return function () { return slots["default"] && slots["default"](controller); };
    }
});
