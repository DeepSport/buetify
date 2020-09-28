"use strict";
exports.__esModule = true;
require("./tooltip.sass");
var vue_1 = require("vue");
function BTooltip(props, _a) {
    var slots = _a.slots;
    return vue_1.h(props.tag || 'span', {
        "class": [
            'b-tooltip',
            props.variant || 'is-primary',
            props.size,
            props.position || 'is-top',
            {
                'b-tooltip': !!props.isActive,
                'is-always': !!props.isAlways,
                'is-animated': !!props.isAnimated,
                'is-square': !!props.isSquare,
                'is-dashed': !!props.isDashed,
                'is-multilined': !!props.isMultilined
            }
        ],
        'data-label': props.label
    }, slots["default"] ? slots["default"]() : undefined);
}
exports["default"] = BTooltip;
