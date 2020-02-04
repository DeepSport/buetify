import "./table.sass";
import BSimpleTable from "./BSimpleTable";
import BTableRowElement from "./BTableRow";
import BTableHeader from "./BTableHeader";
import BTableMobileSort from "./BTableMobileSort";
import {
  BTableColumn,
  BTableColumnData,
  BTableRow,
  BTableRowData,
  SortType
} from "./shared";
import {
  alwaysEmptyArray,
  alwaysZero,
  isBoolean,
  isMobile,
  remove,
  toggle
} from "../../utils/helpers";
import { ColorVariant } from "../../types/ColorVariants";
import {
  copy,
  head,
  isEmpty,
  isNonEmpty,
  reverse,
  snoc,
  sort
} from "fp-ts/lib/Array";
import { Eq, eq, eqString } from "fp-ts/lib/Eq";
import {
  chain,
  exists,
  fold,
  fromNullable,
  getOrElse,
  isNone,
  isSome,
  mapNullable,
  Option,
  some,
  toUndefined
} from "fp-ts/lib/Option";
import { Ord } from "fp-ts/lib/Ord";
import { pipe } from "fp-ts/lib/pipeable";
import Vue, { PropType, VNode } from "vue";
import { PropValidator } from "vue/types/options";
import { SizeVariant } from "../../types/SizeVariants";

interface Data {
  newRows: readonly BTableRow[];
  newSortColumn: Option<BTableColumnData<any>>;
  newSortType: SortType;
  newSelectedRows: readonly BTableRow[];
  newCheckedRows: readonly BTableRow[];
}

interface RowProps {
  isSelectable: boolean;
  isCheckable: boolean;
  isDraggable: boolean;
  selectedRows: BTableRowData[];
  checkedRows: BTableRowData[];
}

function getBTableRow(rowProps: RowProps) {
  return (data: BTableRowData, index: number): BTableRow => ({
    ...data,
    index,
    isDraggable:
      data.isDraggable !== undefined ? data.isDraggable : rowProps.isDraggable,
    isSelectable:
      data.isSelectable !== undefined
        ? data.isSelectable
        : rowProps.isSelectable,
    isCheckable:
      data.isCheckable !== undefined ? data.isCheckable : rowProps.isCheckable,
    isChecked: rowProps.checkedRows.some(row =>
      eqBTableRowData.equals(row, data)
    ),
    isSelected: rowProps.selectedRows.some(row =>
      eqBTableRowData.equals(row, data)
    )
  });
}

const eqBTableRow: Eq<BTableRow> = eq.contramap(eqString, row => row.id);

const eqBTableRowData: Eq<BTableRowData> = eqBTableRow as Eq<BTableRowData>;

const toggleBTableRow = toggle(eqBTableRow);

export const eqColumnTableData: Eq<BTableColumnData<any>> = eq.contramap(
  eqString,
  column => column.label
);

