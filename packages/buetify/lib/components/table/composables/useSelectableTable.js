import { constant, constVoid } from 'fp-ts/lib/function';
import { computed, toRef, provide, inject, shallowRef } from 'vue';
import { useProxy } from '../../../composables/proxy/useProxy';
import { constEmptyArray } from '../../../utils/helpers';
import { toggleBTableRow } from '../shared';
import { toSet } from './shared';
export const BTableSelectablePropsDefinition = {
  isSelectable: {
    type: Boolean,
    default: false
  },
  selectedRows: {
    type: Array,
    default: constEmptyArray
  },
  'onUpdate:selectedRows': {
    type: Function,
    default: constant(constVoid)
  },
  onSelectRow: {
    type: Function,
    default: constant(constVoid)
  },
  onUnselectRow: {
    type: Function,
    default: constant(constVoid)
  }
};
const USE_SELECTABLE_TABLE_INJECTION_SYMBOL = Symbol();
export function useSelectableTable(props) {
  const {
    value: selectedRows
  } = useProxy(computed(() => props.isSelectable ? props.selectedRows : []), toRef(props, 'onUpdate:selectedRows'));
  const selectedRowIds = computed(() => toSet(selectedRows.value));

  function toggleRowSelection(row) {
    if (row.isSelectable ?? props.isSelectable) {
      const ids = selectedRowIds.value;
      ids.has(row.id) ? props.onUnselectRow(row) : props.onSelectRow(row);
      selectedRows.value = toggleBTableRow(row, selectedRows.value);
    }
  }

  const state = {
    isSelectable: toRef(props, 'isSelectable'),
    selectedRowIds,
    toggleRowSelection
  };
  provide(USE_SELECTABLE_TABLE_INJECTION_SYMBOL, state);
  return state;
}

function useDefaultSelectableTableState() {
  return {
    isSelectable: shallowRef(false),
    selectedRowIds: computed(() => new Set()),
    toggleRowSelection: constVoid
  };
}

export function useInjectedSelectableTable() {
  return inject(USE_SELECTABLE_TABLE_INJECTION_SYMBOL, useDefaultSelectableTableState, true);
}
//# sourceMappingURL=useSelectableTable.js.map