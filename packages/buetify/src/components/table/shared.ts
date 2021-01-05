import { FunctionN } from 'fp-ts/lib/function';
import { contramap, Eq, eqStrict, eqString } from 'fp-ts/lib/Eq';
import { Ord } from 'fp-ts/lib/Ord';
import { toggleListItem } from '../../utils/helpers';
import { Classes } from '../../utils/mergeClasses';

export interface BTableRow {
  id: unknown;
  isDroppable?: boolean;
  isDraggable?: boolean;
  isSelectable?: boolean;
  isCheckable?: boolean;
  classes?: Classes;
}

export type SortType = 'Ascending' | 'Descending';

export type BTableColumnPosition = 'is-left' | 'is-centered' | 'is-right';

export interface BTableColumnSort<T = BTableRow> {
  ord: Ord<T>;
  sortType?: SortType;
}
export interface BTableColumn<T = BTableRow> {
  label: string;
  detail?: string;
  slotName?: string;
  value?: keyof T | FunctionN<[T], unknown>;
  asHtml?: boolean;
  sort?: boolean | BTableColumnSort<T>;
  meta?: unknown;
  isVisible?: boolean;
  position?: BTableColumnPosition;
  style?: Record<string, string>;
  classes?: Classes;
  isSticky?: boolean;
}

export const eqBTableRowData: Eq<BTableRow> = contramap<unknown, BTableRow>(row => row.id)(eqStrict);

export const eqBTableColumn: Eq<BTableColumn> = contramap<string, BTableColumn>(column => column.label)(eqString);

export const toggleBTableRow = toggleListItem(eqBTableRowData);

export const toggleBTableColumn = toggleListItem(eqBTableColumn);
