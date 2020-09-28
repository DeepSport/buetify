import { ComponentApiDescription } from '../../../../../../components/apiView';
import {
	ColorVariantPropApi,
	EqPropApi,
	getBooleanPropsApi,
	getUseStaticInputPropsApi,
	SizeVariantPropApi
} from '../../../../shared/api';

export const apis: ComponentApiDescription[] = [
	{
		title: 'Date Picker',
		props: [
			{
				name: '<code>v-model</code>',
				description: 'Binding value, can be either a single date or an array',
				type: '[Date, Array]',
				values: `-`,
				default: '<code>[]</code>',
				required: 'false'
			},
			{
				name: '<code>min-date</code>',
				description: 'Earliest date available for selection',
				type: 'Date',
				values: '—',
				default: '—',
				required: 'false'
			},
			{
				name: '<code>max-date</code>',
				description: 'Latest date available for selection',
				type: 'Date',
				values: '—',
				default: '—',
				required: 'false'
			},
			{
				name: '<code>events</code>',
				description: 'Dates to display indicators',
				type: 'Array',
				values: '—',
				default: '—',
				required: 'false',
			},
			{
				name: '<code>indicators</code>',
				description: 'Shape to use when showing event indicators',
				type: 'String',
				values: '<code>dots</code>, <code>bars</code>',
				default: '<code>dots</code>',
				required: 'false'
			},
			{
				name: '<code>focused-date</code>',
				description: 'Date that should be initially focused upon',
				type: 'Date',
				values: '—',
				default: '<code>new Date()</code>',
				required: 'false'
			},
			{
				name: '<code>size</code>',
				description: 'Vertical size of input and picker, optional',
				type: 'String',
				values: '<code>is-small</code>, <code>is-medium</code>, <code>is-large</code>',
				default: '—',
				required: 'false'
			},
			{
				name: '<code>is-inline</code>',
				description: 'Datepicker is shown inline, input is removed',
				type: 'Boolean',
				values: '—',
				default: '<code>false</code>',
				required: 'false'
			},
			{
				name: '<code>is-loading</code>',
				description: 'Add the loading state to the input',
				type: 'Boolean',
				values: '—',
				default: '<code>false</code>',
				required: 'false'
			},
			{
				name: '<code>icon</code>',
				description: 'Icon to be added to input',
				type: 'Function',
				values: '—',
				default: '—',
				required: 'false'
			},
			{
				name: '<code>unselectable-dates</code>',
				description: 'Array of unselectable dates',
				type: 'Array',
				values: '—',
				default: '-',
				required: 'false'
			},
			{
				name: '<code>unselectable-days-of-week</code>',
				description: 'Array of unselectable days of week',
				type: 'Array',
				values: '<code>0 - 6 (Monday is 0, Tuesday is 1, and so on)</code>',
				default: '-',
				required: 'false'
			},
			{
				name: '<code>selectable-dates</code>',
				description: 'Array of selectable dates',
				type: 'Array',
				values: '—',
				default: '-',
				required: 'false'
			},
			{
				name: '<code>month-names</code>',
				description: 'Names of months to display in table header',
				type: 'Array',
				values: '—',
				default: '<code>undefined</code>: default to browser locale.'
			},
			{
				name: '<code>day-names</code>',
				description: 'Names of days to display in table header',
				type: 'Array',
				values: '—',
				default: '<code>undefined</code>: default to browser locale.'
			},
			{
				name: '<code>first-day-of-week</code>',
				description: 'First day of week to display in table header',
				type: 'Number',
				values: '<code>0 - 6 (Sunday is 0, Monday is 1, and so on)</code>',
				default: '<code>0</code>'
			},
			{
				name: '<code>mobile-native</code>',
				description: 'Enable native datepicker on mobile',
				type: 'Boolean',
				values: '<code>true</code>, <code>false</code>',
				default: '<code>true</code>'
			},
			{
				name: '<code>position</code>',
				description: 'Optional, position of the datepicker relative to the input',
				type: 'String',
				values: '<code>is-top-right</code>, <code>is-top-left</code>, <code>is-bottom-left</code>',
				default: 'Bottom right'
			},
			{
				name: '<code>open-on-focus</code>',
				description: 'Open datepicker on input focus',
				type: 'Boolean',
				values: '—',
				default: '<code>false</code>'
			},
			{
				name: '<code>type</code>',
				description: 'Type of picker',
				type: 'String',
				values: '<code>month</code>',
				default: '-'
			},
			{
				name: '<code>years-range</code>',
				description: 'Years range relative to selected year',
				type: 'Array',
				values: '-',
				default: '<code>[-100, 3]</code>'
			},
			{
				name: '<code>nearby-month-days</code>',
				description: 'Show/Hide nearby month days (prev and next month)',
				type: 'Boolean',
				values: '-',
				default: '<code>true</code>'
			},
			{
				name: '<code>nearby-selectable-month-days</code>',
				description: 'When <code>nearby-month-days</code>, it allows to select/unselect nearby month days',
				type: 'Boolean',
				values: '-',
				default: '<code>false</code>'
			},
			{
				name: '<code>show-week-number</code>',
				description: 'Display week number',
				type: 'Boolean',
				values: '-',
				default: '<code>false</code>'
			},
			{
				name: '<code>rules-for-first-week</code>',
				description: 'Choose the rule to determinate the first week of Year, 4 for ISO or 1 for other',
				type: 'Number',
				values: '-',
				default: '<code>4</code>'
			},
			{
				name: '<code>range</code>',
				description: 'Flag to allow choosing a range of date',
				type: 'Boolean',
				values: '—',
				default: '<code>false</code>'
			},
			{
				name: '<code>multiple</code>',
				description: 'Flag to allow choosing multiple dates',
				type: 'Boolean',
				values: '—',
				default: '<code>false</code>'
			},
			{
				name: '<code>focusable</code>',
				description: 'Datepicker container can be focused',
				type: 'Boolean',
				values: '—',
				default: '<code>true</code>'
			},
			{
				name: '<code>trap-focus</code>',
				description: `Trap focus inside the datepicker.`,
				type: 'Boolean',
				values: '—',
				default: '<code>false</code>'
			},
			{
				name: '<code>append-to-body</code>',
				description: 'Append datepicker calendar to body',
				type: 'Boolean',
				values: '—',
				default: '<code>false</code>'
			},
			{
				name: '<code>aria-next-label</code>',
				description: 'Accessibility label for the next month button.',
				type: 'String',
				values: '—',
				default: '—'
			},
			{
				name: '<code>aria-previous-label</code>',
				description: 'Accessibility label for the previous month button.',
				type: 'String',
				values: '—',
				default: '—'
			},
		],
		slots: [
			{
				name: 'default',
				description: 'Label text',
				props: '-'
			}
		],
		events: [
			{
				name: '<code>update:model-value</code>',
				description: 'Triggers when checked value is changed',
				parameters: '<code>modelValue: Number</code>'
			}
		]
	}
];
