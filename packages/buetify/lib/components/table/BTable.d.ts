import { FunctionN } from 'fp-ts/lib/function';
import { PropType, VNode, ExtractPropTypes } from 'vue';
import { Classes } from '../../utils/mergeClasses';
import { PaginationPosition, PaginationSize, PaginationVerticalPosition } from '../pagination/BPagination';
import { BTableColumn, BTableRow } from './shared';
export interface BTablePaginationInput {
    page?: number;
    'onUpdate:page'?: FunctionN<[number], void>;
    perPage?: number;
    size?: PaginationSize;
    isSimple?: boolean;
    isRounded?: boolean;
    horizontalPosition?: PaginationPosition;
    verticalPosition?: PaginationVerticalPosition;
}
export declare const BTablePropsDefinition: {
    useMobileCards: {
        type: PropType<boolean>;
        default: boolean;
    };
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
        type: PropType<import("./shared").SortType>;
        default: "Descending";
    };
    'onUpdate:sortType': {
        type: PropType<FunctionN<[import("./shared").SortType], void>>;
    };
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
    isDraggable: {
        type: BooleanConstructor;
        default: boolean;
    };
    dropEffect: {
        type: PropType<"copy" | "link" | "none" | "move">;
        default: "move";
    };
    onDragstart: {
        type: PropType<FunctionN<[BTableRow, DragEvent, number], void>>;
        default: import("fp-ts/lib/function").Lazy<() => void>;
    };
    onDragenter: {
        type: PropType<FunctionN<[BTableRow, DragEvent, number], void>>;
        default: import("fp-ts/lib/function").Lazy<() => void>;
    };
    onDragover: {
        type: PropType<FunctionN<[BTableRow, DragEvent, number], void>>;
        default: import("fp-ts/lib/function").Lazy<() => void>;
    };
    onDragleave: {
        type: PropType<FunctionN<[BTableRow, DragEvent, number], void>>;
        default: import("fp-ts/lib/function").Lazy<() => void>;
    };
    onDragend: {
        type: PropType<FunctionN<[BTableRow, DragEvent, number], void>>;
        default: import("fp-ts/lib/function").Lazy<() => void>;
    };
    onDrop: {
        type: PropType<FunctionN<[BTableRow, DragEvent, number], void>>;
        default: import("fp-ts/lib/function").Lazy<() => void>;
    };
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
        type: PropType<import("../..").ColorVariant>;
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
        type: PropType<import("../..").SizeVariant>;
    };
    isHoverable: {
        type: PropType<boolean>;
        default: boolean;
    };
    isLoading: {
        type: PropType<boolean>;
        default: boolean;
    };
    isScrollable: {
        type: PropType<boolean>;
        default: boolean;
    };
    themeMap: {
        type: PropType<import("../..").ThemeColorMap>;
        required: boolean;
        default: import("fp-ts/lib/function").Lazy<import("../..").ThemeColorMap>;
    };
    isThemeable: {
        type: PropType<boolean>;
        required: boolean;
        default: boolean;
    };
    columns: {
        type: PropType<BTableColumn<unknown>[]>;
        required: true;
    };
    isFocusable: {
        type: PropType<boolean>;
        default: boolean;
    };
    mobileSortPlaceholder: {
        type: PropType<string>;
    };
    headerClasses: {
        type: PropType<Classes>;
        default: undefined;
    };
    onRowClick: {
        type: PropType<FunctionN<[BTableRow, MouseEvent], void>>;
        required: boolean;
    };
    pagination: {
        type: PropType<boolean | BTablePaginationInput>;
        required: boolean;
    };
};
export interface BTableProps extends ExtractPropTypes<typeof BTablePropsDefinition> {
}
declare const _default: import("vue").DefineComponent<{
    useMobileCards: {
        type: PropType<boolean>;
        default: boolean;
    };
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
        type: PropType<import("./shared").SortType>;
        default: "Descending";
    };
    'onUpdate:sortType': {
        type: PropType<FunctionN<[import("./shared").SortType], void>>;
    };
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
    isDraggable: {
        type: BooleanConstructor;
        default: boolean;
    };
    dropEffect: {
        type: PropType<"copy" | "link" | "none" | "move">;
        default: "move";
    };
    onDragstart: {
        type: PropType<FunctionN<[BTableRow, DragEvent, number], void>>;
        default: import("fp-ts/lib/function").Lazy<() => void>;
    };
    onDragenter: {
        type: PropType<FunctionN<[BTableRow, DragEvent, number], void>>;
        default: import("fp-ts/lib/function").Lazy<() => void>;
    };
    onDragover: {
        type: PropType<FunctionN<[BTableRow, DragEvent, number], void>>;
        default: import("fp-ts/lib/function").Lazy<() => void>;
    };
    onDragleave: {
        type: PropType<FunctionN<[BTableRow, DragEvent, number], void>>;
        default: import("fp-ts/lib/function").Lazy<() => void>;
    };
    onDragend: {
        type: PropType<FunctionN<[BTableRow, DragEvent, number], void>>;
        default: import("fp-ts/lib/function").Lazy<() => void>;
    };
    onDrop: {
        type: PropType<FunctionN<[BTableRow, DragEvent, number], void>>;
        default: import("fp-ts/lib/function").Lazy<() => void>;
    };
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
        type: PropType<import("../..").ColorVariant>;
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
        type: PropType<import("../..").SizeVariant>;
    };
    isHoverable: {
        type: PropType<boolean>;
        default: boolean;
    };
    isLoading: {
        type: PropType<boolean>;
        default: boolean;
    };
    isScrollable: {
        type: PropType<boolean>;
        default: boolean;
    };
    themeMap: {
        type: PropType<import("../..").ThemeColorMap>;
        required: boolean;
        default: import("fp-ts/lib/function").Lazy<import("../..").ThemeColorMap>;
    };
    isThemeable: {
        type: PropType<boolean>;
        required: boolean;
        default: boolean;
    };
    columns: {
        type: PropType<BTableColumn<unknown>[]>;
        required: true;
    };
    isFocusable: {
        type: PropType<boolean>;
        default: boolean;
    };
    mobileSortPlaceholder: {
        type: PropType<string>;
    };
    headerClasses: {
        type: PropType<Classes>;
        default: undefined;
    };
    onRowClick: {
        type: PropType<FunctionN<[BTableRow, MouseEvent], void>>;
        required: boolean;
    };
    pagination: {
        type: PropType<boolean | BTablePaginationInput>;
        required: boolean;
    };
}, () => VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    isThemeable: boolean;
    themeMap: import("../..").ThemeColorMap;
    columns: BTableColumn<unknown>[];
    isLoading: boolean;
    isFullwidth: boolean;
    isHoverable: boolean;
    isBordered: boolean;
    isSelectable: boolean;
    isStriped: boolean;
    isNarrow: boolean;
    isScrollable: boolean;
    useMobileCards: boolean;
    rows: BTableRow[];
    sortType: import("./shared").SortType;
    isDraggable: boolean;
    isCheckable: boolean;
    checkedRows: BTableRow[];
    "onUpdate:checkedRows": FunctionN<[BTableRow[]], void>;
    checkboxVariant: import("../..").ColorVariant;
    canCheckAllRows: boolean;
    onCheckRow: FunctionN<[BTableRow], void>;
    onUncheckRow: FunctionN<[BTableRow], void>;
    dropEffect: "copy" | "link" | "none" | "move";
    onDragstart: FunctionN<[BTableRow, DragEvent, number], void>;
    onDragenter: FunctionN<[BTableRow, DragEvent, number], void>;
    onDragover: FunctionN<[BTableRow, DragEvent, number], void>;
    onDragleave: FunctionN<[BTableRow, DragEvent, number], void>;
    onDragend: FunctionN<[BTableRow, DragEvent, number], void>;
    onDrop: FunctionN<[BTableRow, DragEvent, number], void>;
    selectedRows: BTableRow[];
    "onUpdate:selectedRows": FunctionN<[BTableRow[]], void>;
    onSelectRow: FunctionN<[BTableRow], void>;
    onUnselectRow: FunctionN<[BTableRow], void>;
    isFocusable: boolean;
    headerClasses: Classes;
} & {
    size?: "" | "is-small" | "is-medium" | "is-large" | undefined;
    pagination?: boolean | BTablePaginationInput | undefined;
    sortBy?: BTableColumn<BTableRow> | BTableColumn<BTableRow>[] | undefined;
    "onUpdate:sortBy"?: FunctionN<[BTableColumn<BTableRow> | BTableColumn<BTableRow>[]], void> | undefined;
    "onUpdate:sortType"?: FunctionN<[import("./shared").SortType], void> | undefined;
    onRowClick?: FunctionN<[BTableRow, MouseEvent], void> | undefined;
    mobileSortPlaceholder?: string | undefined;
}>, {
    isThemeable: boolean;
    themeMap: import("../..").ThemeColorMap;
    isLoading: boolean;
    isFullwidth: boolean;
    isHoverable: boolean;
    isBordered: boolean;
    isSelectable: boolean;
    isStriped: boolean;
    isNarrow: boolean;
    isScrollable: boolean;
    useMobileCards: boolean;
    sortType: import("./shared").SortType;
    isDraggable: boolean;
    isCheckable: boolean;
    checkedRows: BTableRow[];
    "onUpdate:checkedRows": FunctionN<[BTableRow[]], void>;
    checkboxVariant: import("../..").ColorVariant;
    canCheckAllRows: boolean;
    onCheckRow: FunctionN<[BTableRow], void>;
    onUncheckRow: FunctionN<[BTableRow], void>;
    dropEffect: "copy" | "link" | "none" | "move";
    onDragstart: FunctionN<[BTableRow, DragEvent, number], void>;
    onDragenter: FunctionN<[BTableRow, DragEvent, number], void>;
    onDragover: FunctionN<[BTableRow, DragEvent, number], void>;
    onDragleave: FunctionN<[BTableRow, DragEvent, number], void>;
    onDragend: FunctionN<[BTableRow, DragEvent, number], void>;
    onDrop: FunctionN<[BTableRow, DragEvent, number], void>;
    selectedRows: BTableRow[];
    "onUpdate:selectedRows": FunctionN<[BTableRow[]], void>;
    onSelectRow: FunctionN<[BTableRow], void>;
    onUnselectRow: FunctionN<[BTableRow], void>;
    isFocusable: boolean;
    headerClasses: Classes;
}>;
export default _default;
