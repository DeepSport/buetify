"use strict";
exports.__esModule = true;
exports.useLabelId = exports.UseLabelIdPropsDefinition = void 0;
var vue_1 = require("vue");
var numId = 0;
exports.UseLabelIdPropsDefinition = {
    id: String,
    label: {
        type: String,
        "default": ''
    }
};
function useLabelId(props, prefix) {
    var newId = numId++;
    var id = vue_1.computed(function () { return (props.id ? props.id : prefix + "-" + newId); });
    var labelId = vue_1.computed(function () { return "label-for-" + id.value; });
    return {
        id: id,
        labelId: labelId,
        label: vue_1.toRef(props, 'label')
    };
}
exports.useLabelId = useLabelId;
