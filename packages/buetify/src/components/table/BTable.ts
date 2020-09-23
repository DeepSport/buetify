import { isEmpty } from 'fp-ts/lib/Array';
import { FunctionN } from 'fp-ts/lib/function';
import { exists, fromNullable, isSome, Option } from 'fp-ts/lib/Option';
import { pipe } from 'fp-ts/lib/pipeable';
import { defineComponent, h, PropType, VNode, Ref, ExtractPropTypes, computed, Slots } from 'vue';
import { useProxy } from '../../composables/proxy';
import { useWindowSize } from '../../composables/windowSize';
import { SizeVariant } from '../../types/SizeVariants';
import { Classes } from '../../utils/mergeClasses';
import BSimpleTable from './BSimpleTable';
import BTableHeader from './BTableHeader';
import BTableMobileSort from './BTableMobileSort';
import BTableRowElement from './BTableRow';
import { BTableCheckPropsDefinition, useCheckableTable } from './composables/useCheckableTable';
import { BTableDraggablePropsDefinition, UseDraggableTable, useDraggableTable } from './composables/useDraggableTable';
import {
  BTableSelectablePropsDefinition,
  useSelectableTable
} from './composables/useSelectableTable';
import { BTableSortingPropsDefinition, UseSorting, useSorting } from './composables/useSorting';
import { BTableColumn, BTableColumnData, BTableRow, BTableRowData, eqBTableRow, eqColumnTableData } from './shared';
import './table.sass';

export const BTablePropsDefinition = {
  isBordered: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  isStriped: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  isNarrow: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  isFullwidth: {
    type: Boolean as PropType<boolean>,
    default: true
  },
  size: {
    type: String as PropType<SizeVariant>,
    default: '' as const
  },
  isHoverable: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  isLoading: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  isScrollable: {
    type: Boolean as PropType<boolean>,
    default: true
  },
  columns: {
    type: Array as PropType<BTableColumnData<unknown>[]>,
    required: true as const
  },
  isFocusable: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  useMobileCards: {
    type: Boolean as PropType<boolean>,
    default: true
  },
  mobileSortPlaceholder: {
    type: String as PropType<string>
  },
  headerClasses: {
    type: [String, Object, Array] as PropType<Classes>,
    default: undefined
  },
  onRowClick: {
    type: Function as PropType<FunctionN<[BTableRow, MouseEvent], void>>,
    required: false
  },
  ...BTableCheckPropsDefinition,
  ...BTableDraggablePropsDefinition,
  ...BTableSelectablePropsDefinition,
  ...BTableSortingPropsDefinition
};

export interface BTableProps extends ExtractPropTypes<typeof BTablePropsDefinition> {}

interface RowProps {
  isSelectable: boolean;
  isCheckable: boolean;
  isDraggable: boolean;
}

function getBTableRow(rowProps: RowProps) {
  return (data: BTableRowData, index: number): BTableRow => ({
    ...data,
    index,
    isDroppable: data.isDroppable !== undefined ? data.isDroppable : rowProps.isDraggable,
    isDraggable: data.isDraggable !== undefined ? data.isDraggable : rowProps.isDraggable,
    isSelectable: data.isSelectable !== undefined ? data.isSelectable : rowProps.isSelectable,
    isCheckable: data.isCheckable !== undefined ? data.isCheckable : rowProps.isCheckable
  });
}

function generateMobileSort(props: BTableProps, sort: UseSorting, visibleColumns: Ref<BTableColumn[]>) {
  return h(BTableMobileSort, {
    sortColumn: sort.sortColumn.value as any, // eslint-disable-line
    'onUpdate:sortColumn': sort['onUpdate:sortColumn'],
    sortType: sort.sortType.value,
    'onUpdate:sortType': sort['onUpdate:sortType'],
    columns: visibleColumns.value,
    placeholder: props.mobileSortPlaceholder
  });
}

function generateTableHeader(
  props: BTableProps,
  sort: UseSorting,
  visibleColumns: Ref<BTableColumn[]>,
  slots: Slots
): VNode {
  return h(
    BTableHeader,
    {
      class: props.headerClasses,
      columns: visibleColumns.value,
      sortType: sort.sortType.value,
      'onUpdate:sortType': sort['onUpdate:sortType'],
      'onUpdate:sortColumn': sort['onUpdate:sortColumn']
    },
    { ...slots }
  );
}

