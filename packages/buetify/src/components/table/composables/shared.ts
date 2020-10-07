import { BTableRow } from '../shared';

export function toSet(rows: BTableRow[]): Set<unknown> {
  const set = new Set<unknown>();
  rows.forEach(row => set.add(row.id));
  return set;
}
