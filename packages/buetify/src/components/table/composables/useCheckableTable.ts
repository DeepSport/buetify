import { IO } from 'fp-ts/lib/IO';
import { ExtractPropTypes, computed, Ref, ComputedRef, provide, inject, shallowRef, watch } from 'vue';
import { constant, constFalse, constTrue, constVoid, FunctionN } from 'fp-ts/lib/function';
import { PropType } from 'vue';
import { ColorVariant } from '../../../types/ColorVariants';
import { constEmptyArray } from '../../../utils/helpers';
import { BTableRow, BTableRowData, toggleBTableRow } from '../shared';
import { toSet } from './shared';

export const BTableCheckPropsDefinition = {
  isCheckable: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  checkedRows: {
    type: Array as PropType<BTableRowData[]>,
    default: constEmptyArray()
  },
  'onUpdate:checkedRows': {
    type: Function as PropType<FunctionN<[BTableRowData[]], void>>,
    default: constant(constVoid)
  },
  checkboxVariant: {
    type: String as PropType<ColorVariant>,
    default: 'is-primary' as const
  },
  canCheckAllRows: {
    type: Boolean as PropType<boolean>,
    default: true
  },
  onCheckRow: {
    type: Function as PropType<FunctionN<[BTableRowData], void>>,
    default: constant(constVoid)
  },
  onUncheckRow: {
    type: Function as PropType<FunctionN<[BTableRowData], void>>,
    default: constant(constVoid)
  }
};

export interface BTableCheckProps extends ExtractPropTypes<typeof BTableCheckPropsDefinition> {}

const USE_CHECKABLE_TABLE_INJECTION_SYMBOL = Symbol();

export function useCheckableTable(props: BTableCheckProps, rows: Ref<BTableRow[]>): UseCheckableTable {
  const checkableRows = computed(() => (props.isCheckable ? rows.value.filter(row => row.isCheckable) : []));
  const propCheckedRows = computed(() => (props.isCheckable ? props.checkedRows : []));
  const newCheckedRows = shallowRef(propCheckedRows.value);

  watch(propCheckedRows, newValue => {
    newCheckedRows.value = newValue
  })

  const checkedRowIds = computed(() => toSet(newCheckedRows.value));

  const allRowsChecked = computed(() => {
    const ids = checkedRowIds.value;
    return checkableRows.value.length > 0 && checkableRows.value.every(row => ids.has(row.id));
  });

  const allRowsUncheckable = computed(() => rows.value.every(row => !row.isCheckable));

  function checkAllRows() {
    const cRows = checkableRows.value;
    newCheckedRows.value = cRows;
    props['onUpdate:checkedRows'](cRows)
  }

  function toggleRow(row: BTableRow) {
    console.log('toggle-row', row.isCheckable);
    if (row.isCheckable) {
      const ids = checkedRowIds.value;
      if (ids.has(row.id)) {
        console.log('unchecking-row', row);
        props.onUncheckRow(row)
      } else {
        console.log('checking-row', row)
        props.onCheckRow(row)
      }
      const cRows = toggleBTableRow(row, newCheckedRows.value as BTableRow[])
      newCheckedRows.value = cRows;
      props['onUpdate:checkedRows'](cRows)
    }
  }

  function uncheckAllRows() {
    newCheckedRows.value = [];
    props['onUpdate:checkedRows']([])
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

export interface UseCheckableTable {
  isCheckable: ComputedRef<boolean>;
  variant: ComputedRef<ColorVariant>;
  checkedRowIds: ComputedRef<Set<string>>;
  toggleAllRows: IO<void>;
  checkAllRows: IO<void>;
  uncheckAllRows: IO<void>;
  allRowsChecked: ComputedRef<boolean>;
  toggleRow: FunctionN<[BTableRow], void>;
  allRowsUncheckable: ComputedRef<boolean>;
  hasCheckableRows: ComputedRef<boolean>;
  allRowsUnchecked: ComputedRef<boolean>;
}

function useDefaultCheckableTableState(): UseCheckableTable {
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

export function useInjectedCheckableTable(): UseCheckableTable {
  return inject(USE_CHECKABLE_TABLE_INJECTION_SYMBOL, useDefaultCheckableTableState, true);
}
