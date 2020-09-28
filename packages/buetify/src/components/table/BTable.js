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
exports.BTablePropsDefinition = void 0;
var Array_1 = require("fp-ts/lib/Array");
var Option_1 = require("fp-ts/lib/Option");
var pipeable_1 = require("fp-ts/lib/pipeable");
var vue_1 = require("vue");
var proxy_1 = require("../../composables/proxy");
var windowSize_1 = require("../../composables/windowSize");
var BSimpleTable_1 = require("./BSimpleTable");
var BTableHeader_1 = require("./BTableHeader");
var BTableMobileSort_1 = require("./BTableMobileSort");
var BTableRow_1 = require("./BTableRow");
var useCheckableTable_1 = require("./composables/useCheckableTable");
var useDraggableTable_1 = require("./composables/useDraggableTable");
var useSelectableTable_1 = require("./composables/useSelectableTable");
var useSorting_1 = require("./composables/useSorting");
var shared_1 = require("./shared");
require("./table.sass");
exports.BTablePropsDefinition = __assign(__assign(__assign(__assign({ isBordered: {
        type: Boolean,
        "default": false
    }, isStriped: {
        type: Boolean,
        "default": false
    }, isNarrow: {
        type: Boolean,
        "default": false
    }, isFullwidth: {
        type: Boolean,
        "default": true
    }, size: {
        type: String,
        "default": ''
    }, isHoverable: {
        type: Boolean,
        "default": false
    }, isLoading: {
        type: Boolean,
        "default": false
    }, isScrollable: {
        type: Boolean,
        "default": true
    }, columns: {
        type: Array,
        required: true
    }, isFocusable: {
        type: Boolean,
        "default": false
    }, useMobileCards: {
        type: Boolean,
        "default": true
    }, mobileSortPlaceholder: {
        type: String
    }, headerClasses: {
        type: [String, Object, Array],
        "default": undefined
    }, onRowClick: {
        type: Function,
        required: false
    } }, useCheckableTable_1.BTableCheckPropsDefinition), useDraggableTable_1.BTableDraggablePropsDefinition), useSelectableTable_1.BTableSelectablePropsDefinition), useSorting_1.BTableSortingPropsDefinition);