function generateEmptyTable(columns: Ref<BTableColumn[]>, slots: Slots): VNode {
  return h('tbody', [
    h('tr', { class: 'is-empty' }, [
      h('td', { colspan: columns.value.filter(column => column.isVisible).length }, slots.empty && slots.empty())
    ])
  ]);
}

function generateRows(
  props: BTableProps,
  rows: Ref<BTableRow[]>,
  visibleColumns: Ref<BTableColumn[]>,
  drag: UseDraggableTable,
  slots: Slots
) {
  return rows.value.map((row, index) =>
    h(
      BTableRowElement,
      {
        key: row.id,
        class: {
          'is-drop-target': isSome(drag.dropTarget.value)
            ? eqBTableRow.equals(row, drag.dropTarget.value.value)
            : false,
          'is-undroppable': drag.dragIsActive.value && !row.isDroppable
        },
        row,
        onRowClick: props.onRowClick,
        columns: visibleColumns.value,
        ...drag.getRowDragListeners(row, index)
      },
      { ...slots }
    )
  );
}

function generateTableBody(
  props: BTableProps,
  rows: Ref<BTableRow[]>,
  visibleColumns: Ref<BTableColumn[]>,
  drag: UseDraggableTable,
  slots: Slots
): VNode {
  if (isEmpty(rows.value) || isEmpty(visibleColumns.value)) {
    return generateEmptyTable(visibleColumns, slots);
  }
  if (slots.row) {
    return h(
      'tbody',
      rows.value.map((row, index) =>
        h(
          'tr',
          { key: row.id },
          slots.row &&
            slots.row({
              row,
              index,
              columns: visibleColumns.value
            })
        )
      )
    );
  } else {
    return h('tbody', generateRows(props, rows, visibleColumns, drag, slots));
  }
}

function generateTableFooter(visibleColumns: Ref<BTableColumn[]>, slots: Slots): VNode {
  return h('tfoot', [
    h('tr', { class: 'table-footer' }, slots.footer && slots.footer({ numberOfColumns: visibleColumns.value.length }))
  ]);
}

function generateTable(
  props: BTableProps,
  rows: Ref<BTableRow[]>,
  visibleColumns: Ref<BTableColumn[]>,
  drag: UseDraggableTable,
  sort: UseSorting,
  slots: Slots
): VNode {
  return h(
    BSimpleTable,
    {
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
    },
    () => {
      const nodes = [
        generateTableHeader(props, sort, visibleColumns, slots),
        generateTableBody(props, rows, visibleColumns, drag, slots)
      ];
      if (slots.footer) {
        nodes.push(generateTableFooter(visibleColumns, slots));
      }
      return nodes;
    }
  );
}

export default defineComponent({
  name: 'b-table',
  props: BTablePropsDefinition,
  setup(props, { slots }) {
    const rows = computed(() => props.rows.map(getBTableRow(props)));
    const { value: sortColumn } = useProxy(
      computed(() => fromNullable(props.sortColumn)),
      (column: Option<BTableColumnData<unknown>>) => {
        if (props['onUpdate:sortColumn'] && isSome(column)) {
          props['onUpdate:sortColumn'](column.value);
        }
      }
    );

    function isCurrentSortColumn(column: BTableColumnData<unknown>): boolean {
      return pipe(
        sortColumn.value,
        exists(c => eqColumnTableData.equals(column, c))
      );
    }

    const columns: Ref<BTableColumn<unknown>[]> = computed(() =>
      props.columns.map((column: BTableColumnData<unknown>) => {
        return {
          ...column,
          position: column.position ?? 'is-centered',
          isVisible: column.isVisible ?? true,
          isSortColumn: isCurrentSortColumn(column),
          isSortable: !!column.isSortable || !!column.ord
        };
      })
    );
    const sort = useSorting(props, sortColumn, rows, columns);
    useCheckableTable(props, rows);
    useSelectableTable(props);
    const drag = useDraggableTable(props);

    const windowSize = useWindowSize();
    const useMobileSorting = computed(() => props.useMobileCards && windowSize.value.isTouch);
    const visibleColumns = computed(() => columns.value.filter(column => column.isVisible));

    return () =>
      h(
        'div',
        useMobileSorting.value
          ? [generateMobileSort(props, sort, visibleColumns)]
          : [generateTable(props, rows, visibleColumns, drag, sort, slots)]
      );
  }
});
