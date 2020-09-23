"use strict";
exports.__esModule = true;
exports.useInjectedCheckableTable = exports.useCheckableTable = exports.BTableCheckPropsDefinition = void 0;
var vue_1 = require("vue");
var function_1 = require("fp-ts/lib/function");
var useProxy_1 = require("../../../composables/proxy/useProxy");
var helpers_1 = require("../../../utils/helpers");
var shared_1 = require("../shared");
var shared_2 = require("./shared");
exports.BTableCheckPropsDefinition = {
    isCheckable: {
        type: Boolean,
        "default": false
    },
    checkedRows: {
        type: Array,
        "default": helpers_1.constEmptyArray()
    },
    'onUpdate:checkedRows': {
        type: Function,
        "default": function_1.constant(function_1.constVoid)
    },
    checkboxVariant: {
        type: String,
        "default": 'is-primary'
    },
    canCheckAllRows: {
        type: Boolean,
        "default": true
    },
    onCheckRow: {
        type: Function,
        "default": function_1.constant(function_1.constVoid)
    },
    onUncheckRow: {
        type: Function,
        "default": function_1.constant(function_1.constVoid)
    }
};
var USE_CHECKABLE_TABLE_INJECTION_SYMBOL = Symbol();
function useCheckableTable(props, rows) {
    var checkableRows = vue_1.computed(function () { return (props.isCheckable ? rows.value.filter(function (row) { return row.isCheckable; }) : []); });
    var checkedRows = useProxy_1.useProxy(vue_1.computed(function () { return (props.isCheckable ? props.checkedRows : []); }), vue_1.toRef(props, 'onUpdate:checkedRows')).value;
    var checkedRowIds = vue_1.computed(function () { return shared_2.toSet(checkedRows.value); });
    var allRowsChecked = vue_1.computed(function () {
        var ids = checkedRowIds.value;
        return checkableRows.value.length > 0 && checkableRows.value.every(function (row) { return ids.has(row.id); });
    });
    var allRowsUncheckable = vue_1.computed(function () { return rows.value.every(function (row) { return !row.isCheckable; }); });
    function checkAllRows() {
        checkedRows.value = checkableRows.value;
    }
    function toggleRow(row) {
        if (row.isCheckable) {
            var ids = checkedRowIds.value;
            ids.has(row.id) ? props.onUncheckRow(row) : props.onCheckRow(row);
            checkedRows.value = shared_1.toggleBTableRow(row, checkedRows.value);
        }
    }
    function uncheckAllRows() {
        checkedRows.value = [];
    }
    function toggleAllRows() {
        allRowsChecked.value ? uncheckAllRows() : checkAllRows();
    }
    var hasCheckableRows = vue_1.computed(function () { return checkableRows.value.length > 0; });
    var state = {
        isCheckable: vue_1.computed(function () { return props.isCheckable; }),
        variant: vue_1.computed(function () { return props.checkboxVariant; }),
        checkedRowIds: checkedRowIds,
        toggleAllRows: toggleAllRows,
        checkAllRows: checkAllRows,
        uncheckAllRows: uncheckAllRows,
        allRowsChecked: allRowsChecked,
        toggleRow: toggleRow,
        allRowsUncheckable: allRowsUncheckable,
        hasCheckableRows: hasCheckableRows,
        allRowsUnchecked: vue_1.computed(function () { return hasCheckableRows.value && checkedRowIds.value.size === 0; })
    };
    vue_1.provide(USE_CHECKABLE_TABLE_INJECTION_SYMBOL, state);
    return state;
}
exports.useCheckableTable = useCheckableTable;
function useDefaultCheckableTableState() {
    return {
        isCheckable: vue_1.computed(function_1.constFalse),
        variant: vue_1.computed(function () { return 'is-primary'; }),
        checkedRowIds: vue_1.computed(function () { return new Set(); }),
        toggleAllRows: function_1.constVoid,
        checkAllRows: function_1.constVoid,
        uncheckAllRows: function_1.constVoid,
        toggleRow: function_1.constVoid,
        allRowsChecked: vue_1.computed(function_1.constFalse),
        allRowsUncheckable: vue_1.computed(function_1.constFalse),
        hasCheckableRows: vue_1.computed(function_1.constFalse),
        allRowsUnchecked: vue_1.computed(function_1.constTrue)
    };
}
function useInjectedCheckableTable() {
    return vue_1.inject(USE_CHECKABLE_TABLE_INJECTION_SYMBOL, useDefaultCheckableTableState, true);
}
exports.useInjectedCheckableTable = useInjectedCheckableTable;
