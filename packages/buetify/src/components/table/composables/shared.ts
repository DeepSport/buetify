import { ComputedRef, provide, inject, computed } from 'vue';
import { constEmptyArray } from '../../../utils/helpers';

import { BTableColumn, BTableRow } from '../shared';

export function toSet(rows: BTableRow[]): Set<unknown> {
  const set = new Set<unknown>();
  rows.forEach(row => set.add(row.id));
  return set;
}

const COLUMNS_INJECTION_SYMBOL = Symbol();

export function provideVisibleColumns(visibleColumns: ComputedRef<BTableColumn[]>) {
  provide(COLUMNS_INJECTION_SYMBOL, visibleColumns);
}

const DEFAULT_VISIBLE_COLUMNS = computed<BTableColumn[]>(constEmptyArray);

export function useInjectedVisibleColumns(): ComputedRef<BTableColumn[]> {
  return inject(COLUMNS_INJECTION_SYMBOL, DEFAULT_VISIBLE_COLUMNS);
}
