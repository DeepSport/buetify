import { h } from 'vue';
import { mergeClasses } from '../../utils/mergeClasses';
import VerticalExpansionIcon from '../icons/verticalExpansion/VerticalExpansionIcon';
import BTooltip from '../tooltip/BTooltip';
import { isString } from '../../utils/helpers';
export default function BTableColumn(props, { attrs, slots }) {
    attrs.class = mergeClasses(attrs.class, {
        'is-sortable': props.column.isSortable,
        'is-sticky-left': !!props.column.isSticky
    });
    attrs.style = props.column.width !== undefined ? { 'min-width': formatWidth(props.column.width) } : undefined;
    const slot = slots[`header.${props.column.label}`] || slots.header;
    const children = [];
    if (slot) {
        children.push(slot(props.column));
    }
    else {
        children.push(isString(props.column.detail)
            ? h(BTooltip, { label: props.column.detail, position: 'is-left' }, () => props.column.label)
            : props.column.label);
    }
    if (props.column.isSortColumn) {
        children.push(h(VerticalExpansionIcon, { isExpanded: props.sortType === 'Ascending' }));
    }
    return h('th', props.column.isSortable
        ? Object.assign(Object.assign({}, attrs), { onClick: getColumnListener(props) }) : attrs, [h('div', { class: ['th-wrap', props.column.position] }, children)]);
}
function formatWidth(width, suffix = 'px') {
    return isString(width) ? width : `${width}${suffix}`;
}
function getColumnListener(props) {
    return props.column.isSortColumn ? getNewSortTypeListener(props) : () => props.onNewSortColumn(props.column);
}
function getNewSortTypeListener(props) {
    return (e) => {
        e.stopPropagation();
        props.onNewSortType(props.sortType === 'Ascending' ? 'Descending' : 'Ascending');
    };
}
//# sourceMappingURL=BTableColumn.js.map