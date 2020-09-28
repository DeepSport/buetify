"use strict";
exports.__esModule = true;
exports.BIconPropsDefinition = void 0;
require("./icon.sass");
var helpers_1 = require("../../utils/helpers");
var vue_1 = require("vue");
function convertVariant(variant) {
    if (helpers_1.isString(variant)) {
        return variant.replace('is', 'has-text');
    }
    else {
        // eslint-disable-next-line
        var x = {};
        for (var k in variant) {
            var nk = k.replace('is', 'has-text');
            x[nk] = variant[k];
        }
        return x;
    }
}
exports.BIconPropsDefinition = {
    variant: {
        type: String,
        "default": ''
    },
    size: {
        type: String,
        "default": ''
    },
    tag: {
        type: String,
        "default": 'span'
    }
};
exports["default"] = vue_1.defineComponent({
    name: 'b-icon',
    props: exports.BIconPropsDefinition,
    setup: function (props, _a) {
        var slots = _a.slots;
        return function () {
            return vue_1.h(
            // eslint-disable-next-line
            props.tag, {
                "class": ['icon', props.size, convertVariant(props.variant)]
            }, 
            // eslint-disable-next-line
            slots["default"] && slots["default"]());
        };
    }
});
