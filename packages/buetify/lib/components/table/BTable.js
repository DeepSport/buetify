import { isEmpty } from 'fp-ts/lib/Array';
import { defineComponent, h, computed, toRef } from 'vue';
import { useProxy } from '../../composables/proxy';
import { useWindowSize } from '../../composables/windowSize';
import { isBoolean } from '../../utils/helpers';
import BPagination from '../pagination/BPagination';
import BSimpleTable, { BSimpleTablePropsDefinition } from './BSimpleTable';
import BTableHeader from './BTableHeader';
import BTableMobileSort from './BTableMobileSort';
import BTableRowElement from './BTableRow';
import { provideVisibleColumns } from './composables/shared';
import { BTableCheckPropsDefinition, useCheckableTable } from './composables/useCheckableTable';
import { BTableDraggablePropsDefinition, useDraggableTable } from './composables/useDraggableTable';
import { BTableSelectablePropsDefinition, useSelectableTable } from './composables/useSelectableTable';
import { BTableSortingPropsDefinition, useSortableTable } from './composables/useSortableTable';
export const BTablePropsDefinition = {
  columns: {
    type: Array,
    required: true
  },
  isFocusable: {
    type: Boolean,
    default: false
  },
  mobileSortPlaceholder: {
    type: String
  },
  headerClasses: {
    type: [String, Object, Array],
    default: undefined
  },
  onRowClick: {
    type: Function,
    required: false
  },
  pagination: {
    type: [Boolean, Object],
    required: false
  },
  ...BSimpleTablePropsDefinition,
  ...BTableCheckPropsDefinition,
  ...BTableDraggablePropsDefinition,
  ...BTableSelectablePropsDefinition,
  ...BTableSortingPropsDefinition,
  useMobileCards: {
    type: Boolean,
    default: true
  }
};

function generateTableHeader(classes, slots) {
  return h(BTableHeader, {
    class: classes
  }, { ...slots
  });
}

function generateEmptyTable(visibleColumns, slots) {
  return h('tbody', [h('tr', {
    class: 'is-empty'
  }, [h('td', {
    colspan: visibleColumns.value.length
  }, slots.empty && slots.empty())])]);
}

function generateTableBody(props, rows, visibleColumns, slots) {
  if (isEmpty(props.rows)) {
    return generateEmptyTable(visibleColumns, slots);
  }

  const onRowClick = props.onRowClick;
  return h('tbody', rows.map((row, index) => slots.row ? slots.row({
    row,
    index,
    onRowClick,
    columns: visibleColumns.value
  }) : h(BTableRowElement, {
    key: row.id,
    row,
    index,
    onRowClick
  }, { ...slots
  })));
}

function generateTableFooter(visibleColumns, slots) {
  return h('tfoot', [h('tr', {
    class: 'table-footer'
  }, slots.footer && slots.footer({
    numberOfColumns: visibleColumns.value.length,
    columns: visibleColumns.value
  }))]);
}

function generateTable(props, rows, visibleColumns, slots) {
  return h(BSimpleTable, props, () => {
    const nodes = [generateTableHeader(props.headerClasses, slots), generateTableBody(props, rows, visibleColumns, slots)];

    if (slots.footer) {
      nodes.push(generateTableFooter(visibleColumns, slots));
    }

    return nodes;
  });
}

export default defineComponent({
  name: 'b-table',
  props: BTablePropsDefinition,

  setup(props, {
    slots
  }) {
    const {
      value: rows
    } = useProxy(toRef(props, 'rows'));
    const visibleColumns = computed(() => props.columns.filter(column => column.isVisible ?? true));
    provideVisibleColumns(visibleColumns);
    const {
      hasSortableColumns
    } = useSortableTable(props, rows, visibleColumns);
    useCheckableTable(props, rows);
    useSelectableTable(props);
    useDraggableTable(props);
    const windowSize = useWindowSize();
    const useMobileSorting = computed(() => props.useMobileCards && hasSortableColumns.value && windowSize.value.isTouch);
    return () => {
      const nodes = [];

      if (useMobileSorting.value) {
        nodes.push(h(BTableMobileSort, {
          placeholder: props.mobileSortPlaceholder
        }));
      }

      if (props.pagination) {
        nodes.push(h(BPagination, isBoolean(props.pagination) ? {
          total: props.rows.length,
          items: rows.value
        } : {
          isSimple: props.pagination.isSimple,
          isRounded: props.pagination.isRounded,
          modelValue: props.pagination.page,
          'onUpdate:modelValue': props.pagination['onUpdate:page'],
          total: props.rows.length,
          items: rows.value,
          perPage: props.pagination.perPage,
          size: props.pagination.size,
          position: props.pagination.horizontalPosition,
          verticalPosition: props.pagination.verticalPosition
        }, // eslint-disable-line
        {
          default: paginatedState => {
            return generateTable(props, paginatedState.paginatedItems, visibleColumns, slots);
          }
        }));
        return h('div', nodes);
      } else {
        nodes.push(generateTable(props, rows.value, visibleColumns, slots));
        return h('div', nodes);
      }
    };
  }

});
//# sourceMappingURL=BTable.js.map