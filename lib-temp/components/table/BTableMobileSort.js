import './table.sass';
import { BSelect } from '../form/select/BSelect';
import VerticalExpansionIcon from '../icons/verticalExpansion/VerticalExpansionIcon';
import { findFirst } from 'fp-ts/lib/Array';
import { isSome, map, toNullable } from 'fp-ts/lib/Option';
import { pipe } from 'fp-ts/lib/pipeable';
import { h } from 'vue';
function generateSortDirectionButton(props) {
    return h('div', { class: 'control' }, [
        h('button', {
            class: 'button is-primary',
            onClick: () => {
                props.onNewSortType(props.sortType === 'Ascending' ? 'Descending' : 'Ascending');
            }
        }, [
            h(VerticalExpansionIcon, {
                isExpanded: props.sortType === 'Descending',
                size: 'is-small'
            })
        ])
    ]);
}
function generateBSelect(props) {
    const sortableColumns = props.columns.filter(c => c.isSortable);
    return h(BSelect, {
        placeholder: props.placeholder,
        items: sortableColumns,
        itemKey: 'label',
        itemValue: 'label',
        itemText: 'label',
        value: pipe(props.sortColumn, map(column => column.label), toNullable),
        isExpanded: true,
        onInput: (label) => {
            const newSortColumn = pipe(sortableColumns, findFirst(column => column.label === label));
            if (isSome(newSortColumn)) {
                props.onNewSortColumn(newSortColumn.value);
            }
        }
    });
}
export default function BTableMobileSort(props) {
    return h('section', {
        class: 'field table-mobile-sort',
        'aria-label': 'Table Sort Controls'
    }, [h('div', { class: 'field has-addons' }, [generateBSelect(props), generateSortDirectionButton(props)])]);
}
//# sourceMappingURL=BTableMobileSort.js.map