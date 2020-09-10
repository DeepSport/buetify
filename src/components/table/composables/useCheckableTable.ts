import { ExtractPropTypes, toRef, computed, Ref } from 'vue';
import { constant, constVoid, FunctionN } from 'fp-ts/lib/function';
import { PropType } from 'vue';
import { useProxy } from '../../../composables/proxy/useProxy';
import { ColorVariant } from '../../../types/ColorVariants';
import { constEmptyArray } from '../../../utils/helpers';
import { BTableRow, BTableRowData, toggleBTableRow } from '../shared';

export const BTableCheckPropsDefinition = {
	isCheckable: {
		type: Boolean as PropType<boolean>,
		default: false
	},
	checkedRows: {
		type: Array as PropType<BTableRowData[]>,
		default: constEmptyArray()
	},
	'onUpdate:checkedRows': {
		type: Function as PropType<FunctionN<[BTableRowData[]], void>>,
		default: constant(constVoid)
	},
	checkboxVariant: {
		type: String as PropType<ColorVariant>,
		default: 'is-primary' as const
	},
	canCheckAllRows: {
		type: Boolean as PropType<boolean>,
		default: true
	},
	onCheckRow: {
		type: Function as PropType<FunctionN<[BTableRowData], void>>,
		default: constant(constVoid)
	},
	onUncheckRow: {
		type: Function as PropType<FunctionN<[BTableRowData], void>>,
		default: constant(constVoid)
	}
};

export interface BTableCheckProps extends ExtractPropTypes<typeof BTableCheckPropsDefinition> {}

export function useCheckableTable(props: BTableCheckProps, rows: Ref<BTableRow[]>) {
	const checkableRows = computed(() => (props.isCheckable ? rows.value.filter(row => row.isCheckable) : []));
	const { value: checkedRows } = useProxy<BTableRowData[]>(
		computed(() => (props.isCheckable ? props.checkedRows : [])),
		toRef(props, 'onUpdate:checkedRows')
	);

	const checkedRowIds = computed(() => new Set(checkedRows.value.map(row => row.id)));

	const allRowsChecked = computed(() => {
		const ids = checkedRowIds.value;
		return checkableRows.value.length > 0 && checkableRows.value.every(row => ids.has(row.id));
	});

	const allRowsUncheckable = computed(() => rows.value.every(row => !row.isCheckable));

	function checkAllRows() {
		checkedRows.value = checkableRows.value;
	}

	function toggleRowCheck(row: BTableRow) {
		if (row.isCheckable) {
			const ids = checkedRowIds.value;
			ids.has(row.id) ? props.onCheckRow(row) : props.onUncheckRow(row);
			checkedRows.value = toggleBTableRow(row, checkedRows.value as BTableRow[]);
		}
	}

	function getToggleRowCheck(row: BTableRow) {
		return () => toggleRowCheck(row);
	}

	function uncheckAllRows() {
		checkedRows.value = [];
	}

	function toggleAllRows() {
		allRowsChecked.value ? uncheckAllRows() : checkAllRows();
	}

	const hasCheckableRows = computed(() => checkableRows.value.length > 0);

	return {
		checkedRowIds,
		toggleAllRows,
		checkAllRows,
		uncheckAllRows,
		allRowsChecked,
		getToggleRowCheck,
		allRowsUncheckable,
		hasCheckableRows,
		allRowsUnchecked: computed(() => hasCheckableRows.value && checkedRowIds.value.size === 0)
	};
}

export type UseCheckableTable = ReturnType<typeof useCheckableTable>;
