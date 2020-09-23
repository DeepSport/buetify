"use strict";
exports.__esModule = true;
var Array_1 = require("fp-ts/lib/Array");
var vue_1 = require("vue");
function BList(props, _a) {
    var _b, _c;
    var attrs = _a.attrs, slots = _a.slots;
    if (Array_1.isEmpty(props.items)) {
        return vue_1.h((_b = props.tag) !== null && _b !== void 0 ? _b : 'div', attrs, slots.empty && slots.empty());
    }
    else {
        var length_1 = props.items.length;
        return vue_1.h((_c = props.tag) !== null && _c !== void 0 ? _c : 'div', attrs, props.items.map(function (item, index) {
            return slots["default"]({
                item: item,
                index: index,
                length: length_1,
                isLast: index === length_1 - 1
            });
        }));
    }
}
exports["default"] = BList;
