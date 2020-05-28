import './table.sass';
import { constant, constVoid, FunctionN } from 'fp-ts/lib/function';
import { Classes } from '../../utils/mergeClasses';
import BSimpleTable from './BSimpleTable';
import BTableRowElement from './BTableRow';
import BTableHeader from './BTableHeader';
import BTableMobileSort from './BTableMobileSort';
import { BTableColumn, BTableColumnData, BTableRow, BTableRowData, SortType } from './shared';
import { alwaysEmptyArray, alwaysZero, isBoolean, isMobile, toggleListItem } from '../../utils/helpers';
import { ColorVariant } from '../../types/ColorVariants';
import { isEmpty, isNonEmpty, sort } from 'fp-ts/lib/Array';
import { Eq, eq, eqString } from 'fp-ts/lib/Eq';
import { exists, fold, fromNullable, isNone, isSome, none, Option, some } from 'fp-ts/lib/Option';
import { Ord } from 'fp-ts/lib/Ord';
import { pipe } from 'fp-ts/lib/pipeable';
import { defineComponent, h, PropType, VNode } from 'vue';
import { SizeVariant } from '../../types/SizeVariants';

export const BTablePropsDefinition = {
  isBordered: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  isStriped: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  isNarrow: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  isFullwidth: {
    type: Boolean as PropType<boolean>,
    default: true
  },
  size: {
    type: String as PropType<SizeVariant>,
    default: '' as const
  },
  isHoverable: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  isLoading: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  isCheckable: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  isScrollable: {
    type: Boolean as PropType<boolean>,
    default: true
  },
  checkedRows: {
    type: Array as PropType<BTableRowData[]>,
    default: alwaysEmptyArray
  },
  isSelectable: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  selectedRows: {
    type: Array as PropType<BTableRowData[]>,
    default: alwaysEmptyArray
  },
  columns: {
    type: Array as PropType<BTableColumnData<any>[]>,
    required: true as const
  },
  rows: {
    type: Array as PropType<BTableRowData[]>,
    required: true as const
  },
  isDraggable: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  sortColumn: {
    type: Object as PropType<BTableColumnData>
  },
  sortType: {
    type: String as PropType<SortType>,
    default: 'Descending' as const
  },
  isFocusable: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  useMobileCards: {
    type: Boolean as PropType<boolean>,
    default: true
  },
  mobileSortPlaceholder: {
    type: String as PropType<string>
  },
  checkboxVariant: {
    type: String as PropType<ColorVariant>,
    default: 'is-primary' as const
  },
  headerClasses: {
    type: [String, Object, Array] as PropType<Classes>,
    default: undefined
  },
  canCheckAllRows: {
    type: Boolean as PropType<boolean>,
    default: true
  },
  dropEffect: {
    type: String as PropType<DropEffect>,
    default: 'move' as const
  },
  onCheckRow: {
    type: Function as PropType<FunctionN<[BTableRowData], void>>,
    default: constant(constVoid)
  },
  onUncheckRow: {
    type: Function as PropType<FunctionN<[BTableRowData], void>>,
    default: constant(constVoid)
  },
  onSelectRow: {
    type: Function as PropType<FunctionN<[BTableRowData], void>>,
    default: constant(constVoid)
  },
  onUnselectRow: {
    type: Function as PropType<FunctionN<[BTableRowData], void>>,
    default: constant(constVoid)
  },
  onRowClick: {
    type: Function as PropType<FunctionN<[BTableRowData], void>>,
    default: constant(constVoid)
  },
  onNewSortColumn: {
    type: Function as PropType<FunctionN<[BTableColumnData], void>>,
    default: constant(constVoid)
  },
  onNewSortType: {
    type: Function as PropType<FunctionN<[SortType], void>>,
    default: constant(constVoid)
  },
  onNewCheckedRows: {
    type: Function as PropType<FunctionN<[BTableRowData[]], void>>,
    default: constant(constVoid)
  },
  onNewSelectedRows: {
    type: Function as PropType<FunctionN<[BTableRowData[]], void>>,
    default: constant(constVoid)
  },
  onDragStart: {
    type: Function as PropType<OnDragEffect>,
    default: constant(constVoid)
  },
  onDragEnter: {
    type: Function as PropType<OnDragEffect>,
    default: constant(constVoid)
  },
  onDragOver: {
    type: Function as PropType<OnDragEffect>,
    default: constant(constVoid)
  },
  onDragLeave: {
    type: Function as PropType<OnDragEffect>,
    default: constant(constVoid)
  },
  onDragEnd: {
    type: Function as PropType<OnDragEffect>,
    default: constant(constVoid)
  },
  onDrop: {
    type: Function as PropType<OnDragEffect>,
    default: constant(constVoid)
  }
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

interface RowProps {
  isSelectable: boolean;
  isCheckable: boolean;
  isDraggable: boolean;
  selectedRows: BTableRowData[];
  checkedRows: BTableRowData[];
}

type DropEffect = 'none' | 'copy' | 'link' | 'move';

type DragHandler = FunctionN<[DragEvent], void>;

type OnDragEffect = FunctionN<[BTableRowData, DragEvent, number], void>;

const eqBTableRow: Eq<BTableRow> = eq.contramap(eqString, row => row.id);

const eqBTableRowData: Eq<BTableRowData> = eqBTableRow as Eq<BTableRowData>;

const toggleBTableRow = toggleListItem(eqBTableRow);

export const eqColumnTableData: Eq<BTableColumnData<any>> = eq.contramap(eqString, column => column.label);

function getBTableRow(rowProps: RowProps) {
  return (data: BTableRowData, index: number): BTableRow =>
    Object.freeze({
      ...data,
      index,
      isDroppable: data.isDroppable !== undefined ? data.isDroppable : rowProps.isDraggable,
      isDraggable: data.isDraggable !== undefined ? data.isDraggable : rowProps.isDraggable,
      isSelectable: data.isSelectable !== undefined ? data.isSelectable : rowProps.isSelectable,
      isCheckable: data.isCheckable !== undefined ? data.isCheckable : rowProps.isCheckable,
      isChecked: rowProps.checkedRows.some(row => eqBTableRowData.equals(row, data)),
      isSelected: rowProps.selectedRows.some(row => eqBTableRowData.equals(row, data))
    });
}

export default defineComponent({
  name: 'b-table',
  props: BTablePropsDefinition,
  data(): Data {
    const mapRow = getBTableRow({
      isCheckable: this.isCheckable,
      isSelectable: this.isSelectable,
      checkedRows: this.checkedRows,
      selectedRows: this.selectedRows,
      isDraggable: this.isDraggable
    });
    return {
      dragIsActive: false,
      dropTarget: none,
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
        this.onNewCheckedRows(val as BTableRow[]);
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
        this.onNewSelectedRows(val as BTableRow[]);
      }
    },
    internalSortType: {
      get(): SortType {
        return this.newSortType;
      },
      set(val: SortType): void {
        this.newSortType = val;
        this.onNewSortType(val);
      }
    },
    internalSortColumn: {
      get(): Option<BTableColumnData<any>> {
        return this.newSortColumn;
      },
      set(val: Option<BTableColumnData<any>>): void {
        this.newSortColumn = val;
        if (isSome(val)) {
          this.onNewSortColumn(val.value);
        }
      }
    },
    tableClasses(): Classes[] {
      return [
        {
          'is-bordered': this.isBordered,
          'is-striped': this.isStriped,
          'is-narrow': this.isNarrow,
          'is-fullwidth': this.isFullwidth,
          'is-hoverable': this.isHoverable,
          'has-mobile-cards': this.useMobileCards
        },
        this.size
      ];
    },
    newColumns(): readonly BTableColumn[] {
      return Object.freeze(
        this.columns.map((column: BTableColumnData<any>) => {
          return {
            ...column,
            position: column.position || 'is-centered',
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
      return this.checkableRows.every(row => row.isChecked) && this.checkableRows.length > 0;
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
    sortColumn(newVal: BTableColumnData<any> | undefined, oldVal: BTableColumnData<any> | undefined) {
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
      if (isSome(this.newSortColumn) && this.newSortColumn.value.ord !== undefined) {
        this.sortRows(this.newSortColumn.value.ord);
      }
    },
    sortRows(ord: Ord<BTableRow>) {
      this.newRows = Object.freeze(pipe(this.newRows as BTableRow[], sort(ord)));
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
      this.internalCheckedRows = this.checkableRows;
    },
    uncheckAllRows(): void {
      this.internalCheckedRows = [];
    },
    getToggleRowCheck(row: BTableRow) {
      return () => {
        this.toggleRowCheck(row);
      };
    },
    toggleRowCheck(row: BTableRow): void {
      if (row.isCheckable) {
        row.isChecked ? this.onUncheckRow(row) : this.onCheckRow(row);
        this.internalCheckedRows = Object.freeze(toggleBTableRow(row, this.internalCheckedRows as BTableRow[]));
      }
    },
    getRowOnClickHandler(row: BTableRow) {
      return (e: MouseEvent) => {
        if (this.hasCheckableRows) {
          return;
        } else if (row.isSelectable) {
          e.stopPropagation();
          this.internalSelectedRows = Object.freeze(toggleBTableRow(row, this.internalSelectedRows as BTableRow[]));
          this.onSelectRow(row);
        } else if (row.isSelected) {
          e.stopPropagation();
          this.internalSelectedRows = Object.freeze(toggleBTableRow(row, this.internalSelectedRows as BTableRow[]));
          this.onUnselectRow(row);
        } else {
          this.onRowClick(row);
        }
      };
    },
    getOnDragStartListener(row: BTableRow, index: number): DragHandler {
      return (e: DragEvent) => {
        this.dragIsActive = true;
        if (e.dataTransfer) {
          e.dataTransfer.setData('text/plain', String(index));
          e.dataTransfer.dropEffect = this.dropEffect;
        }
        this.dropTarget = some(row);
        this.onDragStart(row, e, index);
      };
    },
    getOnDropListener(row: BTableRow, index: number): DragHandler {
      return (e: DragEvent) => {
        if (row.isDroppable) {
          e.preventDefault();
          this.onDrop(row, e, index);
        }
        this.dragIsActive = false;
      };
    },
    getOnDragEnterListener(row: BTableRow, index: number): DragHandler {
      return (e: DragEvent) => {
        if (row.isDroppable) {
          e.preventDefault();
          this.dropTarget = some(row);
          this.onDragEnter(row, e, index);
        }
      };
    },
    getOnDragOverListener(row: BTableRow, index: number): DragHandler {
      return (e: DragEvent) => {
        if (row.isDroppable) {
          e.preventDefault();
          if (isNone(this.dropTarget) || (isSome(this.dropTarget) && !eqBTableRow.equals(this.dropTarget.value, row))) {
            this.dropTarget = some(row);
          }
          this.onDragOver(row, e, index);
        }
      };
    },
    getOnDragLeaveListener(row: BTableRow, index: number): DragHandler {
      return (e: DragEvent) => {
        if (row.isDroppable) {
          e.preventDefault();
          if (isSome(this.dropTarget) && eqBTableRow.equals(this.dropTarget.value, row)) {
            this.dropTarget = none;
          }
          this.onDragLeave(row, e, index);
        }
      };
    },
    getOnDragEndListener(row: BTableRow, index: number): DragHandler {
      return e => {
        this.onDragEnd(row, e, index);
        if (isSome(this.dropTarget)) {
          this.dropTarget = none;
        }
        if (this.dragIsActive) {
          this.dragIsActive = false;
        }
      };
    },
    getDragListeners(row: BTableRow, index: number): { [key: string]: Function | Function[] } {
      if (row.isDraggable) {
        return {
          onDragstart: this.getOnDragStartListener(row, index),
          onDrop: this.getOnDropListener(row, index),
          onDragenter: this.getOnDragEnterListener(row, index),
          onDragleave: this.getOnDragLeaveListener(row, index),
          onDragover: this.getOnDragOverListener(row, index),
          onDragend: this.getOnDragEndListener(row, index)
        };
      } else {
        return {};
      }
    },
    internalOnNewSortType(sortType: SortType): void {
      this.internalSortType = sortType;
    },
    internalOnNewSortColumn(column: BTableColumnData<any>): void {
      this.internalSortColumn = some(column);
    },
    hasCustomFooterSlot(): boolean {
      const footer = fromNullable(this.$slots.footer && this.$slots.footer());
      if (fold<VNode[], number>(alwaysZero, nodes => nodes.length)(footer)) {
        return true;
      } else {
        return false;
      }
    },
    generateMobileSort(): VNode {
      return h(BTableMobileSort, {
        sortColumn: this.internalSortColumn as any,
        sortType: this.internalSortType,
        columns: this.newColumns as BTableColumn[],
        placeholder: this.mobileSortPlaceholder,
        onNewSortType: this.internalOnNewSortType,
        onNewSortColumn: this.internalOnNewSortColumn
      });
    },
    generateTableHeader(): VNode {
      return h(BTableHeader, {
        class: this.headerClasses,
        columns: this.visibleColumns as BTableColumn[],
        sortType: this.internalSortType,
        checkboxVariant: this.checkboxVariant,
        isCheckable: this.hasCheckableRows,
        isChecked: this.allRowsChecked,
        isDisabled: !this.canCheckAllRows,
        slots: this.$slots,
        onInput: this.toggleAllRows,
        onNewSortType: this.internalOnNewSortType,
        onNewSortColumn: this.internalOnNewSortColumn
      });
    },
    generateEmptyTable(): VNode {
      return h('tbody', [
        h('tr', { class: 'is-empty' }, [
          h('td', { colspan: this.numberOfVisibleColumns }, this.$slots.empty && this.$slots.empty())
        ])
      ]);
    },
    generateRow(row: BTableRow, index: number): VNode {
      return h(BTableRowElement, {
        key: row.id,
        class: {
          'is-drop-target': isSome(this.dropTarget) ? eqBTableRow.equals(row, this.dropTarget.value) : false,
          'is-undroppable': this.dragIsActive && !row.isDroppable
        },
        row,
        columns: this.visibleColumns as BTableColumn[],
        checkboxVariant: this.checkboxVariant,
        isDraggable: row.isDraggable,
        slots: this.$slots,
        onInput: this.getToggleRowCheck(row),
        onClick: this.getRowOnClickHandler(row),
        ...this.getDragListeners(row, index)
      });
    },
    generateNonEmptyTable(): VNode {
      if (this.$slots.row) {
        return h(
          'tbody',
          this.newRows.map((row, index) =>
            h(
              'tr',
              { key: row.id },
              this.$slots.row!({
                row,
                index,
                columns: this.visibleColumns
              })
            )
          )
        );
      } else {
        return h('tbody', this.newRows.map(this.generateRow));
      }
    },
    generateTableBody(): VNode {
      return this.isEmpty ? this.generateEmptyTable() : this.generateNonEmptyTable();
    },
    generateTableFooter(): VNode {
      return h('tfoot', [
        h(
          'tr',
          { class: 'table-footer' },
          this.hasCustomFooterSlot()
            ? this.$slots.footer
            : [h('th', { colspan: this.numberOfVisibleColumns }, this.$slots.footer!())]
        )
      ]);
    },
    generateTable(): VNode {
      const nodes = [this.generateTableHeader(), this.generateTableBody()];
      if (this.$slots.footer) {
        nodes.push(this.generateTableFooter());
      }
      return h(
        BSimpleTable,
        {
          tableClasses: this.tableClasses,
          isLoading: this.isLoading,
          isScrollable: this.isScrollable
        },
        nodes
      );
    }
  },
  render(): VNode {
    return h(
      'div',
      this.displayMobileSorting ? [this.generateMobileSort(), this.generateTable()] : [this.generateTable()]
    );
  }
});
