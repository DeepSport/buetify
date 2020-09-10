import { FunctionN } from 'fp-ts/lib/function';
import { SetupContext, h } from 'vue';
import VerticalExpansionIcon from '../icons/verticalExpansion/VerticalExpansionIcon';
import BTooltip from '../tooltip/BTooltip';
import { isString } from '../../utils/helpers';
import { BTableColumn, SortType } from './shared';

export interface BTableColumnProps {
	column: BTableColumn;
	sortType: SortType;
	'onUpdate:sortType': FunctionN<[SortType], void>;
	'onUpdate:sortColumn': FunctionN<[BTableColumn], void>;
}

function formatWidth(width: string | number, suffix: 'rem' | 'em' | 'px' = 'px'): string {
	return isString(width) ? width : `${width}${suffix}`;
}

function getNewSortTypeListener(props: BTableColumnProps): FunctionN<[MouseEvent], void> {
	return (e: MouseEvent) => {
		e.stopPropagation();
		props['onUpdate:sortType'](props.sortType === 'Ascending' ? 'Descending' : 'Ascending');
	};
}

function getColumnListener(props: BTableColumnProps): FunctionN<[MouseEvent], void> {
	return props.column.isSortColumn ? getNewSortTypeListener(props) : () => props['onUpdate:sortColumn'](props.column);
}

export default function BTableColumn(props: BTableColumnProps, { slots }: SetupContext) {
	const slot = slots[`header.${props.column.label}`] || slots.header;
	const children = [];
	if (slot) {
		children.push(slot(props.column));
	} else {
		children.push(
			isString(props.column.detail)
				? h(BTooltip, { label: props.column.detail, position: 'is-left' }, () => props.column.label)
				: props.column.label
		);
	}
	if (props.column.isSortColumn) {
		children.push(h(VerticalExpansionIcon, { isExpanded: props.sortType === 'Ascending' }));
	}
	return h(
		'th',
		{
			class: {
				'is-sortable': props.column.isSortable,
				'is-sticky-left': !!props.column.isSticky
			},
			onClick: props.column.isSortable ? getColumnListener(props) : undefined,
			style: props.column.width !== undefined ? { 'min-width': formatWidth(props.column.width) } : undefined
		},
		[
			h(
				'div',
				{
					class: ['th-wrap', props.column.position]
				},
				children
			)
		]
	);
}
