"use strict";
exports.__esModule = true;
require("bulma/sass/components/navbar.sass");
var vue_1 = require("vue");
exports["default"] = vue_1.defineComponent({
    name: 'b-navbar-menu',
    props: {
        isActive: {
            type: Boolean,
            "default": false
        }
    },
    setup: function (props, _a) {
        var slots = _a.slots;
        return function () {
            return vue_1.h('div', {
                "class": ['navbar-menu', { isActive: props.isActive }]
            }, slots["default"] && slots["default"]());
        };
    }
});
