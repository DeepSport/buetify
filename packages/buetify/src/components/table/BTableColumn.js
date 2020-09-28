"use strict";
exports.__esModule = true;
var vue_1 = require("vue");
var VerticalExpansionIcon_1 = require("../icons/verticalExpansion/VerticalExpansionIcon");
var BTooltip_1 = require("../tooltip/BTooltip");
var helpers_1 = require("../../utils/helpers");
function formatWidth(width, suffix) {
    if (suffix === void 0) { suffix = 'px'; }
    return helpers_1.isString(width) ? width : "" + width + suffix;
}
function getNewSortTypeListener(props) {
    return function (e) {
        e.stopPropagation();
        props['onUpdate:sortType'](props.sortType === 'Ascending' ? 'Descending' : 'Ascending');
    };
}
function getColumnListener(props) {
    return props.column.isSortColumn ? getNewSortTypeListener(props) : function () { return props['onUpdate:sortColumn'](props.column); };
}
function BTableColumn(props, _a) {
    var slots = _a.slots;
    var slot = slots["header." + props.column.label] || slots.header;
    var children = [];
    if (slot) {
        children.push(slot(props.column));
    }
    else {
        children.push(helpers_1.isString(props.column.detail)
            ? vue_1.h(BTooltip_1["default"], { label: props.column.detail, position: 'is-left' }, function () { return props.column.label; })
            : props.column.label);
    }
    if (props.column.isSortColumn) {
        children.push(vue_1.h(VerticalExpansionIcon_1["default"], { isExpanded: props.sortType === 'Ascending' }));
    }
    return vue_1.h('th', {
        "class": {
            'is-sortable': props.column.isSortable,
            'is-sticky-left': !!props.column.isSticky
        },
        onClick: props.column.isSortable ? getColumnListener(props) : undefined,
        style: props.column.width !== undefined ? { 'min-width': formatWidth(props.column.width) } : undefined
    }, [
        vue_1.h('div', {
            "class": ['th-wrap', props.column.position]
        }, children)
    ]);
}
exports["default"] = BTableColumn;
