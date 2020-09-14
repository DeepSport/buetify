import { eq, Eq, eqString } from 'fp-ts/lib/Eq';
import { Ord } from 'fp-ts/lib/Ord';
import { toggleListItem } from '../../utils/helpers';
import { Classes } from '../../utils/mergeClasses';

export interface BTableColumn<T = any> extends BTableColumnData<T> {
  isVisible: boolean;
  position: BTableColumnPosition;
  isSortColumn: boolean;
  isSortable: boolean;
}

export type SortType = 'Ascending' | 'Descending';

export interface BTableColumnData<T = any> {
  label: string;
  detail?: string;
  slotName?: string;
  value: string | ((val: T) => any);
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

export interface BTableRow extends BTableRowData {
  index: number;
  isSelectable: boolean;
  isCheckable: boolean;
  isDraggable: boolean;
  isDroppable: boolean;
}

export interface BTableRowData {
  id: string;
  isDroppable?: boolean;
  isDraggable?: boolean;
  isSelectable?: boolean;
  isCheckable?: boolean;
  classes?: Classes;
  data: object;
}

export const eqBTableRow: Eq<BTableRow> = eq.contramap(eqString, row => row.id);
export const eqBTableRowData: Eq<BTableRowData> = eqBTableRow as Eq<BTableRowData>;
export const eqColumnTableData: Eq<BTableColumnData<any>> = eq.contramap(eqString, column => column.label);
export const toggleBTableRow = toggleListItem(eqBTableRow);
