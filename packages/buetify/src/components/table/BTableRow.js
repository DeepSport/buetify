"use strict";
exports.__esModule = true;
var BCheckbox_1 = require("../form/checkbox/BCheckbox");
var helpers_1 = require("../../utils/helpers");
var useCheckableTable_1 = require("./composables/useCheckableTable");
var useSelectableTable_1 = require("./composables/useSelectableTable");
var vue_1 = require("vue");
exports["default"] = vue_1.defineComponent({
    name: 'b-table-row',
    props: {
        columns: {
            type: Array,
            required: true
        },
        row: {
            type: Object,
            required: true
        },
        onRowClick: {
            type: Function,
            required: false
        }
    },
    setup: function (props, _a) {
        var slots = _a.slots;
        var _b = useCheckableTable_1.useInjectedCheckableTable(), checkedRowIds = _b.checkedRowIds, variant = _b.variant, toggleRow = _b.toggleRow;
        var _c = useSelectableTable_1.useInjectedSelectableTable(), selectedRowIds = _c.selectedRowIds, toggleRowSelection = _c.toggleRowSelection;
        var isChecked = vue_1.computed(function () { return checkedRowIds.value.has(props.row.id); });
        var isSelected = vue_1.computed(function () { return selectedRowIds.value.has(props.row.id); });
        var classes = vue_1.computed(function () {
            return [
                {
                    'is-selected': isSelected.value,
                    'is-checked': isChecked.value,
                    'is-draggable': props.row.isDraggable,
                    'is-droppable': props.row.isDroppable
                },
                props.row.classes
            ];
        });
        return function () {
            var columns = props.columns.map(function (column) {
                var children = [];
                var value = helpers_1.isString(column.value)
                    ? helpers_1.getObjectValueByPath(props.row.data, column.value)
                    : column.value && column.value(props.row);
                var columnSlot = slots[column.slotName || column.label];
                if (columnSlot) {
                    children.push(columnSlot({ row: props.row, column: column, value: value }));
                }
                else {
                    children.push(value == null ? value : String(value));
                }
                var textClass = column.position === 'is-left'
                    ? 'has-text-left'
                    : column.position === 'is-centered'
                        ? 'has-text-centered'
                        : 'has-text-right';
                return vue_1.h('td', {
                    "class": [textClass, { 'is-sticky-left': column.isSticky }],
                    'data-label': column.label
                }, children);
            });
            if (props.row.isCheckable) {
                columns.unshift(vue_1.h('td', { "class": 'checkbox-cell' }, [
                    vue_1.h(BCheckbox_1.BCheckbox, {
                        modelValue: isChecked.value,
                        variant: variant.value,
                        'onUpdate:modelValue': toggleRow
                    })
                ]));
            }
            return vue_1.h('tr', {
                "class": classes.value,
                onClick: function (e) {
                    if (props.onRowClick) {
                        props.onRowClick(props.row, e);
                    }
                    if (props.row.isSelectable) {
                        e.stopPropagation();
                        toggleRowSelection(props.row);
                    }
                },
                draggable: props.row.isDraggable
            }, columns);
        };
    }
});
