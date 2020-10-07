import { isEmpty } from 'fp-ts/lib/Array';
import { FunctionN } from 'fp-ts/lib/function';
import { exists, fromNullable, isSome, Option } from 'fp-ts/lib/Option';
import { pipe } from 'fp-ts/lib/pipeable';
import { defineComponent, h, PropType, VNode, Ref, ExtractPropTypes, computed, Slots, toRef } from 'vue';
import { ExtractedPaginationState } from '../../composables/pagination';
import { useProxy } from '../../composables/proxy';
import { useWindowSize } from '../../composables/windowSize';
import {isBoolean} from '../../utils/helpers';
import { Classes } from '../../utils/mergeClasses';
import BPagination, { PaginationPosition, PaginationSize } from '../pagination/BPagination';
import BSimpleTable, { BSimpleTablePropsDefinition } from './BSimpleTable';
import BTableHeader from './BTableHeader';
import BTableMobileSort from './BTableMobileSort';
import BTableRowElement from './BTableRow';
import { BTableCheckPropsDefinition, useCheckableTable } from './composables/useCheckableTable';
import { BTableDraggablePropsDefinition, useDraggableTable } from './composables/useDraggableTable';
import { BTableSelectablePropsDefinition, useSelectableTable } from './composables/useSelectableTable';
import { BTableSortingPropsDefinition, UseSorting, useSorting } from './composables/useSorting';
import { BTableColumn, BTableColumnData, BTableRow, eqColumnTableData } from './shared';
import './table.sass';

interface BTablePaginationInput {
  page?: number;
  'onUpdate:page'?: FunctionN<[number], void>;
  perPage?: number;
  size?: PaginationSize;
  isSimple?: boolean;
  isRounded?: boolean;
  horizontalPosition?: PaginationPosition;
  verticalPosition?: 'is-top' | 'is-bottom';
}

export const BTablePropsDefinition = {
  columns: {
    type: Array as PropType<BTableColumnData<unknown>[]>,
    required: true as const
  },
  isFocusable: {
    type: Boolean as PropType<boolean>,
    default: false
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
  pagination: {
    type: [Boolean, Object] as PropType<boolean | BTablePaginationInput>,
    required: false
  },
  ...BSimpleTablePropsDefinition,
  ...BTableCheckPropsDefinition,
  ...BTableDraggablePropsDefinition,
  ...BTableSelectablePropsDefinition,
  ...BTableSortingPropsDefinition
};

export interface BTableProps extends ExtractPropTypes<typeof BTablePropsDefinition> {}

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
  visibleColumns: BTableColumn[],
  slots: Slots
): VNode {
  return h(
    BTableHeader,
    {
      class: props.headerClasses,
      columns: visibleColumns,
      sortType: sort.sortType.value,
      'onUpdate:sortType': sort['onUpdate:sortType'],
      'onUpdate:sortColumn': sort['onUpdate:sortColumn']
    },
    { ...slots }
  );
}

function generateEmptyTable(visibleColumns: BTableColumn[], slots: Slots): VNode {
  return h('tbody', [
    h('tr', { class: 'is-empty' }, [h('td', { colspan: visibleColumns.length }, slots.empty && slots.empty())])
  ]);
}

function generateTableBody(props: BTableProps, rows: BTableRow[], visibleColumns: BTableColumn[], slots: Slots): VNode {
  if (isEmpty(props.rows) || isEmpty(visibleColumns)) {
    return generateEmptyTable(visibleColumns, slots);
  }
  const onRowClick = props.onRowClick;
  return h(
    'tbody',
    rows.map((row, index) =>
      slots.row
        ? slots.row({
            row,
            index,
            onRowClick,
            columns: visibleColumns
          })
        : h(
            BTableRowElement,
            {
              key: row.id as string | number,
              row,
              index,
              onRowClick,
              columns: visibleColumns
            },
            { ...slots }
          )
    )
  );
}

function generateTableFooter(visibleColumns: BTableColumn[], slots: Slots): VNode {
  return h('tfoot', [
    h(
      'tr',
      { class: 'table-footer' },
      slots.footer && slots.footer({ numberOfColumns: visibleColumns.length, columns: visibleColumns })
    )
  ]);
}

function generateTable(
  props: BTableProps,
  rows: BTableRow[],
  visibleColumns: BTableColumn[],
  sort: UseSorting,
  slots: Slots
): VNode {
  return h(BSimpleTable, props, () => {
    const nodes = [
      generateTableHeader(props, sort, visibleColumns, slots),
      generateTableBody(props, rows, visibleColumns, slots)
    ];
    if (slots.footer) {
      nodes.push(generateTableFooter(visibleColumns, slots));
    }
    return nodes;
  });
}

export default defineComponent({
  name: 'b-table',
  props: BTablePropsDefinition,
  setup(props, { slots }) {
    const { value: rows } = useProxy(toRef(props, 'rows'));
    const { value: sortColumn } = useProxy(
      computed(() => fromNullable(props.sortColumn)),
      (column: Option<BTableColumnData>) => {
        if (props['onUpdate:sortColumn'] && isSome(column)) {
          props['onUpdate:sortColumn'](column.value);
        }
      }
    );

    function isCurrentSortColumn(column: BTableColumnData): boolean {
      return pipe(
        sortColumn.value,
        exists(c => eqColumnTableData.equals(column, c))
      );
    }

    const columns: Ref<BTableColumn[]> = computed(() =>
      props.columns.map((column: BTableColumnData<unknown>) => {
        return {
          ...column,
          position: column.position ?? 'is-left',
          isVisible: column.isVisible ?? true,
          isSortColumn: isCurrentSortColumn(column),
          isSortable: !!column.isSortable || !!column.ord
        };
      })
    );
    const sort = useSorting(props, sortColumn, rows, columns);

    useCheckableTable(props, rows);
    useSelectableTable(props);
    useDraggableTable(props);

    const windowSize = useWindowSize();
    const useMobileSorting = computed(
      () => props.useMobileCards && sort.hasSortableColumns.value && windowSize.value.isTouch
    );
    const visibleColumns = computed(() => columns.value.filter(column => column.isVisible));

    return () => {
      const nodes = [];
      if (useMobileSorting.value) {
        nodes.push(generateMobileSort(props, sort, visibleColumns));
      }
      if (props.pagination) {
        nodes.push(
          h(
            BPagination,
            isBoolean(props.pagination) ? {
              total: props.rows.length,
              items: rows.value,
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
            } as any,
            {
              default: (paginatedState: ExtractedPaginationState) => {
                return generateTable(
                  props,
                  paginatedState.paginatedItems as BTableRow[],
                  visibleColumns.value,
                  sort,
                  slots
                );
              }
            }
          )
        );
        return h('div', nodes);
      } else {
        nodes.push(generateTable(props, rows.value, visibleColumns.value, sort, slots));
        return h('div', nodes);
      }
    };
  }
});
