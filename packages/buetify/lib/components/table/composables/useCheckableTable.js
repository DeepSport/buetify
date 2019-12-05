import { computed, provide, inject, shallowRef, watch } from 'vue';
import { constant, constFalse, constTrue, constVoid } from 'fp-ts/lib/function';
import { constEmptyArray } from '../../../utils/helpers';
import { toggleBTableRow } from '../shared';
import { toSet } from './shared';
export const BTableCheckPropsDefinition = {
  isCheckable: {
    type: Boolean,
    default: false
  },
  checkedRows: {
    type: Array,
    default: constEmptyArray()
  },
  'onUpdate:checkedRows': {
    type: Function,
    default: constant(constVoid)
  },
  checkboxVariant: {
    type: String,
    default: 'is-primary'
  },
  canCheckAllRows: {
    type: Boolean,
    default: true
  },
  onCheckRow: {
    type: Function,
    default: constant(constVoid)
  },
  onUncheckRow: {
    type: Function,
    default: constant(constVoid)
  }
};
const USE_CHECKABLE_TABLE_INJECTION_SYMBOL = Symbol();
export function useCheckableTable(props, rows) {
  const checkableRows = computed(() => props.isCheckable ? rows.value.filter(row => row.isCheckable ?? true) : []);
  const propCheckedRows = computed(() => props.isCheckable ? props.checkedRows : []);
  const newCheckedRows = shallowRef(propCheckedRows.value);
  watch(propCheckedRows, newValue => {
    newCheckedRows.value = newValue;
  });
  const checkedRowIds = computed(() => toSet(newCheckedRows.value));
  const allRowsChecked = computed(() => {
    const ids = checkedRowIds.value;
    return checkableRows.value.length > 0 && checkableRows.value.every(row => ids.has(row.id));
  });
  const allRowsUncheckable = computed(() => rows.value.every(row => !row.isCheckable));

  function checkAllRows() {
    const cRows = checkableRows.value;
    newCheckedRows.value = cRows;
    props['onUpdate:checkedRows'](cRows);
  }

  function toggleRow(row) {
    if (row.isCheckable) {
      const ids = checkedRowIds.value;

      if (ids.has(row.id)) {
        props.onUncheckRow(row);
      } else {
        props.onCheckRow(row);
      }

      const cRows = toggleBTableRow(row, newCheckedRows.value);
      newCheckedRows.value = cRows;
      props['onUpdate:checkedRows'](cRows);
    }
  }

  function uncheckAllRows() {
    newCheckedRows.value = [];
    props['onUpdate:checkedRows']([]);
  }

  function toggleAllRows() {
    allRowsChecked.value ? uncheckAllRows() : checkAllRows();
  }

  const hasCheckableRows = computed(() => checkableRows.value.length > 0);
  const state = {
    isCheckable: computed(() => props.isCheckable),
    variant: computed(() => props.checkboxVariant),
    checkedRowIds,
    toggleAllRows,
    checkAllRows,
    uncheckAllRows,
    allRowsChecked,
    toggleRow,
    allRowsUncheckable,
    hasCheckableRows,
    allRowsUnchecked: computed(() => hasCheckableRows.value && checkedRowIds.value.size === 0)
  };
  provide(USE_CHECKABLE_TABLE_INJECTION_SYMBOL, state);
  return state;
}

function useDefaultCheckableTableState() {
  return {
    isCheckable: computed(constFalse),
    variant: computed(() => 'is-primary'),
    checkedRowIds: computed(() => new Set()),
    toggleAllRows: constVoid,
    checkAllRows: constVoid,
    uncheckAllRows: constVoid,
    toggleRow: constVoid,
    allRowsChecked: computed(constFalse),
    allRowsUncheckable: computed(constFalse),
    hasCheckableRows: computed(constFalse),
    allRowsUnchecked: computed(constTrue)
  };
}

export function useInjectedCheckableTable() {
  return inject(USE_CHECKABLE_TABLE_INJECTION_SYMBOL, useDefaultCheckableTableState, true);
}
//# sourceMappingURL=useCheckableTable.js.map