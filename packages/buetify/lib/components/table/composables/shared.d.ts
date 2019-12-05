import { ComputedRef } from 'vue';
import { BTableColumn, BTableRow } from '../shared';
export declare function toSet(rows: BTableRow[]): Set<unknown>;
export declare function provideVisibleColumns(visibleColumns: ComputedRef<BTableColumn[]>): void;
export declare function useInjectedVisibleColumns(): ComputedRef<BTableColumn[]>;
