import { provide, inject, computed } from 'vue';
import { constEmptyArray } from '../../../utils/helpers';
export function toSet(rows) {
  const set = new Set();
  rows.forEach(row => set.add(row.id));
  return set;
}
const COLUMNS_INJECTION_SYMBOL = Symbol();
export function provideVisibleColumns(visibleColumns) {
  provide(COLUMNS_INJECTION_SYMBOL, visibleColumns);
}
const DEFAULT_VISIBLE_COLUMNS = computed(constEmptyArray);
export function useInjectedVisibleColumns() {
  return inject(COLUMNS_INJECTION_SYMBOL, DEFAULT_VISIBLE_COLUMNS);
}
//# sourceMappingURL=shared.js.map