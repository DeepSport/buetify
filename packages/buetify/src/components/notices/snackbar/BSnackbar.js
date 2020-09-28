"use strict";
exports.__esModule = true;
require("../sass/notices.sass");
var vue_1 = require("vue");
var snackbar_1 = require("../../../composables/snackbar");
exports["default"] = vue_1.defineComponent({
    name: 'b-snackbar',
    props: snackbar_1.SnackbarPropsDefinition,
    setup: function (props, _a) {
        var slots = _a.slots;
        var controller = snackbar_1.useSnackbar(props, slots);
        return function () { return slots["default"] && slots["default"](controller); };
    }
});
