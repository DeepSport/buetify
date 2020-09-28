"use strict";
exports.__esModule = true;
exports.useSorting = exports.BTableSortingPropsDefinition = void 0;
var Array_1 = require("fp-ts/lib/Array");
var Option_1 = require("fp-ts/lib/Option");
var pipeable_1 = require("fp-ts/lib/pipeable");
var vue_1 = require("vue");
var useProxy_1 = require("../../../composables/proxy/useProxy");
exports.BTableSortingPropsDefinition = {
    rows: {
        type: Array,
        required: true
    },
    sortColumn: {
        type: Object
    },
    'onUpdate:sortColumn': {
        type: Function
    },
    sortType: {
        type: String,
        "default": 'Descending'
    },
    'onUpdate:sortType': {
        type: Function
    }
};
function useSorting(props, sortColumn, rows, columns) {
    var sortType = useProxy_1.useProxy(vue_1.toRef(props, 'sortType'), vue_1.toRef(props, 'onUpdate:sortType')).value;
    function sortRows(ord) {
        rows.value = pipeable_1.pipe(rows.value, Array_1.sort(ord));
    }
    function checkSort() {
        if (Option_1.isSome(sortColumn.value) && sortColumn.value.value.ord !== undefined) {
            sortRows(sortColumn.value.value.ord);
        }
    }
    vue_1.watch(function () { return props.rows; }, checkSort, {
        immediate: true
    });
    return {
        sortColumn: sortColumn,
        sortType: sortType,
        'onUpdate:sortColumn': function (column) {
            sortColumn.value = Option_1.some(column);
        },
        'onUpdate:sortType': function (type) {
            sortType.value = type;
        },
        hasSortableColumns: vue_1.computed(function () { return columns.value.some(function (column) { return column.isSortable; }); })
    };
}
exports.useSorting = useSorting;
