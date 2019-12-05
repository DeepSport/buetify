import { IO } from 'fp-ts/lib/IO';
import { ExtractPropTypes, Ref, ComputedRef } from 'vue';
import { FunctionN } from 'fp-ts/lib/function';
import { PropType } from 'vue';
import { ColorVariant } from '../../../types/ColorVariants';
import { BTableRow } from '../shared';
export declare const BTableCheckPropsDefinition: {
    isCheckable: {
        type: PropType<boolean>;
        default: boolean;
    };
    checkedRows: {
        type: PropType<BTableRow[]>;
        default: never[];
    };
    'onUpdate:checkedRows': {
        type: PropType<FunctionN<[BTableRow[]], void>>;
        default: import("fp-ts/lib/function").Lazy<() => void>;
    };
    checkboxVariant: {
        type: PropType<ColorVariant>;
        default: "is-primary";
    };
    canCheckAllRows: {
        type: PropType<boolean>;
        default: boolean;
    };
    onCheckRow: {
        type: PropType<FunctionN<[BTableRow], void>>;
        default: import("fp-ts/lib/function").Lazy<() => void>;
    };
    onUncheckRow: {
        type: PropType<FunctionN<[BTableRow], void>>;
        default: import("fp-ts/lib/function").Lazy<() => void>;
    };
};
export interface BTableCheckProps extends ExtractPropTypes<typeof BTableCheckPropsDefinition> {
}
export declare function useCheckableTable(props: BTableCheckProps, rows: Ref<BTableRow[]>): UseCheckableTable;
export interface UseCheckableTable {
    isCheckable: ComputedRef<boolean>;
    variant: ComputedRef<ColorVariant>;
    checkedRowIds: ComputedRef<Set<unknown>>;
    toggleAllRows: IO<void>;
    checkAllRows: IO<void>;
    uncheckAllRows: IO<void>;
    allRowsChecked: ComputedRef<boolean>;
    toggleRow: FunctionN<[BTableRow], void>;
    allRowsUncheckable: ComputedRef<boolean>;
    hasCheckableRows: ComputedRef<boolean>;
    allRowsUnchecked: ComputedRef<boolean>;
}
export declare function useInjectedCheckableTable(): UseCheckableTable;
