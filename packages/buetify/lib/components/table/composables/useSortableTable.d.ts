import { ExtractPropTypes, Ref, ComputedRef } from 'vue';
import { FunctionN } from 'fp-ts/lib/function';
import { PropType } from 'vue';
import { BTableColumn, BTableRow, SortType } from '../shared';
export declare const BTableSortingPropsDefinition: {
    rows: {
        type: PropType<BTableRow[]>;
        required: true;
    };
    sortBy: {
        type: PropType<BTableColumn<BTableRow> | BTableColumn<BTableRow>[]>;
    };
    'onUpdate:sortBy': {
        type: PropType<FunctionN<[BTableColumn<BTableRow> | BTableColumn<BTableRow>[]], void>>;
    };
    sortType: {
        type: PropType<SortType>;
        default: "Descending";
    };
    'onUpdate:sortType': {
        type: PropType<FunctionN<[SortType], void>>;
    };
};
export interface BTableSortingProps extends ExtractPropTypes<typeof BTableSortingPropsDefinition> {
}
export interface UseSortableTable {
    sortBy: Ref<BTableColumn[]>;
    sortType: Ref<SortType>;
    isMultiple: ComputedRef<boolean>;
    sortByMap: ComputedRef<Map<string, BTableColumn & {
        sortIndex: number;
    }>>;
    updateSortColumn: FunctionN<[string], void>;
    updateSortDirection: (columnLabel?: string) => void;
    sortableColumns: ComputedRef<BTableColumn[]>;
    hasSortableColumns: ComputedRef<boolean>;
}
export declare function useSortableTable(props: BTableSortingProps, rows: Ref<BTableRow[]>, columns: Ref<BTableColumn[]>): UseSortableTable;
export declare function useInjectedSortableTable(): UseSortableTable;
