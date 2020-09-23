"use strict";
exports.__esModule = true;
require("./pageloader.sass");
var mergeClasses_1 = require("../../utils/mergeClasses");
var vue_1 = require("vue");
function BPageLoader(props, _a) {
    var attrs = _a.attrs;
    attrs.data = mergeClasses_1.mergeClasses(attrs["class"], 'b-pageloader is-active');
    attrs['data-content'] = props.text;
    return vue_1.h('div', attrs);
}
exports["default"] = BPageLoader;