function getBTableRow(rowProps) {
    return function (data, index) { return (__assign(__assign({}, data), { index: index, isDroppable: data.isDroppable !== undefined ? data.isDroppable : rowProps.isDraggable, isDraggable: data.isDraggable !== undefined ? data.isDraggable : rowProps.isDraggable, isSelectable: data.isSelectable !== undefined ? data.isSelectable : rowProps.isSelectable, isCheckable: data.isCheckable !== undefined ? data.isCheckable : rowProps.isCheckable })); };
}
function generateMobileSort(props, sort, visibleColumns) {
    return vue_1.h(BTableMobileSort_1["default"], {
        sortColumn: sort.sortColumn.value,
        'onUpdate:sortColumn': sort['onUpdate:sortColumn'],
        sortType: sort.sortType.value,
        'onUpdate:sortType': sort['onUpdate:sortType'],
        columns: visibleColumns.value,
        placeholder: props.mobileSortPlaceholder
    });
}
function generateTableHeader(props, sort, visibleColumns, slots) {
    return vue_1.h(BTableHeader_1["default"], {
        "class": props.headerClasses,
        columns: visibleColumns.value,
        sortType: sort.sortType.value,
        'onUpdate:sortType': sort['onUpdate:sortType'],
        'onUpdate:sortColumn': sort['onUpdate:sortColumn']
    }, __assign({}, slots));
}
function generateEmptyTable(columns, slots) {
    return vue_1.h('tbody', [
        vue_1.h('tr', { "class": 'is-empty' }, [
            vue_1.h('td', { colspan: columns.value.filter(function (column) { return column.isVisible; }).length }, slots.empty && slots.empty())
        ])
    ]);
}
function generateRows(props, rows, visibleColumns, drag, slots) {
    var selectedRowIds = select.selectedRowIds.value;
    return rows.value.map(function (row, index) {
        return vue_1.h(BTableRow_1["default"], __assign({ key: row.id, "class": {
                'is-drop-target': Option_1.isSome(drag.dropTarget.value)
                    ? shared_1.eqBTableRow.equals(row, drag.dropTarget.value.value)
                    : false,
                'is-undroppable': drag.dragIsActive.value && !row.isDroppable
            }, row: row, onRowClick: props.onRowClick, columns: visibleColumns.value }, drag.getRowDragListeners(row, index)), __assign({}, slots));
    });
}
function generateTableBody(props, rows, visibleColumns, drag, slots) {
    if (Array_1.isEmpty(rows.value) || Array_1.isEmpty(visibleColumns.value)) {
        return generateEmptyTable(visibleColumns, slots);
    }
    if (slots.row) {
        return vue_1.h('tbody', rows.value.map(function (row, index) {
            return vue_1.h('tr', { key: row.id }, slots.row &&
                slots.row({
                    row: row,
                    index: index,
                    columns: visibleColumns.value
                }));
        }));
    }
    else {
        return vue_1.h('tbody', generateRows(props, rows, visibleColumns, drag, select, slots));
    }
}
function generateTableFooter(visibleColumns, slots) {
    return vue_1.h('tfoot', [
        vue_1.h('tr', { "class": 'table-footer' }, slots.footer && slots.footer({ numberOfColumns: visibleColumns.value.length }))
    ]);
}
function generateTable(props, rows, visibleColumns, drag, sort, slots) {
    return vue_1.h(BSimpleTable_1["default"], {
        tableClasses: [
            {
                'is-bordered': props.isBordered,
                'is-striped': props.isStriped,
                'is-narrow': props.isNarrow,
                'is-fullwidth': props.isFullwidth,
                'is-hoverable': props.isHoverable,
                'has-mobile-cards': props.useMobileCards
            },
            props.size
        ],
        isLoading: props.isLoading,
        isScrollable: props.isScrollable
    }, function () {
        var nodes = [
            generateTableHeader(props, sort, visibleColumns, slots),
            generateTableBody(props, rows, visibleColumns, drag, slots)
        ];
        if (slots.footer) {
            nodes.push(generateTableFooter(visibleColumns, slots));
        }
        return nodes;
    });
}
exports["default"] = vue_1.defineComponent({
    name: 'b-table',
    props: exports.BTablePropsDefinition,
    setup: function (props, _a) {
        var slots = _a.slots;
        var rows = vue_1.computed(function () { return props.rows.map(getBTableRow(props)); });
        var sortColumn = proxy_1.useProxy(vue_1.computed(function () { return Option_1.fromNullable(props.sortColumn); }), function (column) {
            if (props['onUpdate:sortColumn'] && Option_1.isSome(column)) {
                props['onUpdate:sortColumn'](column.value);
            }
        }).value;
        function isCurrentSortColumn(column) {
            return pipeable_1.pipe(sortColumn.value, Option_1.exists(function (c) { return shared_1.eqColumnTableData.equals(column, c); }));
        }
        var columns = vue_1.computed(function () {
            return props.columns.map(function (column) {
                var _a, _b;
                return __assign(__assign({}, column), { position: (_a = column.position) !== null && _a !== void 0 ? _a : 'is-centered', isVisible: (_b = column.isVisible) !== null && _b !== void 0 ? _b : true, isSortColumn: isCurrentSortColumn(column), isSortable: !!column.isSortable || !!column.ord });
            });
        });
        var sort = useSorting_1.useSorting(props, sortColumn, rows, columns);
        useCheckableTable_1.useCheckableTable(props, rows);
        useSelectableTable_1.useSelectableTable(props);
        var drag = useDraggableTable_1.useDraggableTable(props);
        var windowSize = windowSize_1.useWindowSize();
        var useMobileSorting = vue_1.computed(function () { return props.useMobileCards && windowSize.value.isTouch; });
        var visibleColumns = vue_1.computed(function () { return columns.value.filter(function (column) { return column.isVisible; }); });
        return function () {
            return vue_1.h('div', useMobileSorting.value
                ? [generateMobileSort(props, sort, visibleColumns)]
                : [generateTable(props, rows, visibleColumns, drag, sort, slots)]);
        };
    }
});
