import { BTableRowData } from '../shared';

export function toSet(rows: BTableRowData[]): Set<string> {
  const set = new Set<string>();
  rows.forEach(row => set.add(row.id));
  return set;
}
