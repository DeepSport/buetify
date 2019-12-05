import { FunctionN } from 'fp-ts/lib/function';
import { ExtractPropTypes, PropType, ComputedRef, Ref } from 'vue';
import { BTableRow } from '../shared';
export declare const BTableSelectablePropsDefinition: {
    isSelectable: {
        type: PropType<boolean>;
        default: boolean;
    };
    selectedRows: {
        type: PropType<BTableRow[]>;
        default: import("fp-ts/lib/function").Lazy<never[]>;
    };
    'onUpdate:selectedRows': {
        type: PropType<FunctionN<[BTableRow[]], void>>;
        default: import("fp-ts/lib/function").Lazy<() => void>;
    };
    onSelectRow: {
        type: PropType<FunctionN<[BTableRow], void>>;
        default: import("fp-ts/lib/function").Lazy<() => void>;
    };
    onUnselectRow: {
        type: PropType<FunctionN<[BTableRow], void>>;
        default: import("fp-ts/lib/function").Lazy<() => void>;
    };
};
export interface BTableSelectableProps extends ExtractPropTypes<typeof BTableSelectablePropsDefinition> {
}
export declare function useSelectableTable(props: BTableSelectableProps): UseSelectableTableState;
export interface UseSelectableTableState {
    isSelectable: Ref<boolean>;
    selectedRowIds: ComputedRef<Set<unknown>>;
    toggleRowSelection: FunctionN<[BTableRow], void>;
}
export declare function useInjectedSelectableTable(): UseSelectableTableState;
