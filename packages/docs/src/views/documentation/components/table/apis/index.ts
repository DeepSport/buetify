import { ComponentApiDescription } from '../../../../../components/apiView';

export const apis: ComponentApiDescription[] = [
	{
		title: 'Table',
		props: [
			{
				name: '<code>rows</code>',
				description: 'Table rows',
				type: 'Array<object>',
				values: '—',
				default: '—',
				required: 'true'
			},
			{
				name: '<code>columns</code>',
				description: 'Table columns',
				type: 'Array<Object> (same as BTableColumn). See type definition in source code for more information',
				values: '—',
				default: '—',
				required: 'true'
			},
			{
				name: '<code>sort-by</code>',
				description: `Column to sortBy, or array of columns to sortBy`,
				type: '[Array, Object]',
				values: '—',
				default: '',
				required: 'false'
			},
			{
				name: '<code>sort-type</code>',
				description: `Sets the default sort direction on the first click.`,
				type: 'String',
				values: '<code>Ascending</code>, <code>Descending</code>',
				default: '<code>Ascending</code>',
				required: 'false'
			},
			{
				name: '<code>is-loading</code>',
				description: 'show loading overlay',
				type: 'Boolean',
				values: '—',
				default: '<code>false</code>',
				required: 'false'
			},
			{
				name: '<code>is-bordered</code>',
				description: 'Border to all cells',
				type: 'Boolean',
				values: '—',
				default: '<code>false</code>',
				required: 'false'
			},
			{
				name: '<code>is-striped</code>',
				description: 'Whether table is striped',
				type: 'Boolean',
				values: '—',
				default: '<code>false</code>',
				required: 'false'
			},
			{
				name: '<code>is-narrow</code>',
				description: 'Makes the cells narrower',
				type: 'Boolean',
				values: '—',
				default: '<code>false</code>',
				required: 'false'
			},
			{
				name: '<code>selected-rows</code>',
				description:
					'Set which row(s) is selected, use the <code>v-model</code> modifier to make it two-way binding',
				type: 'Array<Row>',
				values: '—',
				default: '—',
				required: 'false'
			},
			{
				name: '<code>is-hoverable</code>',
				description: 'Rows are highlighted when hovering',
				type: 'Boolean',
				values: '—',
				default: '<code>true</code> if <code>is-selectable</code> prop is activated, false otherwise',
				required: 'false'
			},
			{
				name: '<code>is-checkable</code>',
				description:
					'Rows can be checked (multiple), checked rows will have a <code>.is-checked</code> class if you want to style',
				type: 'Boolean',
				values: '—',
				default: '<code>false</code>',
				required: 'false'
			},
			{
				name: '<code>checked-rows</code>',
				description:
					'Set which rows are checked, use the <code>v-model</code> modifier to make it two-way binding',
				type: 'Array<Object>',
				values: '—',
				default: '—',
				required: 'false'
			},
			{
				name: '<code>can-check-all-rows</code>',
				description: 'Show check/uncheck all checkbox in table header when <code>is-checkable</code>',
				type: 'Boolean',
				values: '—',
				default: '<code>true</code>',
				required: 'false'
			},
			{
				name: '<code>use-mobile-cards</code>',
				description: 'Rows appears as cards on mobile (collapse rows)',
				type: 'Boolean',
				values: '—',
				default: '<code>true</code>',
				required: 'false'
			},
			{
				name: '<code>pagination</code>',
				description:
					'Adds pagination to the table, uses default <code>BPagination</code> values if set to true, can override by proving object here',
				type: '[Boolean, Object]',
				values: '—',
				default: '<code>false</code>',
				required: 'false'
			},
			{
				name: '<code>mobile-sort-placeholder</code>',
				description: 'Text when nothing is selected',
				type: 'String',
				values: '—',
				default: '—',
				required: 'false'
			},
			{
				name: '<code>is-draggable</code>',
				description: 'Allows rows to be draggable',
				type: 'Boolean',
				values: '—',
				default: '<code>false</code>',
				required: 'false'
			},
			{
				name: '<code>is-scrollable</code>',
				description: 'Add a horizontal scrollbar when table is too wide',
				type: 'Boolean',
				values: '—',
				default: '<code>true</code>',
				required: 'false'
			}
		],
		slots: [
			{
				name: 'default',
				description: '<strong>Optional</strong>, table body and header',
				props:
					'<code>row: Object</code>, <code>column: Vue Object</code>, <code>index: Number</code>, <code>colindex: Number</code>,'
			},
			{
				name: '<code>header</code>',
				description: 'Table custom header',
				props: '<code>column: Vue Object</code>, <code>index: Number</code>'
			},
			{
				name: '<code>empty</code>',
				description: 'Replaces table body when <code>data</code> array prop is empty',
				props: '—'
			},
			{
				name: '<code>footer</code>',
				description: 'Table custom footer',
				props: '—'
			}
		],
		events: [
			{
				name: '<code>row-click</code>',
				description: 'Triggers when a row is clicked',
				parameters: '<code>row: Object</code>'
			},
			{
				name: '<code>update:sort-by</code>',
				description: 'Triggers when a sortable column is clicked',
				parameters: '<code>field: String</code>, <code>order: String</code>'
			},
			{
				name: '<code>update:selected-row</code>',
				description: 'Triggers when there are new selected rows',
				parameters: '<code>rows: Object[]</code>'
			},
			{
				name: '<code>select-row</code>',
				description: 'Triggers when a row is selected',
				parameters: '<code>row: Object</code>'
			},
			{
				name: '<code>unselect-row</code>',
				description: 'Triggers when a row is unselected',
				parameters: '<code>row: Object</code>'
			},
			{
				name: '<code>update:checked-row</code>',
				description: 'Triggers when there are new checked rows',
				parameters: '<code>rows: Object[]</code>'
			},
			{
				name: '<code>check-row</code>',
				description: 'Triggers when the checkbox in a row is activated',
				parameters: '<code>row: Object</code>'
			},
			{
				name: '<code>uncheck-row</code>',
				description: 'Triggers when the checkbox in a row is deactivated',
				parameters: '<code>row: Object</code>'
			},
			{
				name: '<code>page-change</code>',
				description: 'Triggers when pagination page is changed',
				parameters: '<code>page: Number</code>'
			},
			{
				name: '<code>dragstart</code>',
				description: 'Triggers when starting to drag a row',
				parameters: '<code> row: Object </code>, <code> dragEvent: Event </code>, <code> index: Number </code>'
			},
			{
				name: '<code>dragend</code>',
				description: 'Triggers when ending to drag a row',
				parameters: '<code> row: Object </code>, <code> dragEvent: Event </code>, <code> index: Number </code>'
			},
			{
				name: '<code>drop</code>',
				description: 'Triggers when dropping on a row',
				parameters: '<code> row: Object </code>, <code> drop: Event </code>, <code> index: Number </code>'
			},
			{
				name: '<code>dragover</code>',
				description: 'Triggers when dragging over a row',
				parameters: '<code> row: Object </code>, <code> dragover: Event </code>, <code> index: Number </code>'
			},
			{
				name: '<code>dragleave</code>',
				description: 'Triggers after dragging over a row',
				parameters: '<code> row: Object </code>, <code> dragover: Event </code>, <code> index: Number </code>'
			}
			// {
			// 	name: '<code>mouseenter</code>',
			// 	description: 'Triggers when mouse enters a row',
			// 	parameters: '<code> row: Object </code>'
			// },
			// {
			// 	name: '<code>mouseleave</code>',
			// 	description: 'Triggers when mouse leaves a row',
			// 	parameters: '<code> row: Object </code>'
			// }
		]
	},
	{
		title: 'Column',
		// description: 'See <code>BTableColumn</code> type definition for more information',
		props: [
			{
				name: '<code>label</code>',
				description: 'Column header text, also used to identify column so must be unique among all columns',
				type: 'String',
				values: '—',
				default: '—',
				required: 'false'
			},
			{
				name: '<code>value</code>',
				description:
					'How the column takes a row and derives a value for a cell, must be key on the row object or a function from a row to any given value',
				type: '[String, Function]',
				values: '—',
				default: '—',
				required: 'false'
			},
			{
				name: '<code>meta</code>',
				description: 'Meta prop to add anything, useful when creating custom headers',
				type: 'Any',
				values: '—',
				default: '—',
				required: 'false'
			},
			{
				name: '<code>width</code>',
				description: 'Column fixed width in any unit, or pixels when none is provided',
				type: 'Number, String',
				values: '—',
				default: '—',
				required: 'false'
			},
			{
				name: '<code>position</code>',
				description: 'Align the cell content to the center',
				type: 'Boolean',
				values: '<code>is-centered</code>, <code>is-right</code>',
				default: '<code>false</code>',
				required: 'false'
			},
			{
				name: '<code>sort</code>',
				description:
					'Whether the column can be sorted, provide <code>true</code> to handle sorting in userland, or provide an object with an <code>Ord</code> instance for BTable to handle sorting',
				type: 'Boolean',
				values: '—',
				default: '<code>false</code>',
				required: 'false'
			},
			{
				name: '<code>is-visible</code>',
				description: 'Whether the column is visible',
				type: 'Boolean',
				values: '—',
				default: '<code>true</code>',
				required: 'false'
			},
			{
				name: '<code>is-sticky</code>',
				description: 'Show a sticky column',
				type: 'Boolean',
				values: '—',
				default: '<code>false</code>',
				required: 'false'
			},
			{
				name: '<code>classes</code>',
				description: 'CSS classes to be applied to column cells',
				type: 'String',
				values: '—',
				default: '-',
				required: 'false'
			}
		]
	}
];
