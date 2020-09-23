"use strict";
exports.__esModule = true;
require("./tag.sass");
var mergeClasses_1 = require("../../utils/mergeClasses");
var vue_1 = require("vue");
function BTagList(props, _a) {
    var _b;
    var attrs = _a.attrs, slots = _a.slots;
    attrs["class"] = mergeClasses_1.mergeClasses(attrs["class"], ['tags', { 'has-addons': !!props.isAttached }]);
    return vue_1.h((_b = props.tag) !== null && _b !== void 0 ? _b : 'div', attrs, slots["default"]());
}
exports["default"] = BTagList;
