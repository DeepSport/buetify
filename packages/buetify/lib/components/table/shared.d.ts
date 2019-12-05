import { FunctionN } from 'fp-ts/function';
import { Eq } from 'fp-ts/lib/Eq';
import { Ord } from 'fp-ts/lib/Ord';
import { Classes } from '../../utils/mergeClasses';
export interface BTableRow {
    id: unknown;
    isDroppable?: boolean;
    isDraggable?: boolean;
    isSelectable?: boolean;
    isCheckable?: boolean;
    classes?: Classes;
}
export declare type SortType = 'Ascending' | 'Descending';
export declare type BTableColumnPosition = 'is-left' | 'is-centered' | 'is-right';
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
    width?: string | number;
    classes?: Classes;
    isSticky?: boolean;
}
export declare const eqBTableRowData: Eq<BTableRow>;
export declare const eqBTableColumn: Eq<BTableColumn>;
export declare const toggleBTableRow: (a: BTableRow, as: BTableRow[]) => BTableRow[];
export declare const toggleBTableColumn: (a: BTableColumn<BTableRow>, as: BTableColumn<BTableRow>[]) => BTableColumn<BTableRow>[];
