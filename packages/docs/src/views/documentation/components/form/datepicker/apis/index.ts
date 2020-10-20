import { ComponentApiDescription } from '../../../../../../components/apiView';

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
				name: '<code>v-model:month</code>',
				description: 'Binding value for month',
				type: 'Number',
				values: `-`,
				default: '<code>new Date().getMonth()</code>',
				required: 'false'
			},
			{
				name: '<code>v-model:year</code>',
				description: 'Binding value for year',
				type: 'Number',
				values: `-`,
				default: '<code>new Date().getFullYear()</code>',
				required: 'false'
			},
			// {
			// 	name: '<code>v-model:range</code>',
			// 	description: 'Binding value for date range',
			// 	type: 'Array as [Date, Date]',
			// 	values: `-`,
			// 	default: '-',
			// 	required: 'false'
			// },

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
				required: 'false'
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
				default: '<code>undefined</code>: default to browser locale.',
				required: 'false'
			},
			{
				name: '<code>day-names</code>',
				description: 'Names of days to display in table header',
				type: 'Array',
				values: '—',
				default: '<code>undefined</code>: default to browser locale.',
				required: 'false'
			},
			{
				name: '<code>first-day-of-week</code>',
				description: 'First day of week to display in table header',
				type: 'Number',
				values: '<code>0 - 6 (Monday is 0, Tuesday is 1, and so on)</code>',
				default: '<code>0</code>',
				required: 'false'
			},
			{
				name: '<code>mobile-native</code>',
				description: 'Enable native datepicker on mobile',
				type: 'Boolean',
				values: '<code>true</code>, <code>false</code>',
				default: '<code>true</code>',
				required: 'false'
			},
			{
				name: '<code>position</code>',
				description: 'Optional, position of the datepicker relative to the input',
				type: 'String',
				values: '<code>is-top-right</code>, <code>is-top-left</code>, <code>is-bottom-left</code>',
				default: '<code>is-bottom-right</code>',
				required: 'false'
			},
			{
				name: '<code>open-on-focus</code>',
				description: 'Open datepicker on input focus',
				type: 'Boolean',
				values: '—',
				default: '<code>false</code>',
				required: 'false'
			},
			{
				name: '<code>years-range</code>',
				description: 'Years range relative to selected year',
				type: 'Array',
				values: '-',
				default: '<code>[-5, 3]</code>',
				required: 'true'
			},
			// {
			// 	name: '<code>nearby-month-days</code>',
			// 	description: 'Show/Hide nearby month days (prev and next month)',
			// 	type: 'Boolean',
			// 	values: '-',
			// 	default: '<code>true</code>',
			// 	required: 'false'
			// },
			// {
			// 	name: '<code>nearby-selectable-month-days</code>',
			// 	description: 'When <code>nearby-month-days</code>, it allows to select/unselect nearby month days',
			// 	type: 'Boolean',
			// 	values: '-',
			// 	default: '<code>false</code>',
			// 	required: 'false'
			// },
			// {
			// 	name: '<code>show-week-number</code>',
			// 	description: 'Display week number',
			// 	type: 'Boolean',
			// 	values: '-',
			// 	default: '<code>false</code>',
			// 	required: 'false'
			// },
			// {
			// 	name: '<code>rules-for-first-week</code>',
			// 	description: 'Choose the rule to determinate the first week of Year, 4 for ISO or 1 for other',
			// 	type: 'Number',
			// 	values: '-',
			// 	default: '<code>4</code>',
			// 	required: 'false'
			// },
			{
				name: '<code>useRange</code>',
				description: 'Flag to allow choosing a range of date',
				type: 'Boolean',
				values: '—',
				default: '<code>false</code>',
				required: 'false'
			},
			{
				name: '<code>isMultiple</code>',
				description: 'Flag to allow choosing multiple dates',
				type: 'Boolean',
				values: '—',
				default: '<code>false</code>',
				required: 'false'
			}
			// {
			// 	name: '<code>isFocusable</code>',
			// 	description: 'Datepicker container can be focused',
			// 	type: 'Boolean',
			// 	values: '—',
			// 	default: '<code>true</code>',
			// 	required: 'false'
			// },
		],
		slots: [
			{
				name: 'footer',
				description: 'Footer',
				props: '—'
			},
			{
				name: 'header',
				description: 'Header',
				props: '—'
			},
			{
				name: 'trigger',
				description: 'Trigger',
				props: '—'
			}
		],
		events: [
			{
				name: '<code>update:model=value</code>',
				description: 'Triggers when the value of datepicker is changed',
				parameters: '<code>value: Date | Date[]</code>'
			},
			{
				name: '<code>update:month</code>',
				description: 'Triggers when calendar month is changed',
				parameters: '<code>month: Number(0-11)</code>'
			},
			{
				name: '<code>update:year</code>',
				description: 'Triggers when calendar year is changed',
				parameters: '<code>year: Number</code>'
			},
			{
				name: '<code>update:range</code>',
				description: 'Triggers when user starts selects a date range (Only when <b>useRange</b> prop is set)',
				parameters: '<code>range: [Date, Date]</code>'
			}
		]
	}
];
