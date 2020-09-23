"use strict";
exports.__esModule = true;
require("./table.sass");
var BSelect_1 = require("../form/select/BSelect");
var VerticalExpansionIcon_1 = require("../icons/verticalExpansion/VerticalExpansionIcon");
var Array_1 = require("fp-ts/lib/Array");
var Option_1 = require("fp-ts/lib/Option");
var pipeable_1 = require("fp-ts/lib/pipeable");
var vue_1 = require("vue");
function generateSortDirectionButton(props) {
    return vue_1.h('div', { "class": 'control' }, [
        vue_1.h('button', {
            "class": 'button is-primary',
            onClick: function () {
                props['onUpdate:sortType'](props.sortType === 'Ascending' ? 'Descending' : 'Ascending');
            }
        }, [
            vue_1.h(VerticalExpansionIcon_1["default"], {
                isExpanded: props.sortType === 'Descending',
                size: 'is-small'
            })
        ])
    ]);
}
function generateBSelect(props) {
    var sortableColumns = props.columns.filter(function (c) { return c.isSortable; });
    return vue_1.h(BSelect_1.BSelect, {
        placeholder: props.placeholder,
        items: sortableColumns,
        itemKey: 'label',
        itemValue: 'label',
        itemText: 'label',
        modelValue: pipeable_1.pipe(props.sortColumn, Option_1.map(function (column) { return column.label; }), Option_1.toNullable),
        isExpanded: true,
        'onUpdate:modelValue': function (label) {
            var newSortColumn = pipeable_1.pipe(sortableColumns, Array_1.findFirst(function (column) { return column.label === label; }));
            if (Option_1.isSome(newSortColumn)) {
                props['onUpdate:sortColumn'](newSortColumn.value);
            }
        }
    });
}
function BTableMobileSort(props) {
    return vue_1.h('section', {
        "class": 'field table-mobile-sort',
        'aria-label': 'Table Sort Controls'
    }, [vue_1.h('div', { "class": 'field has-addons' }, [generateBSelect(props), generateSortDirectionButton(props)])]);
}
exports["default"] = BTableMobileSort;
