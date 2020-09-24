import './table.sass';
import { FunctionN } from 'fp-ts/lib/function';
import { Classes } from '../../utils/mergeClasses';
import { BTableColumn, BTableColumnData, BTableRow, BTableRowData, SortType } from './shared';
import { ColorVariant } from '../../types/ColorVariants';
import { Eq } from 'fp-ts/lib/Eq';
import { Option } from 'fp-ts/lib/Option';
import { Ord } from 'fp-ts/lib/Ord';
import { PropType, VNode } from 'vue';
import { SizeVariant } from '../../types/SizeVariants';
export declare const BTablePropsDefinition: {
    isBordered: {
        type: PropType<boolean>;
        default: boolean;
    };
    isStriped: {
        type: PropType<boolean>;
        default: boolean;
    };
    isNarrow: {
        type: PropType<boolean>;
        default: boolean;
    };
    isFullwidth: {
        type: PropType<boolean>;
        default: boolean;
    };
    size: {
        type: PropType<SizeVariant>;
        default: "";
    };
    isHoverable: {
        type: PropType<boolean>;
        default: boolean;
    };
    isLoading: {
        type: PropType<boolean>;
        default: boolean;
    };
    isCheckable: {
        type: PropType<boolean>;
        default: boolean;
    };
    isScrollable: {
        type: PropType<boolean>;
        default: boolean;
    };
    checkedRows: {
        type: PropType<BTableRowData[]>;
        default: import("fp-ts/lib/function").Lazy<never[]>;
    };
    isSelectable: {
        type: PropType<boolean>;
        default: boolean;
    };
    selectedRows: {
        type: PropType<BTableRowData[]>;
        default: import("fp-ts/lib/function").Lazy<never[]>;
    };
    columns: {
        type: PropType<BTableColumnData<any>[]>;
        required: true;
    };
    rows: {
        type: PropType<BTableRowData[]>;
        required: true;
    };
    isDraggable: {
        type: PropType<boolean>;
        default: boolean;
    };
    sortColumn: {
        type: PropType<BTableColumnData<any>>;
    };
    sortType: {
        type: PropType<SortType>;
        default: "Descending";
    };
    isFocusable: {
        type: PropType<boolean>;
        default: boolean;
    };
    useMobileCards: {
        type: PropType<boolean>;
        default: boolean;
    };
    mobileSortPlaceholder: {
        type: PropType<string>;
    };
    checkboxVariant: {
        type: PropType<ColorVariant>;
        default: "is-primary";
    };
    headerClasses: {
        type: PropType<Classes>;
        default: undefined;
    };
    canCheckAllRows: {
        type: PropType<boolean>;
        default: boolean;
    };
    dropEffect: {
        type: PropType<DropEffect>;
        default: "move";
    };
    onCheckRow: {
        type: PropType<FunctionN<[BTableRowData], void>>;
        default: import("fp-ts/lib/function").Lazy<() => void>;
    };
    onUncheckRow: {
        type: PropType<FunctionN<[BTableRowData], void>>;
        default: import("fp-ts/lib/function").Lazy<() => void>;
    };
    onSelectRow: {
        type: PropType<FunctionN<[BTableRowData], void>>;
        default: import("fp-ts/lib/function").Lazy<() => void>;
    };
    onUnselectRow: {
        type: PropType<FunctionN<[BTableRowData], void>>;
        default: import("fp-ts/lib/function").Lazy<() => void>;
    };
    onRowClick: {
        type: PropType<FunctionN<[BTableRowData], void>>;
        default: import("fp-ts/lib/function").Lazy<() => void>;
    };
    onNewSortColumn: {
        type: PropType<FunctionN<[BTableColumnData<any>], void>>;
        default: import("fp-ts/lib/function").Lazy<() => void>;
    };
    onNewSortType: {
        type: PropType<FunctionN<[SortType], void>>;
        default: import("fp-ts/lib/function").Lazy<() => void>;
    };
    onNewCheckedRows: {
        type: PropType<FunctionN<[BTableRowData[]], void>>;
        default: import("fp-ts/lib/function").Lazy<() => void>;
    };
    onNewSelectedRows: {
        type: PropType<FunctionN<[BTableRowData[]], void>>;
        default: import("fp-ts/lib/function").Lazy<() => void>;
    };
    onDragStart: {
        type: PropType<OnDragEffect>;
        default: import("fp-ts/lib/function").Lazy<() => void>;
    };
    onDragEnter: {
        type: PropType<OnDragEffect>;
        default: import("fp-ts/lib/function").Lazy<() => void>;
    };
    onDragOver: {
        type: PropType<OnDragEffect>;
        default: import("fp-ts/lib/function").Lazy<() => void>;
    };
    onDragLeave: {
        type: PropType<OnDragEffect>;
        default: import("fp-ts/lib/function").Lazy<() => void>;
    };
    onDragEnd: {
        type: PropType<OnDragEffect>;
        default: import("fp-ts/lib/function").Lazy<() => void>;
    };
    onDrop: {
        type: PropType<OnDragEffect>;
        default: import("fp-ts/lib/function").Lazy<() => void>;
    };
};
interface Data {
    dragIsActive: boolean;
    dropTarget: Option<BTableRow>;
    newRows: readonly BTableRow[];
    newSortColumn: Option<BTableColumnData<any>>;
    newSortType: SortType;
    newSelectedRows: readonly BTableRow[];
    newCheckedRows: readonly BTableRow[];
}
declare type DropEffect = 'none' | 'copy' | 'link' | 'move';
declare type DragHandler = FunctionN<[DragEvent], void>;
declare type OnDragEffect = FunctionN<[BTableRowData, DragEvent, number], void>;
export declare const eqColumnTableData: Eq<BTableColumnData<any>>;
declare const _default: (new () => import("vue").ComponentPublicInstance<{
    columns: BTableColumnData<any>[];
    rows: BTableRowData[];
} & {
    size?: "" | "is-small" | "is-medium" | "is-large" | undefined;
    isHoverable?: boolean | undefined;
    isLoading?: boolean | undefined;
    isBordered?: boolean | undefined;
    isStriped?: boolean | undefined;
    isNarrow?: boolean | undefined;
    isFullwidth?: boolean | undefined;
    isCheckable?: boolean | undefined;
    isScrollable?: boolean | undefined;
    checkedRows?: BTableRowData[] | undefined;
    isSelectable?: boolean | undefined;
    selectedRows?: BTableRowData[] | undefined;
    isDraggable?: boolean | undefined;
    sortColumn?: BTableColumnData<any> | undefined;
    sortType?: "Ascending" | "Descending" | undefined;
    isFocusable?: boolean | undefined;
    useMobileCards?: boolean | undefined;
    mobileSortPlaceholder?: string | undefined;
    checkboxVariant?: "" | "is-orange" | "is-primary" | "is-info" | "is-link" | "is-success" | "is-warning" | "is-danger" | undefined;
    headerClasses?: Classes;
    canCheckAllRows?: boolean | undefined;
    dropEffect?: "link" | "none" | "copy" | "move" | undefined;
    onCheckRow?: FunctionN<[BTableRowData], void> | undefined;
    onUncheckRow?: FunctionN<[BTableRowData], void> | undefined;
    onSelectRow?: FunctionN<[BTableRowData], void> | undefined;
    onUnselectRow?: FunctionN<[BTableRowData], void> | undefined;
    onRowClick?: FunctionN<[BTableRowData], void> | undefined;
    onNewSortColumn?: FunctionN<[BTableColumnData<any>], void> | undefined;
    onNewSortType?: FunctionN<[SortType], void> | undefined;
    onNewCheckedRows?: FunctionN<[BTableRowData[]], void> | undefined;
    onNewSelectedRows?: FunctionN<[BTableRowData[]], void> | undefined;
    onDragStart?: OnDragEffect | undefined;
    onDragEnter?: OnDragEffect | undefined;
    onDragOver?: OnDragEffect | undefined;
    onDragLeave?: OnDragEffect | undefined;
    onDragEnd?: OnDragEffect | undefined;
    onDrop?: OnDragEffect | undefined;
}, {}, Data, {
    internalCheckedRows: {
        get(): readonly BTableRow[];
        set(val: readonly BTableRow[]): void;
    };
    internalSelectedRows: {
        get(): readonly BTableRow[];
        set(val: readonly BTableRow[]): void;
    };
    internalSortType: {
        get(): SortType;
        set(val: SortType): void;
    };
    internalSortColumn: {
        get(): Option<BTableColumnData<any>>;
        set(val: Option<BTableColumnData<any>>): void;
    };
    tableClasses(): Classes[];
    newColumns(): readonly BTableColumn[];
    allRowsUncheckable(): boolean;
    allRowsChecked(): boolean;
    hasCheckableRows(): boolean;
    checkableRows(): readonly BTableRow[];
    allRowsUnchecked(): boolean;
    selectableRows(): readonly BTableRow[];
    hasSortableColumns(): boolean;
    displayMobileSorting(): boolean;
    isEmpty(): boolean;
    numberOfVisibleColumns(): number;
    visibleColumns(): readonly BTableColumn[];
}, {
    checkSort(): void;
    sortRows(ord: Ord<BTableRow>): void;
    isCurrentSortColumn(column: BTableColumnData<any>): boolean;
    toggleAllRows(): void;
    checkAllRows(): void;
    uncheckAllRows(): void;
    getToggleRowCheck(row: BTableRow): () => void;
    toggleRowCheck(row: BTableRow): void;
    getRowOnClickHandler(row: BTableRow): (e: MouseEvent) => void;
    getOnDragStartListener(row: BTableRow, index: number): DragHandler;
    getOnDropListener(row: BTableRow, index: number): DragHandler;
    getOnDragEnterListener(row: BTableRow, index: number): DragHandler;
    getOnDragOverListener(row: BTableRow, index: number): DragHandler;
    getOnDragLeaveListener(row: BTableRow, index: number): DragHandler;
    getOnDragEndListener(row: BTableRow, index: number): DragHandler;
    getDragListeners(row: BTableRow, index: number): {
        [key: string]: Function | Function[];
    };
    internalOnNewSortType(sortType: SortType): void;
    internalOnNewSortColumn(column: BTableColumnData<any>): void;
    hasCustomFooterSlot(): boolean;
    generateMobileSort(): VNode;
    generateTableHeader(): VNode;
    generateEmptyTable(): VNode;
    generateRow(row: BTableRow, index: number): VNode;
    generateNonEmptyTable(): VNode;
    generateTableBody(): VNode;
    generateTableFooter(): VNode;
    generateTable(): VNode;
}, Record<string, any>, import("vue").VNodeProps, import("vue").ComponentOptionsBase<{
    columns: BTableColumnData<any>[];
    rows: BTableRowData[];
} & {
    size?: "" | "is-small" | "is-medium" | "is-large" | undefined;
    isHoverable?: boolean | undefined;
    isLoading?: boolean | undefined;
    isBordered?: boolean | undefined;
    isStriped?: boolean | undefined;
    isNarrow?: boolean | undefined;
    isFullwidth?: boolean | undefined;
    isCheckable?: boolean | undefined;
    isScrollable?: boolean | undefined;
    checkedRows?: BTableRowData[] | undefined;
    isSelectable?: boolean | undefined;
    selectedRows?: BTableRowData[] | undefined;
    isDraggable?: boolean | undefined;
    sortColumn?: BTableColumnData<any> | undefined;
    sortType?: "Ascending" | "Descending" | undefined;
    isFocusable?: boolean | undefined;
    useMobileCards?: boolean | undefined;
    mobileSortPlaceholder?: string | undefined;
    checkboxVariant?: "" | "is-orange" | "is-primary" | "is-info" | "is-link" | "is-success" | "is-warning" | "is-danger" | undefined;
    headerClasses?: Classes;
    canCheckAllRows?: boolean | undefined;
    dropEffect?: "link" | "none" | "copy" | "move" | undefined;
    onCheckRow?: FunctionN<[BTableRowData], void> | undefined;
    onUncheckRow?: FunctionN<[BTableRowData], void> | undefined;
    onSelectRow?: FunctionN<[BTableRowData], void> | undefined;
    onUnselectRow?: FunctionN<[BTableRowData], void> | undefined;
    onRowClick?: FunctionN<[BTableRowData], void> | undefined;
    onNewSortColumn?: FunctionN<[BTableColumnData<any>], void> | undefined;
    onNewSortType?: FunctionN<[SortType], void> | undefined;
    onNewCheckedRows?: FunctionN<[BTableRowData[]], void> | undefined;
    onNewSelectedRows?: FunctionN<[BTableRowData[]], void> | undefined;
    onDragStart?: OnDragEffect | undefined;
    onDragEnter?: OnDragEffect | undefined;
    onDragOver?: OnDragEffect | undefined;
    onDragLeave?: OnDragEffect | undefined;
    onDragEnd?: OnDragEffect | undefined;
    onDrop?: OnDragEffect | undefined;
}, unknown, Data, {
    internalCheckedRows: {
        get(): readonly BTableRow[];
        set(val: readonly BTableRow[]): void;
    };
    internalSelectedRows: {
        get(): readonly BTableRow[];
        set(val: readonly BTableRow[]): void;
    };
    internalSortType: {
        get(): SortType;
        set(val: SortType): void;
    };
    internalSortColumn: {
        get(): Option<BTableColumnData<any>>;
        set(val: Option<BTableColumnData<any>>): void;
    };
    tableClasses(): Classes[];
    newColumns(): readonly BTableColumn[];
    allRowsUncheckable(): boolean;
    allRowsChecked(): boolean;
    hasCheckableRows(): boolean;
    checkableRows(): readonly BTableRow[];
    allRowsUnchecked(): boolean;
    selectableRows(): readonly BTableRow[];
    hasSortableColumns(): boolean;
    displayMobileSorting(): boolean;
    isEmpty(): boolean;
    numberOfVisibleColumns(): number;
    visibleColumns(): readonly BTableColumn[];
}, {
    checkSort(): void;
    sortRows(ord: Ord<BTableRow>): void;
    isCurrentSortColumn(column: BTableColumnData<any>): boolean;
    toggleAllRows(): void;
    checkAllRows(): void;
    uncheckAllRows(): void;
    getToggleRowCheck(row: BTableRow): () => void;
    toggleRowCheck(row: BTableRow): void;
    getRowOnClickHandler(row: BTableRow): (e: MouseEvent) => void;
    getOnDragStartListener(row: BTableRow, index: number): DragHandler;
    getOnDropListener(row: BTableRow, index: number): DragHandler;
    getOnDragEnterListener(row: BTableRow, index: number): DragHandler;
    getOnDragOverListener(row: BTableRow, index: number): DragHandler;
    getOnDragLeaveListener(row: BTableRow, index: number): DragHandler;
    getOnDragEndListener(row: BTableRow, index: number): DragHandler;
    getDragListeners(row: BTableRow, index: number): {
        [key: string]: Function | Function[];
    };
    internalOnNewSortType(sortType: SortType): void;
    internalOnNewSortColumn(column: BTableColumnData<any>): void;
    hasCustomFooterSlot(): boolean;
    generateMobileSort(): VNode;
    generateTableHeader(): VNode;
    generateEmptyTable(): VNode;
    generateRow(row: BTableRow, index: number): VNode;
    generateNonEmptyTable(): VNode;
    generateTableBody(): VNode;
    generateTableFooter(): VNode;
    generateTable(): VNode;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string>>) & import("vue").ComponentOptionsBase<Readonly<{
    size: SizeVariant;
    isHoverable: boolean;
    isLoading: boolean;
    columns: BTableColumnData<any>[];
    isBordered: boolean;
    isStriped: boolean;
    isNarrow: boolean;
    isFullwidth: boolean;
    isCheckable: boolean;
    isScrollable: boolean;
    checkedRows: BTableRowData[];
    isSelectable: boolean;
    selectedRows: BTableRowData[];
    rows: BTableRowData[];
    isDraggable: boolean;
    sortType: SortType;
    isFocusable: boolean;
    useMobileCards: boolean;
    checkboxVariant: ColorVariant;
    headerClasses: Classes;
    canCheckAllRows: boolean;
    dropEffect: DropEffect;
    onCheckRow: FunctionN<[BTableRowData], void>;
    onUncheckRow: FunctionN<[BTableRowData], void>;
    onSelectRow: FunctionN<[BTableRowData], void>;
    onUnselectRow: FunctionN<[BTableRowData], void>;
    onRowClick: FunctionN<[BTableRowData], void>;
    onNewSortColumn: FunctionN<[BTableColumnData<any>], void>;
    onNewSortType: FunctionN<[SortType], void>;
    onNewCheckedRows: FunctionN<[BTableRowData[]], void>;
    onNewSelectedRows: FunctionN<[BTableRowData[]], void>;
    onDragStart: OnDragEffect;
    onDragEnter: OnDragEffect;
    onDragOver: OnDragEffect;
    onDragLeave: OnDragEffect;
    onDragEnd: OnDragEffect;
    onDrop: OnDragEffect;
} & {
    sortColumn?: BTableColumnData<any> | undefined;
    mobileSortPlaceholder?: string | undefined;
}>, unknown, Data, {
    internalCheckedRows: {
        get(): readonly BTableRow[];
        set(val: readonly BTableRow[]): void;
    };
    internalSelectedRows: {
        get(): readonly BTableRow[];
        set(val: readonly BTableRow[]): void;
    };
    internalSortType: {
        get(): SortType;
        set(val: SortType): void;
    };
    internalSortColumn: {
        get(): Option<BTableColumnData<any>>;
        set(val: Option<BTableColumnData<any>>): void;
    };
    tableClasses(): Classes[];
    newColumns(): readonly BTableColumn[];
    allRowsUncheckable(): boolean;
    allRowsChecked(): boolean;
    hasCheckableRows(): boolean;
    checkableRows(): readonly BTableRow[];
    allRowsUnchecked(): boolean;
    selectableRows(): readonly BTableRow[];
    hasSortableColumns(): boolean;
    displayMobileSorting(): boolean;
    isEmpty(): boolean;
    numberOfVisibleColumns(): number;
    visibleColumns(): readonly BTableColumn[];
}, {
    checkSort(): void;
    sortRows(ord: Ord<BTableRow>): void;
    isCurrentSortColumn(column: BTableColumnData<any>): boolean;
    toggleAllRows(): void;
    checkAllRows(): void;
    uncheckAllRows(): void;
    getToggleRowCheck(row: BTableRow): () => void;
    toggleRowCheck(row: BTableRow): void;
    getRowOnClickHandler(row: BTableRow): (e: MouseEvent) => void;
    getOnDragStartListener(row: BTableRow, index: number): DragHandler;
    getOnDropListener(row: BTableRow, index: number): DragHandler;
    getOnDragEnterListener(row: BTableRow, index: number): DragHandler;
    getOnDragOverListener(row: BTableRow, index: number): DragHandler;
    getOnDragLeaveListener(row: BTableRow, index: number): DragHandler;
    getOnDragEndListener(row: BTableRow, index: number): DragHandler;
    getDragListeners(row: BTableRow, index: number): {
        [key: string]: Function | Function[];
    };
    internalOnNewSortType(sortType: SortType): void;
    internalOnNewSortColumn(column: BTableColumnData<any>): void;
    hasCustomFooterSlot(): boolean;
    generateMobileSort(): VNode;
    generateTableHeader(): VNode;
    generateEmptyTable(): VNode;
    generateRow(row: BTableRow, index: number): VNode;
    generateNonEmptyTable(): VNode;
    generateTableBody(): VNode;
    generateTableFooter(): VNode;
    generateTable(): VNode;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string> & {
    props: {
        isBordered: {
            type: PropType<boolean>;
            default: boolean;
        };
        isStriped: {
            type: PropType<boolean>;
            default: boolean;
        };
        isNarrow: {
            type: PropType<boolean>;
            default: boolean;
        };
        isFullwidth: {
            type: PropType<boolean>;
            default: boolean;
        };
        size: {
            type: PropType<SizeVariant>;
            default: "";
        };
        isHoverable: {
            type: PropType<boolean>;
            default: boolean;
        };
        isLoading: {
            type: PropType<boolean>;
            default: boolean;
        };
        isCheckable: {
            type: PropType<boolean>;
            default: boolean;
        };
        isScrollable: {
            type: PropType<boolean>;
            default: boolean;
        };
        checkedRows: {
            type: PropType<BTableRowData[]>;
            default: import("fp-ts/lib/function").Lazy<never[]>;
        };
        isSelectable: {
            type: PropType<boolean>;
            default: boolean;
        };
        selectedRows: {
            type: PropType<BTableRowData[]>;
            default: import("fp-ts/lib/function").Lazy<never[]>;
        };
        columns: {
            type: PropType<BTableColumnData<any>[]>;
            required: true;
        };
        rows: {
            type: PropType<BTableRowData[]>;
            required: true;
        };
        isDraggable: {
            type: PropType<boolean>;
            default: boolean;
        };
        sortColumn: {
            type: PropType<BTableColumnData<any>>;
        };
        sortType: {
            type: PropType<SortType>;
            default: "Descending";
        };
        isFocusable: {
            type: PropType<boolean>;
            default: boolean;
        };
        useMobileCards: {
            type: PropType<boolean>;
            default: boolean;
        };
        mobileSortPlaceholder: {
            type: PropType<string>;
        };
        checkboxVariant: {
            type: PropType<ColorVariant>;
            default: "is-primary";
        };
        headerClasses: {
            type: PropType<Classes>;
            default: undefined;
        };
        canCheckAllRows: {
            type: PropType<boolean>;
            default: boolean;
        };
        dropEffect: {
            type: PropType<DropEffect>;
            default: "move";
        };
        onCheckRow: {
            type: PropType<FunctionN<[BTableRowData], void>>;
            default: import("fp-ts/lib/function").Lazy<() => void>;
        };
        onUncheckRow: {
            type: PropType<FunctionN<[BTableRowData], void>>;
            default: import("fp-ts/lib/function").Lazy<() => void>;
        };
        onSelectRow: {
            type: PropType<FunctionN<[BTableRowData], void>>;
            default: import("fp-ts/lib/function").Lazy<() => void>;
        };
        onUnselectRow: {
            type: PropType<FunctionN<[BTableRowData], void>>;
            default: import("fp-ts/lib/function").Lazy<() => void>;
        };
        onRowClick: {
            type: PropType<FunctionN<[BTableRowData], void>>;
            default: import("fp-ts/lib/function").Lazy<() => void>;
        };
        onNewSortColumn: {
            type: PropType<FunctionN<[BTableColumnData<any>], void>>;
            default: import("fp-ts/lib/function").Lazy<() => void>;
        };
        onNewSortType: {
            type: PropType<FunctionN<[SortType], void>>;
            default: import("fp-ts/lib/function").Lazy<() => void>;
        };
        onNewCheckedRows: {
            type: PropType<FunctionN<[BTableRowData[]], void>>;
            default: import("fp-ts/lib/function").Lazy<() => void>;
        };
        onNewSelectedRows: {
            type: PropType<FunctionN<[BTableRowData[]], void>>;
            default: import("fp-ts/lib/function").Lazy<() => void>;
        };
        onDragStart: {
            type: PropType<OnDragEffect>;
            default: import("fp-ts/lib/function").Lazy<() => void>;
        };
        onDragEnter: {
            type: PropType<OnDragEffect>;
            default: import("fp-ts/lib/function").Lazy<() => void>;
        };
        onDragOver: {
            type: PropType<OnDragEffect>;
            default: import("fp-ts/lib/function").Lazy<() => void>;
        };
        onDragLeave: {
            type: PropType<OnDragEffect>;
            default: import("fp-ts/lib/function").Lazy<() => void>;
        };
        onDragEnd: {
            type: PropType<OnDragEffect>;
            default: import("fp-ts/lib/function").Lazy<() => void>;
        };
        onDrop: {
            type: PropType<OnDragEffect>;
            default: import("fp-ts/lib/function").Lazy<() => void>;
        };
    };
} & ThisType<import("vue").ComponentPublicInstance<Readonly<{
    size: SizeVariant;
    isHoverable: boolean;
    isLoading: boolean;
    columns: BTableColumnData<any>[];
    isBordered: boolean;
    isStriped: boolean;
    isNarrow: boolean;
    isFullwidth: boolean;
    isCheckable: boolean;
    isScrollable: boolean;
    checkedRows: BTableRowData[];
    isSelectable: boolean;
    selectedRows: BTableRowData[];
    rows: BTableRowData[];
    isDraggable: boolean;
    sortType: SortType;
    isFocusable: boolean;
    useMobileCards: boolean;
    checkboxVariant: ColorVariant;
    headerClasses: Classes;
    canCheckAllRows: boolean;
    dropEffect: DropEffect;
    onCheckRow: FunctionN<[BTableRowData], void>;
    onUncheckRow: FunctionN<[BTableRowData], void>;
    onSelectRow: FunctionN<[BTableRowData], void>;
    onUnselectRow: FunctionN<[BTableRowData], void>;
    onRowClick: FunctionN<[BTableRowData], void>;
    onNewSortColumn: FunctionN<[BTableColumnData<any>], void>;
    onNewSortType: FunctionN<[SortType], void>;
    onNewCheckedRows: FunctionN<[BTableRowData[]], void>;
    onNewSelectedRows: FunctionN<[BTableRowData[]], void>;
    onDragStart: OnDragEffect;
    onDragEnter: OnDragEffect;
    onDragOver: OnDragEffect;
    onDragLeave: OnDragEffect;
    onDragEnd: OnDragEffect;
    onDrop: OnDragEffect;
} & {
    sortColumn?: BTableColumnData<any> | undefined;
    mobileSortPlaceholder?: string | undefined;
}>, {}, Data, {
    internalCheckedRows: {
        get(): readonly BTableRow[];
        set(val: readonly BTableRow[]): void;
    };
    internalSelectedRows: {
        get(): readonly BTableRow[];
        set(val: readonly BTableRow[]): void;
    };
    internalSortType: {
        get(): SortType;
        set(val: SortType): void;
    };
    internalSortColumn: {
        get(): Option<BTableColumnData<any>>;
        set(val: Option<BTableColumnData<any>>): void;
    };
    tableClasses(): Classes[];
    newColumns(): readonly BTableColumn[];
    allRowsUncheckable(): boolean;
    allRowsChecked(): boolean;
    hasCheckableRows(): boolean;
    checkableRows(): readonly BTableRow[];
    allRowsUnchecked(): boolean;
    selectableRows(): readonly BTableRow[];
    hasSortableColumns(): boolean;
    displayMobileSorting(): boolean;
    isEmpty(): boolean;
    numberOfVisibleColumns(): number;
    visibleColumns(): readonly BTableColumn[];
}, {
    checkSort(): void;
    sortRows(ord: Ord<BTableRow>): void;
    isCurrentSortColumn(column: BTableColumnData<any>): boolean;
    toggleAllRows(): void;
    checkAllRows(): void;
    uncheckAllRows(): void;
    getToggleRowCheck(row: BTableRow): () => void;
    toggleRowCheck(row: BTableRow): void;
    getRowOnClickHandler(row: BTableRow): (e: MouseEvent) => void;
    getOnDragStartListener(row: BTableRow, index: number): DragHandler;
    getOnDropListener(row: BTableRow, index: number): DragHandler;
    getOnDragEnterListener(row: BTableRow, index: number): DragHandler;
    getOnDragOverListener(row: BTableRow, index: number): DragHandler;
    getOnDragLeaveListener(row: BTableRow, index: number): DragHandler;
    getOnDragEndListener(row: BTableRow, index: number): DragHandler;
    getDragListeners(row: BTableRow, index: number): {
        [key: string]: Function | Function[];
    };
    internalOnNewSortType(sortType: SortType): void;
    internalOnNewSortColumn(column: BTableColumnData<any>): void;
    hasCustomFooterSlot(): boolean;
    generateMobileSort(): VNode;
    generateTableHeader(): VNode;
    generateEmptyTable(): VNode;
    generateRow(row: BTableRow, index: number): VNode;
    generateNonEmptyTable(): VNode;
    generateTableBody(): VNode;
    generateTableFooter(): VNode;
    generateTable(): VNode;
}, Record<string, any>, Readonly<{
    size: SizeVariant;
    isHoverable: boolean;
    isLoading: boolean;
    columns: BTableColumnData<any>[];
    isBordered: boolean;
    isStriped: boolean;
    isNarrow: boolean;
    isFullwidth: boolean;
    isCheckable: boolean;
    isScrollable: boolean;
    checkedRows: BTableRowData[];
    isSelectable: boolean;
    selectedRows: BTableRowData[];
    rows: BTableRowData[];
    isDraggable: boolean;
    sortType: SortType;
    isFocusable: boolean;
    useMobileCards: boolean;
    checkboxVariant: ColorVariant;
    headerClasses: Classes;
    canCheckAllRows: boolean;
    dropEffect: DropEffect;
    onCheckRow: FunctionN<[BTableRowData], void>;
    onUncheckRow: FunctionN<[BTableRowData], void>;
    onSelectRow: FunctionN<[BTableRowData], void>;
    onUnselectRow: FunctionN<[BTableRowData], void>;
    onRowClick: FunctionN<[BTableRowData], void>;
    onNewSortColumn: FunctionN<[BTableColumnData<any>], void>;
    onNewSortType: FunctionN<[SortType], void>;
    onNewCheckedRows: FunctionN<[BTableRowData[]], void>;
    onNewSelectedRows: FunctionN<[BTableRowData[]], void>;
    onDragStart: OnDragEffect;
    onDragEnter: OnDragEffect;
    onDragOver: OnDragEffect;
    onDragLeave: OnDragEffect;
    onDragEnd: OnDragEffect;
    onDrop: OnDragEffect;
} & {
    sortColumn?: BTableColumnData<any> | undefined;
    mobileSortPlaceholder?: string | undefined;
}>, import("vue").ComponentOptionsBase<Readonly<{
    size: SizeVariant;
    isHoverable: boolean;
    isLoading: boolean;
    columns: BTableColumnData<any>[];
    isBordered: boolean;
    isStriped: boolean;
    isNarrow: boolean;
    isFullwidth: boolean;
    isCheckable: boolean;
    isScrollable: boolean;
    checkedRows: BTableRowData[];
    isSelectable: boolean;
    selectedRows: BTableRowData[];
    rows: BTableRowData[];
    isDraggable: boolean;
    sortType: SortType;
    isFocusable: boolean;
    useMobileCards: boolean;
    checkboxVariant: ColorVariant;
    headerClasses: Classes;
    canCheckAllRows: boolean;
    dropEffect: DropEffect;
    onCheckRow: FunctionN<[BTableRowData], void>;
    onUncheckRow: FunctionN<[BTableRowData], void>;
    onSelectRow: FunctionN<[BTableRowData], void>;
    onUnselectRow: FunctionN<[BTableRowData], void>;
    onRowClick: FunctionN<[BTableRowData], void>;
    onNewSortColumn: FunctionN<[BTableColumnData<any>], void>;
    onNewSortType: FunctionN<[SortType], void>;
    onNewCheckedRows: FunctionN<[BTableRowData[]], void>;
    onNewSelectedRows: FunctionN<[BTableRowData[]], void>;
    onDragStart: OnDragEffect;
    onDragEnter: OnDragEffect;
    onDragOver: OnDragEffect;
    onDragLeave: OnDragEffect;
    onDragEnd: OnDragEffect;
    onDrop: OnDragEffect;
} & {
    sortColumn?: BTableColumnData<any> | undefined;
    mobileSortPlaceholder?: string | undefined;
}>, unknown, Data, {
    internalCheckedRows: {
        get(): readonly BTableRow[];
        set(val: readonly BTableRow[]): void;
    };
    internalSelectedRows: {
        get(): readonly BTableRow[];
        set(val: readonly BTableRow[]): void;
    };
    internalSortType: {
        get(): SortType;
        set(val: SortType): void;
    };
    internalSortColumn: {
        get(): Option<BTableColumnData<any>>;
        set(val: Option<BTableColumnData<any>>): void;
    };
    tableClasses(): Classes[];
    newColumns(): readonly BTableColumn[];
    allRowsUncheckable(): boolean;
    allRowsChecked(): boolean;
    hasCheckableRows(): boolean;
    checkableRows(): readonly BTableRow[];
    allRowsUnchecked(): boolean;
    selectableRows(): readonly BTableRow[];
    hasSortableColumns(): boolean;
    displayMobileSorting(): boolean;
    isEmpty(): boolean;
    numberOfVisibleColumns(): number;
    visibleColumns(): readonly BTableColumn[];
}, {
    checkSort(): void;
    sortRows(ord: Ord<BTableRow>): void;
    isCurrentSortColumn(column: BTableColumnData<any>): boolean;
    toggleAllRows(): void;
    checkAllRows(): void;
    uncheckAllRows(): void;
    getToggleRowCheck(row: BTableRow): () => void;
    toggleRowCheck(row: BTableRow): void;
    getRowOnClickHandler(row: BTableRow): (e: MouseEvent) => void;
    getOnDragStartListener(row: BTableRow, index: number): DragHandler;
    getOnDropListener(row: BTableRow, index: number): DragHandler;
    getOnDragEnterListener(row: BTableRow, index: number): DragHandler;
    getOnDragOverListener(row: BTableRow, index: number): DragHandler;
    getOnDragLeaveListener(row: BTableRow, index: number): DragHandler;
    getOnDragEndListener(row: BTableRow, index: number): DragHandler;
    getDragListeners(row: BTableRow, index: number): {
        [key: string]: Function | Function[];
    };
    internalOnNewSortType(sortType: SortType): void;
    internalOnNewSortColumn(column: BTableColumnData<any>): void;
    hasCustomFooterSlot(): boolean;
    generateMobileSort(): VNode;
    generateTableHeader(): VNode;
    generateEmptyTable(): VNode;
    generateRow(row: BTableRow, index: number): VNode;
    generateNonEmptyTable(): VNode;
    generateTableBody(): VNode;
    generateTableFooter(): VNode;
    generateTable(): VNode;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string>>>;
export default _default;
