import { FunctionN } from 'fp-ts/lib/function';
import { IO } from 'fp-ts/lib/IO';
import { ColorVariant } from '../../types/ColorVariants';
import { BCheckbox } from '../form/checkbox/BCheckbox';
import { getObjectValueByPath, isString } from '../../utils/helpers';
import { BTableColumn, BTableRow } from './shared';
import { h, VNode, defineComponent, computed, PropType } from 'vue';

export default defineComponent({
	name: 'b-table-row',
	props: {
		columns: {
			type: Array as PropType<BTableColumn[]>,
			required: true
		},
		row: {
			type: Object as PropType<BTableRow>,
			required: true
		},
		checkboxVariant: {
			type: String as PropType<ColorVariant>,
			default: 'is-primary' as ColorVariant
		},
		isChecked: {
			type: Boolean as PropType<boolean>,
			default: false
		},
		'onUpdate:isChecked': {
			type: Function as PropType<FunctionN<[boolean], void>>,
			required: false
		},
		isSelected: {
			type: Boolean as PropType<boolean>,
			default: false
		},
		'onUpdate:isSelected': {
			type: Function as PropType<FunctionN<[boolean], void> | IO<void>>,
			required: false
		},
		onRowClick: {
			type: Function as PropType<FunctionN<[BTableRow, MouseEvent], void>>,
			required: false
		}
	},
	setup(props, { slots }) {
		const classes = computed(() => {
			return [
				{
					'is-selected': props.isSelected,
					'is-checked': props.isChecked,
					'is-draggable': props.row.isDraggable,
					'is-droppable': props.row.isDroppable
				},
				props.row.classes
			]
		});

		return () => {
			const columns: VNode[] = props.columns.map((column: BTableColumn) => {
				const children = [];
				const value = isString(column.value)
					? getObjectValueByPath(props.row.data, column.value)
					: column.value(props.row);
				const slotName = column.slotName || column.label;
				const columnSlot = slots[slotName];

				if (columnSlot) {
					children.push(columnSlot({ row: props.row, column, value }));
				} else {
					children.push(value == null ? value : String(value));
				}

				const textClass =
					column.position === 'is-left'
						? 'has-text-left'
						: column.position === 'is-centered'
						? 'has-text-centered'
						: 'has-text-right';

				return h(
					'td',
					{
						class: [textClass, { 'is-sticky-left': column.isSticky }],
						'data-label': column.label
					},
					children
				);
			});

			if (props.row.isCheckable) {
				columns.unshift(
					h('td', { class: 'checkbox-cell' }, [
						h(BCheckbox, {
							modelValue: props.isChecked,
							variant: props.checkboxVariant,
							'onUpdate:modelValue': props['onUpdate:isChecked']
						})
					])
				);
			}

			return h(
				'tr',
				{
					class: classes.value,
					onClick: (e: MouseEvent) => {
						if (props.onRowClick) {
							props.onRowClick(props.row, e);
						}
						if (props.row.isSelectable && props['onUpdate:isSelected']) {
							e.stopPropagation();
							props['onUpdate:isSelected'](!props.isSelected);
						}
					},
					draggable: props.row.isDraggable
				},
				columns
			);
		};
	}
});
