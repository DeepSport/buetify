import { sort } from 'fp-ts/lib/Array';
import { isSome, Option, some } from 'fp-ts/lib/Option';
import { Ord } from 'fp-ts/lib/Ord';
import { pipe } from 'fp-ts/lib/pipeable';
import { ExtractPropTypes, toRef, computed, Ref, watch } from 'vue';
import { FunctionN } from 'fp-ts/lib/function';
import { PropType } from 'vue';
import { useProxy } from '../../../composables/proxy/useProxy';
import { BTableColumn, BTableColumnData, BTableRow, BTableRowData, SortType } from '../shared';

export const BTableSortingPropsDefinition = {
  rows: {
    type: Array as PropType<BTableRowData[]>,
    required: true as const
  },
  sortColumn: {
    type: Object as PropType<BTableColumnData>
  },
  'onUpdate:sortColumn': {
    type: Function as PropType<FunctionN<[BTableColumnData], void>>
  },
  sortType: {
    type: String as PropType<SortType>,
    default: 'Descending' as const
  },
  'onUpdate:sortType': {
    type: Function as PropType<FunctionN<[SortType], void>>
  }
};

export interface BTableSortingProps extends ExtractPropTypes<typeof BTableSortingPropsDefinition> {}

export function useSorting(
  props: BTableSortingProps,
  sortColumn: Ref<Option<BTableColumnData<unknown>>>,
  rows: Ref<BTableRow[]>,
  columns: Ref<BTableColumn[]>
) {
  const { value: sortType } = useProxy(toRef(props, 'sortType'), toRef(props, 'onUpdate:sortType'));

  function sortRows(ord: Ord<BTableRow>) {
    rows.value = pipe(rows.value, sort(ord));
  }

  function checkSort(): void {
    if (isSome(sortColumn.value) && sortColumn.value.value.ord !== undefined) {
      sortRows(sortColumn.value.value.ord);
    }
  }

  watch(() => props.rows, checkSort, {
    immediate: true
  });

  return {
    sortColumn,
    sortType,
    'onUpdate:sortColumn': (column: BTableColumn) => {
      sortColumn.value = some(column);
    },
    'onUpdate:sortType': (type: SortType) => {
      sortType.value = type;
    },
    hasSortableColumns: computed(() => columns.value.some(column => column.isSortable))
  };
}

export type UseSorting = ReturnType<typeof useSorting>;
