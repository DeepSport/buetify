import './table.sass';
import { constant, constVoid } from 'fp-ts/lib/function';
import BSimpleTable from './BSimpleTable';
import BTableRowElement from './BTableRow';
import BTableHeader from './BTableHeader';
import BTableMobileSort from './BTableMobileSort';
import { alwaysEmptyArray, alwaysZero, isBoolean, isMobile, toggleListItem } from '../../utils/helpers';
import { isEmpty, isNonEmpty, sort } from 'fp-ts/lib/Array';
import { eq, eqString } from 'fp-ts/lib/Eq';
import { exists, fold, fromNullable, isNone, isSome, none, some } from 'fp-ts/lib/Option';
import { pipe } from 'fp-ts/lib/pipeable';
import { defineComponent, h } from 'vue';
export const BTablePropsDefinition = {
    isBordered: {
        type: Boolean,
        default: false
    },
    isStriped: {
        type: Boolean,
        default: false
    },
    isNarrow: {
        type: Boolean,
        default: false
    },
    isFullwidth: {
        type: Boolean,
        default: true
    },
    size: {
        type: String,
        default: ''
    },
    isHoverable: {
        type: Boolean,
        default: false
    },
    isLoading: {
        type: Boolean,
        default: false
    },
    isCheckable: {
        type: Boolean,
        default: false
    },
    isScrollable: {
        type: Boolean,
        default: true
    },
    checkedRows: {
        type: Array,
        default: alwaysEmptyArray
    },
    isSelectable: {
        type: Boolean,
        default: false
    },
    selectedRows: {
        type: Array,
        default: alwaysEmptyArray
    },
    columns: {
        type: Array,
        required: true
    },
    rows: {
        type: Array,
        required: true
    },
    isDraggable: {
        type: Boolean,
        default: false
    },
    sortColumn: {
        type: Object
    },
    sortType: {
        type: String,
        default: 'Descending'
    },
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
        type: String,
        default: 'is-primary'
    },
    headerClasses: {
        type: [String, Object, Array],
        default: undefined
    },
    canCheckAllRows: {
        type: Boolean,
        default: true
    },
    dropEffect: {
        type: String,
        default: 'move'
    },
    onCheckRow: {
        type: Function,
        default: constant(constVoid)
    },
    onUncheckRow: {
        type: Function,
        default: constant(constVoid)
    },
    onSelectRow: {
        type: Function,
        default: constant(constVoid)
    },
    onUnselectRow: {
        type: Function,
        default: constant(constVoid)
    },
    onRowClick: {
        type: Function,
        default: constant(constVoid)
    },
    onNewSortColumn: {
        type: Function,
        default: constant(constVoid)
    },
    onNewSortType: {
        type: Function,
        default: constant(constVoid)
    },
    onNewCheckedRows: {
        type: Function,
        default: constant(constVoid)
    },
    onNewSelectedRows: {
        type: Function,
        default: constant(constVoid)
    },
    onDragStart: {
        type: Function,
        default: constant(constVoid)
    },
    onDragEnter: {
        type: Function,
        default: constant(constVoid)
    },
    onDragOver: {
        type: Function,
        default: constant(constVoid)
    },
    onDragLeave: {
        type: Function,
        default: constant(constVoid)
    },
    onDragEnd: {
        type: Function,
        default: constant(constVoid)
    },
    onDrop: {
        type: Function,
        default: constant(constVoid)
    }
};
const eqBTableRow = eq.contramap(eqString, row => row.id);
const eqBTableRowData = eqBTableRow;
const toggleBTableRow = toggleListItem(eqBTableRow);
export const eqColumnTableData = eq.contramap(eqString, column => column.label);
function getBTableRow(rowProps) {
    return (data, index) => Object.freeze(Object.assign(Object.assign({}, data), { index, isDroppable: data.isDroppable !== undefined ? data.isDroppable : rowProps.isDraggable, isDraggable: data.isDraggable !== undefined ? data.isDraggable : rowProps.isDraggable, isSelectable: data.isSelectable !== undefined ? data.isSelectable : rowProps.isSelectable, isCheckable: data.isCheckable !== undefined ? data.isCheckable : rowProps.isCheckable, isChecked: rowProps.checkedRows.some(row => eqBTableRowData.equals(row, data)), isSelected: rowProps.selectedRows.some(row => eqBTableRowData.equals(row, data)) }));
}
export default defineComponent({
    name: 'b-table',
    props: BTablePropsDefinition,
    data() {
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
            get() {
                return this.newCheckedRows;
            },
            set(val) {
                this.newCheckedRows = val;
                this.newRows = Object.freeze(this.newRows.map(getBTableRow({
                    isCheckable: this.isCheckable,
                    isSelectable: this.isSelectable,
                    checkedRows: val,
                    selectedRows: this.internalSelectedRows,
                    isDraggable: this.isDraggable
                })));
                this.onNewCheckedRows(val);
            }
        },
        internalSelectedRows: {
            get() {
                return this.newSelectedRows;
            },
            set(val) {
                this.newSelectedRows = val;
                this.newRows = Object.freeze(this.newRows.map(getBTableRow({
                    isCheckable: this.isCheckable,
                    isSelectable: this.isSelectable,
                    checkedRows: this.internalCheckedRows,
                    selectedRows: val,
                    isDraggable: this.isDraggable
                })));
                this.onNewSelectedRows(val);
            }
        },
        internalSortType: {
            get() {
                return this.newSortType;
            },
            set(val) {
                this.newSortType = val;
                this.onNewSortType(val);
            }
        },
        internalSortColumn: {
            get() {
                return this.newSortColumn;
            },
            set(val) {
                this.newSortColumn = val;
                if (isSome(val)) {
                    this.onNewSortColumn(val.value);
                }
            }
        },
        tableClasses() {
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
        newColumns() {
            return Object.freeze(this.columns.map((column) => {
                return Object.assign(Object.assign({}, column), { position: column.position || 'is-centered', isVisible: isBoolean(column.isVisible) ? column.isVisible : true, isSortColumn: this.isCurrentSortColumn(column), isSortable: !!column.isSortable || !!column.ord });
            }));
        },
        allRowsUncheckable() {
            return this.newRows.every(row => !row.isCheckable);
        },
        allRowsChecked() {
            return this.checkableRows.every(row => row.isChecked) && this.checkableRows.length > 0;
        },
        hasCheckableRows() {
            return this.isCheckable && isNonEmpty(this.checkableRows);
        },
        checkableRows() {
            return Object.freeze(this.newRows.filter(row => row.isCheckable));
        },
        allRowsUnchecked() {
            return this.newRows.every(row => !row.isChecked);
        },
        selectableRows() {
            return Object.freeze(this.newRows.filter(r => r.isSelectable));
        },
        hasSortableColumns() {
            return this.newColumns.some(column => column.isSortable);
        },
        displayMobileSorting() {
            return this.useMobileCards && this.hasSortableColumns && !!isMobile.any();
        },
        isEmpty() {
            return isEmpty(this.newRows);
        },
        numberOfVisibleColumns() {
            return this.visibleColumns.length;
        },
        visibleColumns() {
            return Object.freeze(this.newColumns.filter(column => column.isVisible));
        }
    },
    watch: {
        rows() {
            const mapRow = getBTableRow({
                isCheckable: this.isCheckable,
                isSelectable: this.isSelectable,
                checkedRows: this.internalCheckedRows,
                selectedRows: this.internalSelectedRows,
                isDraggable: this.isDraggable
            });
            this.newRows = Object.freeze(this.rows.map(mapRow));
            this.checkSort();
        },
        sortColumn(newVal, oldVal) {
            if (newVal !== oldVal) {
                this.newSortColumn = fromNullable(this.sortColumn);
            }
        },
        sortType(newVal, oldVal) {
            if (newVal !== oldVal) {
                this.newSortType = newVal;
            }
        },
        checkedRows() {
            const mapRow = getBTableRow({
                isCheckable: this.isCheckable,
                isSelectable: this.isSelectable,
                checkedRows: this.checkedRows,
                selectedRows: this.internalSelectedRows,
                isDraggable: this.isDraggable
            });
            this.newCheckedRows = Object.freeze(this.checkedRows.map(mapRow));
            this.newRows = Object.freeze(this.newRows.map(mapRow));
        },
        selectedRows() {
            const mapRow = getBTableRow({
                isCheckable: this.isCheckable,
                isSelectable: this.isSelectable,
                checkedRows: this.internalCheckedRows,
                selectedRows: this.selectedRows,
                isDraggable: this.isDraggable
            });
            this.newSelectedRows = Object.freeze(this.selectedRows.map(mapRow));
            this.newRows = Object.freeze(this.newRows.map(mapRow));
        }
    },
    methods: {
        checkSort() {
            if (isSome(this.newSortColumn) && this.newSortColumn.value.ord !== undefined) {
                this.sortRows(this.newSortColumn.value.ord);
            }
        },
        sortRows(ord) {
            this.newRows = Object.freeze(pipe(this.newRows, sort(ord)));
        },
        isCurrentSortColumn(column) {
            return pipe(this.newSortColumn, exists(sortColumn => eqColumnTableData.equals(column, sortColumn)));
        },
        toggleAllRows() {
            this.allRowsChecked ? this.uncheckAllRows() : this.checkAllRows();
        },
        checkAllRows() {
            this.internalCheckedRows = this.checkableRows;
        },
        uncheckAllRows() {
            this.internalCheckedRows = [];
        },
        getToggleRowCheck(row) {
            return () => {
                this.toggleRowCheck(row);
            };
        },
        toggleRowCheck(row) {
            if (row.isCheckable) {
                row.isChecked ? this.onUncheckRow(row) : this.onCheckRow(row);
                this.internalCheckedRows = Object.freeze(toggleBTableRow(row, this.internalCheckedRows));
            }
        },
        getRowOnClickHandler(row) {
            return (e) => {
                if (this.hasCheckableRows) {
                    return;
                }
                else if (row.isSelectable) {
                    e.stopPropagation();
                    this.internalSelectedRows = Object.freeze(toggleBTableRow(row, this.internalSelectedRows));
                    this.onSelectRow(row);
                }
                else if (row.isSelected) {
                    e.stopPropagation();
                    this.internalSelectedRows = Object.freeze(toggleBTableRow(row, this.internalSelectedRows));
                    this.onUnselectRow(row);
                }
                else {
                    this.onRowClick(row);
                }
            };
        },
        getOnDragStartListener(row, index) {
            return (e) => {
                this.dragIsActive = true;
                if (e.dataTransfer) {
                    e.dataTransfer.setData('text/plain', String(index));
                    e.dataTransfer.dropEffect = this.dropEffect;
                }
                this.dropTarget = some(row);
                this.onDragStart(row, e, index);
            };
        },
        getOnDropListener(row, index) {
            return (e) => {
                if (row.isDroppable) {
                    e.preventDefault();
                    this.onDrop(row, e, index);
                }
                this.dragIsActive = false;
            };
        },
        getOnDragEnterListener(row, index) {
            return (e) => {
                if (row.isDroppable) {
                    e.preventDefault();
                    this.dropTarget = some(row);
                    this.onDragEnter(row, e, index);
                }
            };
        },
        getOnDragOverListener(row, index) {
            return (e) => {
                if (row.isDroppable) {
                    e.preventDefault();
                    if (isNone(this.dropTarget) || (isSome(this.dropTarget) && !eqBTableRow.equals(this.dropTarget.value, row))) {
                        this.dropTarget = some(row);
                    }
                    this.onDragOver(row, e, index);
                }
            };
        },
        getOnDragLeaveListener(row, index) {
            return (e) => {
                if (row.isDroppable) {
                    e.preventDefault();
                    if (isSome(this.dropTarget) && eqBTableRow.equals(this.dropTarget.value, row)) {
                        this.dropTarget = none;
                    }
                    this.onDragLeave(row, e, index);
                }
            };
        },
        getOnDragEndListener(row, index) {
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
        getDragListeners(row, index) {
            if (row.isDraggable) {
                return {
                    onDragstart: this.getOnDragStartListener(row, index),
                    onDrop: this.getOnDropListener(row, index),
                    onDragenter: this.getOnDragEnterListener(row, index),
                    onDragleave: this.getOnDragLeaveListener(row, index),
                    onDragover: this.getOnDragOverListener(row, index),
                    onDragend: this.getOnDragEndListener(row, index)
                };
            }
            else {
                return {};
            }
        },
        internalOnNewSortType(sortType) {
            this.internalSortType = sortType;
        },
        internalOnNewSortColumn(column) {
            this.internalSortColumn = some(column);
        },
        hasCustomFooterSlot() {
            const footer = fromNullable(this.$slots.footer && this.$slots.footer());
            if (fold(alwaysZero, nodes => nodes.length)(footer)) {
                return true;
            }
            else {
                return false;
            }
        },
        generateMobileSort() {
            return h(BTableMobileSort, {
                sortColumn: this.internalSortColumn,
                sortType: this.internalSortType,
                columns: this.newColumns,
                placeholder: this.mobileSortPlaceholder,
                onNewSortType: this.internalOnNewSortType,
                onNewSortColumn: this.internalOnNewSortColumn
            });
        },
        generateTableHeader() {
            return h(BTableHeader, {
                class: this.headerClasses,
                columns: this.visibleColumns,
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
        generateEmptyTable() {
            return h('tbody', [
                h('tr', { class: 'is-empty' }, [
                    h('td', { colspan: this.numberOfVisibleColumns }, this.$slots.empty && this.$slots.empty())
                ])
            ]);
        },
        generateRow(row, index) {
            return h(BTableRowElement, Object.assign({ key: row.id, class: {
                    'is-drop-target': isSome(this.dropTarget) ? eqBTableRow.equals(row, this.dropTarget.value) : false,
                    'is-undroppable': this.dragIsActive && !row.isDroppable
                }, row, columns: this.visibleColumns, checkboxVariant: this.checkboxVariant, isDraggable: row.isDraggable, slots: this.$slots, onInput: this.getToggleRowCheck(row), onClick: this.getRowOnClickHandler(row) }, this.getDragListeners(row, index)));
        },
        generateNonEmptyTable() {
            if (this.$slots.row) {
                return h('tbody', this.newRows.map((row, index) => h('tr', { key: row.id }, this.$slots.row({
                    row,
                    index,
                    columns: this.visibleColumns
                }))));
            }
            else {
                return h('tbody', this.newRows.map(this.generateRow));
            }
        },
        generateTableBody() {
            return this.isEmpty ? this.generateEmptyTable() : this.generateNonEmptyTable();
        },
        generateTableFooter() {
            return h('tfoot', [
                h('tr', { class: 'table-footer' }, this.hasCustomFooterSlot()
                    ? this.$slots.footer
                    : [h('th', { colspan: this.numberOfVisibleColumns }, this.$slots.footer())])
            ]);
        },
        generateTable() {
            const nodes = [this.generateTableHeader(), this.generateTableBody()];
            if (this.$slots.footer) {
                nodes.push(this.generateTableFooter());
            }
            return h(BSimpleTable, {
                tableClasses: this.tableClasses,
                isLoading: this.isLoading,
                isScrollable: this.isScrollable
            }, nodes);
        }
    },
    render() {
        return h('div', this.displayMobileSorting ? [this.generateMobileSort(), this.generateTable()] : [this.generateTable()]);
    }
});
//# sourceMappingURL=BTable.js.map