"use strict";
exports.__esModule = true;
exports.useInjectedSelectableTable = exports.useSelectableTable = exports.BTableSelectablePropsDefinition = void 0;
var function_1 = require("fp-ts/lib/function");
var vue_1 = require("vue");
var useProxy_1 = require("../../../composables/proxy/useProxy");
var helpers_1 = require("../../../utils/helpers");
var shared_1 = require("../shared");
var shared_2 = require("./shared");
exports.BTableSelectablePropsDefinition = {
    isSelectable: {
        type: Boolean,
        "default": false
    },
    selectedRows: {
        type: Array,
        "default": helpers_1.constEmptyArray
    },
    'onUpdate:selectedRows': {
        type: Function,
        "default": function_1.constant(function_1.constVoid)
    },
    onSelectRow: {
        type: Function,
        "default": function_1.constant(function_1.constVoid)
    },
    onUnselectRow: {
        type: Function,
        "default": function_1.constant(function_1.constVoid)
    }
};
var USE_SELECTABLE_TABLE_INJECTION_SYMBOL = Symbol();
function useSelectableTable(props) {
    var selectedRows = useProxy_1.useProxy(vue_1.computed(function () { return (props.isSelectable ? props.selectedRows : []); }), vue_1.toRef(props, 'onUpdate:selectedRows')).value;
    var selectedRowIds = vue_1.computed(function () { return shared_2.toSet(selectedRows.value); });
    function toggleRowSelection(row) {
        if (row.isSelectable) {
            var ids = selectedRowIds.value;
            ids.has(row.id) ? props.onUnselectRow(row) : props.onSelectRow(row);
            selectedRows.value = shared_1.toggleBTableRow(row, selectedRows.value);
        }
    }
    var state = {
        selectedRowIds: selectedRowIds,
        toggleRowSelection: toggleRowSelection
    };
}
exports.useSelectableTable = useSelectableTable;
function useDefaultSelectableTableState() {
    return {
        selectedRowIds: vue_1.computed(function () { return new Set(); }),
        toggleRowSelection: function_1.constVoid
    };
}
function useInjectedSelectableTable() {
    return vue_1.inject(USE_SELECTABLE_TABLE_INJECTION_SYMBOL, useDefaultSelectableTableState, true);
}
exports.useInjectedSelectableTable = useInjectedSelectableTable;
