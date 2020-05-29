import { BCheckbox } from '../form/checkbox/BCheckbox';
import BTableColumn from './BTableColumn';
import { h } from 'vue';
export default function BTableHeader(props, { attrs, slots }) {
    const nodes = props.columns.map(column => h(BTableColumn, {
        ...attrs,
        slots,
        key: column.label,
        column,
        sortType: props.sortType,
        onNewSortType: props.onNewSortType,
        onNewSortColumn: props.onNewSortColumn
    }));
    if (props.isCheckable && props.onInput) {
        nodes.unshift(slots['header.checkbox']
            ? h('th', slots['header.checkbox']({
                isChecked: props.isChecked,
                variant: props.checkboxVariant,
                isDisabled: props.isDisabled,
                onInput: props.onInput
            }))
            : h('th', { class: 'checkbox-cell' }, [
                h(BCheckbox, {
                    value: props.isChecked,
                    variant: props.checkboxVariant ?? 'is-primary',
                    isDisabled: props.isDisabled,
                    onInput: props.onInput
                })
            ]));
    }
    return h('thead', [h('tr', nodes)]);
}
//# sourceMappingURL=BTableHeader.js.map