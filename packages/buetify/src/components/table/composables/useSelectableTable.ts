import { constant, constVoid, FunctionN } from 'fp-ts/lib/function';
import { computed, ExtractPropTypes, PropType, toRef, provide, inject, ComputedRef } from 'vue';
import { useProxy } from '../../../composables/proxy/useProxy';
import { constEmptyArray } from '../../../utils/helpers';
import { BTableRow, BTableRowData, toggleBTableRow } from '../shared';
import { toSet } from './shared';

export const BTableSelectablePropsDefinition = {
  isSelectable: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  selectedRows: {
    type: Array as PropType<BTableRowData[]>,
    default: constEmptyArray
  },
  'onUpdate:selectedRows': {
    type: Function as PropType<FunctionN<[BTableRowData[]], void>>,
    default: constant(constVoid)
  },
  onSelectRow: {
    type: Function as PropType<FunctionN<[BTableRowData], void>>,
    default: constant(constVoid)
  },
  onUnselectRow: {
    type: Function as PropType<FunctionN<[BTableRowData], void>>,
    default: constant(constVoid)
  }
};

export interface BTableSelectableProps extends ExtractPropTypes<typeof BTableSelectablePropsDefinition> {}

const USE_SELECTABLE_TABLE_INJECTION_SYMBOL = Symbol();

export function useSelectableTable(props: BTableSelectableProps) {
  const { value: selectedRows } = useProxy<BTableRowData[]>(
    computed(() => (props.isSelectable ? props.selectedRows : [])),
    toRef(props, 'onUpdate:selectedRows')
  );

  const selectedRowIds = computed(() => toSet(selectedRows.value));

  function toggleRowSelection(row: BTableRow) {
    if (row.isSelectable) {
      const ids = selectedRowIds.value;
      ids.has(row.id) ? props.onUnselectRow(row) : props.onSelectRow(row);
      selectedRows.value = toggleBTableRow(row, selectedRows.value as BTableRow[]);
    }
  }

  const state: UseSelectableTableState = {
    selectedRowIds,
    toggleRowSelection
  };

  provide(USE_SELECTABLE_TABLE_INJECTION_SYMBOL, state);

  return state;
}

export interface UseSelectableTableState {
  selectedRowIds: ComputedRef<Set<string>>;
  toggleRowSelection: FunctionN<[BTableRow], void>;
}

function useDefaultSelectableTableState(): UseSelectableTableState {
  return {
    selectedRowIds: computed(() => new Set()),
    toggleRowSelection: constVoid
  };
}

export function useInjectedSelectableTable(): UseSelectableTableState {
  return inject(USE_SELECTABLE_TABLE_INJECTION_SYMBOL, useDefaultSelectableTableState, true);
}
