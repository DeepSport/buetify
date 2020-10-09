import { isEmpty } from 'fp-ts/lib/Array';
import { FunctionN } from 'fp-ts/lib/function';
import { defineComponent, h, PropType, VNode, Ref, ExtractPropTypes, computed, Slots, toRef } from 'vue';
import { ExtractedPaginationState } from '../../composables/pagination';
import { useProxy } from '../../composables/proxy';
import { useWindowSize } from '../../composables/windowSize';
import { isBoolean } from '../../utils/helpers';
import { Classes } from '../../utils/mergeClasses';
import BPagination, {PaginationPosition, PaginationSize, PaginationVerticalPosition} from '../pagination/BPagination';
import BSimpleTable, { BSimpleTablePropsDefinition } from './BSimpleTable';
import BTableHeader from './BTableHeader';
import BTableMobileSort from './BTableMobileSort';
import BTableRowElement from './BTableRow';
import { provideVisibleColumns } from './composables/shared';
import { BTableCheckPropsDefinition, useCheckableTable } from './composables/useCheckableTable';
import { BTableDraggablePropsDefinition, useDraggableTable } from './composables/useDraggableTable';
import { BTableSelectablePropsDefinition, useSelectableTable } from './composables/useSelectableTable';
import { BTableSortingPropsDefinition, useSortableTable } from './composables/useSortableTable';
import { BTableColumn, BTableRow } from './shared';
import './table.sass';

export interface BTablePaginationInput {
  page?: number;
  'onUpdate:page'?: FunctionN<[number], void>;
  perPage?: number;
  size?: PaginationSize;
  isSimple?: boolean;
  isRounded?: boolean;
  horizontalPosition?: PaginationPosition;
  verticalPosition?: PaginationVerticalPosition;
}

export const BTablePropsDefinition = {
  columns: {
    type: Array as PropType<BTableColumn<unknown>[]>,
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

function generateTableHeader(classes: Classes, slots: Slots): VNode {
  return h(
    BTableHeader,
    {
      class: classes
    },
    { ...slots }
  );
}

function generateEmptyTable(visibleColumns: Ref<BTableColumn[]>, slots: Slots): VNode {
  return h('tbody', [
    h('tr', { class: 'is-empty' }, [h('td', { colspan: visibleColumns.value.length }, slots.empty && slots.empty())])
  ]);
}

function generateTableBody(
  props: BTableProps,
  rows: BTableRow[],
  visibleColumns: Ref<BTableColumn[]>,
  slots: Slots
): VNode {
  if (isEmpty(props.rows)) {
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
            columns: visibleColumns.value
          })
        : h(
            BTableRowElement,
            {
              key: row.id as string | number,
              row,
              index,
              onRowClick
            },
            { ...slots }
          )
    )
  );
}

function generateTableFooter(visibleColumns: Ref<BTableColumn[]>, slots: Slots): VNode {
  return h('tfoot', [
    h(
      'tr',
      { class: 'table-footer' },
      slots.footer && slots.footer({ numberOfColumns: visibleColumns.value.length, columns: visibleColumns.value })
    )
  ]);
}

function generateTable(
  props: BTableProps,
  rows: BTableRow[],
  visibleColumns: Ref<BTableColumn[]>,
  slots: Slots
): VNode {
  return h(BSimpleTable, props, () => {
    const nodes = [
      generateTableHeader(props.headerClasses, slots),
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

    const visibleColumns = computed(() => props.columns.filter(column => column.isVisible ?? true));

    provideVisibleColumns(visibleColumns);
    const { hasSortableColumns } = useSortableTable(props, rows, visibleColumns);
    useCheckableTable(props, rows);
    useSelectableTable(props);
    useDraggableTable(props);

    const windowSize = useWindowSize();
    const useMobileSorting = computed(
      () => props.useMobileCards && hasSortableColumns.value && windowSize.value.isTouch
    );

    return () => {
      const nodes = [];
      if (useMobileSorting.value) {
        nodes.push(
          h(BTableMobileSort, {
            placeholder: props.mobileSortPlaceholder
          })
        );
      }
      if (props.pagination) {
        nodes.push(
          h(
            BPagination,
            isBoolean(props.pagination)
              ? {
                  total: props.rows.length,
                  items: rows.value
                }
              : ({
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
                } as any),
            {
              default: (paginatedState: ExtractedPaginationState) => {
                return generateTable(props, paginatedState.paginatedItems as BTableRow[], visibleColumns, slots);
              }
            }
          )
        );
        return h('div', nodes);
      } else {
        nodes.push(generateTable(props, rows.value, visibleColumns, slots));
        return h('div', nodes);
      }
    };
  }
});
