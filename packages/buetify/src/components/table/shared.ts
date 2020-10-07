import { FunctionN } from 'fp-ts/function';
import { contramap, Eq, eqStrict, eqString } from 'fp-ts/lib/Eq';
import { Ord } from 'fp-ts/lib/Ord';
import { toggleListItem } from '../../utils/helpers';
import { Classes } from '../../utils/mergeClasses';

export interface BTableColumn<T = BTableRow> extends BTableColumnData<T> {
  isVisible: boolean;
  position: BTableColumnPosition;
  isSortColumn: boolean;
  isSortable: boolean;
}

export type SortType = 'Ascending' | 'Descending';

export interface BTableColumnData<T = BTableRow> {
  label: string;
  detail?: string;
  slotName?: string;
  value?: keyof T | FunctionN<[T], unknown>;
  asHtml?: boolean;
  isSortable?: boolean;
  meta?: any;
  isVisible?: boolean;
  ord?: Ord<T>;
  position?: BTableColumnPosition;
  width?: string | number;
  classes?: Classes;
  isSticky?: boolean;
}

export type BTableColumnPosition = 'is-left' | 'is-centered' | 'is-right';

export interface BTableRow {
  id: unknown;
  isDroppable?: boolean;
  isDraggable?: boolean;
  isSelectable?: boolean;
  isCheckable?: boolean;
  classes?: Classes;
}

export const eqBTableRowData: Eq<BTableRow> = contramap<unknown, BTableRow>(row => row.id)(eqStrict);

export const eqColumnTableData: Eq<BTableColumnData> = contramap<string, BTableColumnData>(column => column.label)(
  eqString
);

export const toggleBTableRow = toggleListItem(eqBTableRowData);
