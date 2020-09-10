import { ExtractPropTypes, toRef, computed } from 'vue';
import { constant, constVoid, FunctionN } from 'fp-ts/lib/function';
import { PropType } from 'vue';
import { useProxy } from '../../../composables/proxy/useProxy';
import { constEmptyArray } from '../../../utils/helpers';
import { BTableRow, BTableRowData } from '../shared';

export const BTableSelectablePropsDefinition = {
	isSelectable: {
		type: Boolean as PropType<boolean>,
		default: false
	},
	selectedRows: {
		type: Array as PropType<BTableRowData[]>,
		default: constEmptyArray
	},
	'onUpdate:selectedRows': {
		type: Function as PropType<FunctionN<[BTableRowData[]], void>>,
		default: constant(constVoid)
	},
	onSelectRow: {
		type: Function as PropType<FunctionN<[BTableRowData], void>>,
		default: constant(constVoid)
	},
	onUnselectRow: {
		type: Function as PropType<FunctionN<[BTableRowData], void>>,
		default: constant(constVoid)
	}
};

export interface BTableSelectableProps extends ExtractPropTypes<typeof BTableSelectablePropsDefinition> {}

export function useSelectableTable(props: BTableSelectableProps) {
	const { value: selectedRows } = useProxy<BTableRowData[]>(
		computed(() => (props.isSelectable ? props.selectedRows : [])),
		toRef(props, 'onUpdate:selectedRows')
	);

	const selectedRowIds = computed(() => new Set(selectedRows.value.map(row => row.id)));

	function toggleRowSelection(row: BTableRow) {
		console.log('toggle-row', row)
		if (row.isSelectable) {
			const ids = selectedRowIds.value;
			ids.has(row.id) ? props.onUnselectRow(row) : props.onSelectRow(row)
			// selectedRows.value = toggleBTableRow(row, selectedRows.value as BTableRow[])
		}
	}

	function getToggleRowSelection(row: BTableRow) {
		return () => toggleRowSelection(row);
	}

	return {
		selectedRowIds,
		getToggleRowSelection,
		toggleRowSelection
	};
}

export type UseSelectableTable = ReturnType<typeof useSelectableTable>;
