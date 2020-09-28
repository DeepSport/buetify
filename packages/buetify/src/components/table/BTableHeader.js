"use strict";
exports.__esModule = true;
var BCheckbox_1 = require("../form/checkbox/BCheckbox");
var BTableColumn_1 = require("./BTableColumn");
var useCheckableTable_1 = require("./composables/useCheckableTable");
var vue_1 = require("vue");
function BTableHeader(props, _a) {
    var slots = _a.slots;
    var _b = useCheckableTable_1.useInjectedCheckableTable(), allRowsChecked = _b.allRowsChecked, toggleAllRows = _b.toggleAllRows, variant = _b.variant, isCheckable = _b.isCheckable;
    var nodes = props.columns.map(function (column) {
        return vue_1.h(BTableColumn_1["default"], {
            key: column.label,
            column: column,
            sortType: props.sortType,
            'onUpdate:sortType': props['onUpdate:sortType'],
            'onUpdate:sortColumn': props['onUpdate:sortColumn']
        }, slots);
    });
    if (isCheckable.value) {
        nodes.unshift(slots['header.checkbox']
            ? vue_1.h('th', slots['header.checkbox']({
                modelValue: allRowsChecked.value,
                variant: variant.value,
                isDisabled: props.isDisabled,
                'onUpdate:modelValue': toggleAllRows
            }))
            : vue_1.h('th', { "class": 'checkbox-cell' }, [
                vue_1.h(BCheckbox_1.BCheckbox, {
                    modelValue: allRowsChecked.value,
                    variant: variant.value,
                    isDisabled: props.isDisabled,
                    'onUpdate:modelValue': toggleAllRows
                })
            ]));
    }
    return vue_1.h('thead', [vue_1.h('tr', nodes)]);
}
exports["default"] = BTableHeader;