export default Vue.extend({
  name: "BTable",
  props: {
    isBordered: {
      type: Boolean,
      required: false,
      default: false
    },
    isStriped: {
      type: Boolean,
      required: false,
      default: false
    },
    isNarrow: {
      type: Boolean,
      required: false,
      default: false
    },
    isFullwidth: {
      type: Boolean,
      required: false,
      default: true
    },
    size: {
      type: String
    } as PropValidator<SizeVariant>,
    isHoverable: {
      type: Boolean,
      required: false,
      default: false
    },
    isLoading: {
      type: Boolean,
      required: false,
      default: false
    },
    isCheckable: {
      type: Boolean,
      required: false,
      default: false
    },
    isScrollable: {
      type: Boolean,
      default: true
    },
    checkedRows: {
      type: Array as PropType<BTableRowData[]>,
      default: alwaysEmptyArray
    },
    isSelectable: {
      type: Boolean,
      default: false
    },
    selectedRows: {
      type: Array as PropType<BTableRowData[]>,
      default: alwaysEmptyArray
    },
    columns: {
      type: Array as PropType<BTableColumnData<any>[]>,
      required: true
    },
    rows: {
      type: Array as PropType<BTableRowData[]>,
      required: true
    },
    isDraggable: {
      type: Boolean,
      required: false,
      default: false
    },
    sortColumn: {
      type: Object,
      default: undefined
    } as PropValidator<BTableColumnData<any> | undefined>,
    sortType: {
      type: String,
      default: "Descending"
    } as PropValidator<SortType>,
    isFocusable: {
      type: Boolean,
      default: false
    },
    useMobileCards: {
      type: Boolean,
      default: true
    },
    mobileSortPlaceholder: {
      type: String
    },
    checkboxVariant: {
      type: String as PropType<ColorVariant>,
      required: false,
      default: "is-primary"
    },
    headerClasses: {
      type: [String, Object, Array],
      default: undefined
    }
  },
  data(): Data {
    const mapRow = getBTableRow({
      isCheckable: this.isCheckable,
      isSelectable: this.isSelectable,
      checkedRows: this.checkedRows,
      selectedRows: this.selectedRows,
      isDraggable: this.isDraggable
    });
    return {
      newRows: Object.freeze(this.rows.map(mapRow)),
      newCheckedRows: Object.freeze(this.checkedRows.map(mapRow)),
      newSelectedRows: Object.freeze(this.selectedRows.map(mapRow)),
      newSortColumn: fromNullable(this.sortColumn),
      newSortType: this.sortType
    };
  },
  computed: {
    internalCheckedRows: {
      get(): readonly BTableRow[] {
        return this.newCheckedRows;
      },
      set(val: readonly BTableRow[]): void {
        this.newCheckedRows = val;
        this.newRows = Object.freeze(
          this.newRows.map(
            getBTableRow({
              isCheckable: this.isCheckable,
              isSelectable: this.isSelectable,
              checkedRows: val as BTableRow[],
              selectedRows: this.internalSelectedRows as BTableRow[],
              isDraggable: this.isDraggable
            })
          )
        );
        this.$emit("new-checked-rows", val);
        this.$emit("update:checkedRows", val);
      }
    },
    internalSelectedRows: {
      get(): readonly BTableRow[] {
        return this.newSelectedRows;
      },
      set(val: readonly BTableRow[]): void {
        this.newSelectedRows = val;
        this.newRows = Object.freeze(
          this.newRows.map(
            getBTableRow({
              isCheckable: this.isCheckable,
              isSelectable: this.isSelectable,
              checkedRows: this.internalCheckedRows as BTableRow[],
              selectedRows: val as BTableRow[],
              isDraggable: this.isDraggable
            })
          )
        );
        this.$emit("new-selected-rows", val);
        this.$emit("update:selectedRows", val);
      }
    },
    internalSortType: {
      get(): SortType {
        return this.newSortType;
      },
      set(val: SortType): void {
        this.newSortType = val;
        this.$emit("new-sort-type", val);
        this.$emit("update:sortType", val);
      }
    },
    internalSortColumn: {
      get(): Option<BTableColumnData<any>> {
        return this.newSortColumn;
      },
      set(val: Option<BTableColumnData<any>>): void {
        this.newSortColumn = val;
        if (isSome(val)) {
          this.$emit("new-sort-column", val.value);
          this.$emit("update:sortColumn", val.value);
        }
      }
    },
    tableClasses(): any {
      return [
        {
          "is-bordered": this.isBordered,
          "is-striped": this.isStriped,
          "is-narrow": this.isNarrow,
          "is-fullwidth": this.isFullwidth,
          "is-hoverable": this.isHoverable,
          "has-mobile-cards": this.useMobileCards
        },
        this.size
      ];
    },
    newColumns(): readonly BTableColumn[] {
      return Object.freeze(
        this.columns.map((column: BTableColumnData<any>) => {
          return {
            ...column,
            position: column.position || "is-centered",
            isVisible: isBoolean(column.isVisible) ? column.isVisible : true,
            isSortColumn: this.isCurrentSortColumn(column),
            isSortable: !!column.isSortable || !!column.ord
          };
        })
      );
    },
    allRowsUncheckable(): boolean {
      return this.newRows.every(row => !row.isCheckable);
    },
    allRowsChecked(): boolean {
      return (
        this.checkableRows.every(row => row.isChecked) &&
        this.checkableRows.length > 0
      );
    },
    hasCheckableRows(): boolean {
      return this.isCheckable && isNonEmpty(this.checkableRows as BTableRow[]);
    },
    checkableRows(): readonly BTableRow[] {
      return Object.freeze(this.newRows.filter(row => row.isCheckable));
    },
    allRowsUnchecked(): boolean {
      return this.newRows.every(row => !row.isChecked);
    },
    selectableRows(): readonly BTableRow[] {
      return Object.freeze(this.newRows.filter(r => r.isSelectable));
    },
    hasSortableColumns(): boolean {
      return this.newColumns.some(column => column.isSortable);
    },
    displayMobileSorting(): boolean {
      return this.useMobileCards && this.hasSortableColumns && !!isMobile.any();
    },
    isEmpty(): boolean {
      return isEmpty(this.newRows as BTableRow[]);
    },
    numberOfVisibleColumns(): number {
      return this.visibleColumns.length;
    },
    visibleColumns(): readonly BTableColumn[] {
      return Object.freeze(this.newColumns.filter(column => column.isVisible));
    }
  },
  watch: {
    rows() {
      const mapRow = getBTableRow({
        isCheckable: this.isCheckable,
        isSelectable: this.isSelectable,
        checkedRows: this.internalCheckedRows as BTableRow[],
        selectedRows: this.internalSelectedRows as BTableRow[],
        isDraggable: this.isDraggable
      });
      this.newRows = Object.freeze(this.rows.map(mapRow));
      this.checkSort();
    },
    sortColumn(
      newVal: BTableColumnData<any> | undefined,
      oldVal: BTableColumnData<any> | undefined
    ) {
      if (newVal !== oldVal) {
        this.newSortColumn = fromNullable(this.sortColumn);
      }
    },
    sortType(newVal: SortType, oldVal: SortType) {
      if (newVal !== oldVal) {
        this.newSortType = newVal;
      }
    },
    checkedRows() {
      const mapRow = getBTableRow({
        isCheckable: this.isCheckable,
        isSelectable: this.isSelectable,
        checkedRows: this.checkedRows,
        selectedRows: this.internalSelectedRows as BTableRow[],
        isDraggable: this.isDraggable
      });
      this.newCheckedRows = Object.freeze(this.checkedRows.map(mapRow));
      this.newRows = Object.freeze(this.newRows.map(mapRow));
    },
    selectedRows() {
      const mapRow = getBTableRow({
        isCheckable: this.isCheckable,
        isSelectable: this.isSelectable,
        checkedRows: this.internalCheckedRows as BTableRow[],
        selectedRows: this.selectedRows,
        isDraggable: this.isDraggable
      });
      this.newSelectedRows = Object.freeze(this.selectedRows.map(mapRow));
      this.newRows = Object.freeze(this.newRows.map(mapRow));
    }
  },
  methods: {
    checkSort(): void {
      if (
        isSome(this.newSortColumn) &&
        this.newSortColumn.value.ord !== undefined
      ) {
        this.sortRows(this.newSortColumn.value.ord);
      }
    },
    sortByColumn(column: BTableColumnData<any>): void {
      if (column.ord === undefined && !!column.isSortable) {
        if (this.isCurrentSortColumn(column)) {
          this.internalSortType =
            this.newSortType === "Ascending" ? "Descending" : "Ascending";
        } else {
          this.internalSortColumn = some(column);
        }
      } else if (column.ord && !!column.isSortable) {
        if (this.isCurrentSortColumn(column)) {
          this.internalSortType =
            this.newSortType === "Ascending" ? "Descending" : "Ascending";
          this.newRows = Object.freeze(reverse(this.newRows as BTableRow[]));
        } else {
          this.sortRows(column.ord);
          this.internalSortColumn = some(column);
        }
      }
    },
    sortRows(ord: Ord<BTableRow>) {
      this.newRows = Object.freeze(
        pipe(this.newRows as BTableRow[], sort(ord))
      );
    },
    isCurrentSortColumn(column: BTableColumnData<any>): boolean {
      return pipe(
        this.newSortColumn,
        exists(sortColumn => eqColumnTableData.equals(column, sortColumn))
      );
    },
    toggleAllRows(): void {
      this.allRowsChecked ? this.uncheckAllRows() : this.checkAllRows();
    },
    checkAllRows(): void {
      this.$emit("check-all-rows");
      this.internalCheckedRows = this.checkableRows;
    },
    uncheckAllRows(): void {
      this.$emit("uncheck-all-rows");
      this.internalCheckedRows = [];
    },
    getToggleRowCheck(row: BTableRow) {
      return () => this.toggleRowCheck(row);
    },
    toggleRowCheck(row: BTableRow): void {
      if (row.isCheckable) {
        this.$emit(row.isChecked ? "uncheck-row" : "check-row", row);
        this.internalCheckedRows = Object.freeze(
          toggleBTableRow(row, this.internalCheckedRows as BTableRow[])
        );
      }
    },
    getToggleRowSelection(row: BTableRow) {
      return () => this.toggleRowSelection(row);
    },
    toggleRowSelection(row: BTableRow): void {
      if (row.isSelectable) {
        this.internalSelectedRows = Object.freeze(
          toggleBTableRow(row, this.internalSelectedRows as BTableRow[])
        );
        this.$emit(row.isSelected ? "unselect-row" : "select-row", row);
      }
    },
    selectAllRows(): void {
      this.internalSelectedRows = this.selectableRows;
    },
    unselectAllRows(): void {
      this.internalSelectedRows = [];
    },
    getDragListeners(row: BTableRow, index: number) {
      return {
        dragstart: (e: DragEvent) => this.$emit("dragstart", row, e, index),
        drop: (e: DragEvent) => this.$emit("dragstart", row, e, index),
        dragenter: (e: DragEvent) => this.$emit("dragenter", row, e, index),
        dragleave: (e: DragEvent) => this.$emit("leave", row, e, index)
      };
    },
    onNewSortType(sortType: SortType): void {
      this.internalSortType = sortType;
    },
    onNewSortColumn(column: BTableColumnData<any>): void {
      this.internalSortColumn = some(column);
    },
    hasCustomFooterSlot(): boolean {
      const footer = fromNullable(this.$slots.footer);
      if (fold<VNode[], number>(alwaysZero, nodes => nodes.length)(footer)) {
        return true;
      } else {
        return pipe(
          footer,
          chain(head),
          mapNullable<VNode, string>(node => node.tag),
          exists(tag => tag === "th" || tag === "td")
        );
      }
    },
    generateMobileSort(): VNode {
      return this.$createElement(BTableMobileSort, {
        props: {
          sortColumn: this.internalSortColumn,
          sortType: this.internalSortType,
          columns: this.newColumns,
          placeholder: this.mobileSortPlaceholder
        },
        on: {
          "new-sort-type": this.onNewSortType,
          "new-sort-column": this.onNewSortColumn
        }
      });
    },
    generateTableHeader(): VNode {
      return this.$createElement(BTableHeader, {
        class: this.headerClasses,
        props: {
          columns: this.visibleColumns,
          sortType: this.internalSortType,
          checkboxVariant: this.checkboxVariant,
          isCheckable: this.hasCheckableRows,
          isChecked: this.allRowsChecked
        },
        on: {
          toggle: this.toggleAllRows,
          "new-sort-type": this.onNewSortType,
          "new-sort-column": this.onNewSortColumn
        }
      });
    },
    generateEmptyTable(): VNode {
      return this.$createElement("tbody", [
        this.$createElement("tr", { staticClass: "is-empty" }, [
          this.$createElement(
            "td",
            { attrs: { colspan: this.numberOfVisibleColumns } },
            this.$slots.empty
          )
        ])
      ]);
    },
    generateRow(row: BTableRow, index: number): VNode {
      return this.$createElement(BTableRowElement, {
        key: row.id,
        props: {
          row,
          columns: this.visibleColumns,
          checkboxVariant: this.checkboxVariant
        },
        scopedSlots: this.$scopedSlots,
        attrs: {
          draggable: row.isDraggable
        },
        on: {
          input: this.getToggleRowCheck(row),
          // click: this.getToggleRowSelection(row),
          ...(row.isDraggable ? this.getDragListeners(row, index) : {})
        }
      });
    },
    generateNonEmptyTable(): VNode {
      if (this.$slots.row) {
        return this.$createElement(
          "tbody",
          this.newRows.map(row =>
            this.$createElement("tr", { key: row.id }, this.$slots.row)
          )
        );
      } else if (this.$scopedSlots.row) {
        return this.$createElement(
          "tbody",
          this.newRows.map((row, index) =>
            this.$createElement(
              "tr",
              { key: row.id },
              this.$scopedSlots.row!({
                row,
                index,
                columns: this.visibleColumns
              })
            )
          )
        );
      } else {
        return this.$createElement("tbody", this.newRows.map(this.generateRow));
      }
    },
    generateTableBody(): VNode {
      return this.isEmpty
        ? this.generateEmptyTable()
        : this.generateNonEmptyTable();
    },
    generateTableFooter(): VNode {
      return this.$createElement("tfoot", [
        this.$createElement(
          "tr",
          { staticClass: "table-footer" },
          this.hasCustomFooterSlot()
            ? this.$slots.footer
            : [
                this.$createElement(
                  "th",
                  { attrs: { colspan: this.numberOfVisibleColumns } },
                  this.$slots.footer
                )
              ]
        )
      ]);
    },
    generateTable(): VNode {
      const nodes = [this.generateTableHeader(), this.generateTableBody()];
      if (this.$slots.footer) {
        nodes.push(this.generateTableFooter());
      }
      return this.$createElement(
        BSimpleTable,
        {
          props: {
            tableClasses: this.tableClasses,
            isLoading: this.isLoading,
            isScrollable: this.isScrollable
          }
        },
        nodes
      );
    }
  },
  render(): VNode {
    return this.$createElement(
      "div",
      this.displayMobileSorting
        ? [this.generateMobileSort(), this.generateTable()]
        : [this.generateTable()]
    );
  }
});
