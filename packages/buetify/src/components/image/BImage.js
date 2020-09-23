"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
require("bulma/sass/elements/image.sass");
var vue_1 = require("vue");
function BImage(props, _a) {
    var attrs = _a.attrs;
    return vue_1.h('figure', __assign(__assign({}, attrs), { "class": 'image' }), [
        vue_1.h('img', {
            "class": [
                props.imgClass,
                {
                    'is-rounded': props.isRounded
                }
            ],
            src: props.src,
            alt: props.alt
        })
    ]);
}
exports["default"] = BImage;
