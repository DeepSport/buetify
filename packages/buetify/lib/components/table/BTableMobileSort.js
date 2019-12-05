import { BSelect } from '../form/select/BSelect';
import VerticalExpansionIcon from '../icons/verticalExpansion/VerticalExpansionIcon';
import { useInjectedSortableTable } from './composables/useSortableTable';
import { head } from 'fp-ts/lib/Array';
import { map, toNullable } from 'fp-ts/lib/Option';
import { pipe } from 'fp-ts/lib/pipeable';
import { defineComponent, h } from 'vue';

function generateSortDirectionButton(sortType, toggleSortType) {
  return h('div', {
    class: 'control'
  }, [h('button', {
    class: 'button is-primary',
    onClick: toggleSortType
  }, [h(VerticalExpansionIcon, {
    isExpanded: sortType === 'Descending',
    size: 'is-small'
  })])]);
}

function generateBSelect(placeholder, sortableColumns, sortBy, setSortColumn) {
  return h(BSelect, {
    placeholder,
    items: sortableColumns,
    itemKey: 'label',
    itemValue: 'label',
    itemText: 'label',
    modelValue: pipe(head(sortBy), map(column => column.label), toNullable),
    isExpanded: true,
    'onUpdate:modelValue': setSortColumn
  });
}

export default defineComponent({
  name: 'b-table-mobile-sort',
  props: {
    placeholder: {
      type: String
    }
  },

  setup(props) {
    const sorting = useInjectedSortableTable();

    function toggleSortDirection() {
      sorting.updateSortDirection();
    }

    return () => {
      return h('section', {
        class: 'field table-mobile-sort',
        'aria-label': 'Table Sort Controls'
      }, [h('div', {
        class: 'field has-addons'
      }, [generateBSelect(props.placeholder, sorting.sortableColumns.value, sorting.sortBy.value, sorting.updateSortColumn), generateSortDirectionButton(sorting.sortType.value, toggleSortDirection)])]);
    };
  }

});
//# sourceMappingURL=BTableMobileSort.js.map