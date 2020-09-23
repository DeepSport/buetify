"use strict";
exports.__esModule = true;
require("./vertical-expansion-icon.sass");
var vue_1 = require("vue");
var angleDown_1 = require("../angleDown");
exports["default"] = vue_1.defineComponent({
    name: 'vertical-expansion-icon',
    props: {
        isExpanded: {
            type: Boolean,
            required: true
        }
    },
    setup: function (props) {
        return function () {
            return vue_1.h(angleDown_1.AngleDownIcon, {
                "class": ['vertical-expansion-icon', { 'is-expanded': props.isExpanded }]
            });
        };
    }
});
