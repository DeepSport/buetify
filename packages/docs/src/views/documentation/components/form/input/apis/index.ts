import { ComponentApiDescription } from '../../../../../../components/apiView';

export const apis: ComponentApiDescription[] = [
	{
		title: 'Input',
		props: [
			{
				name: '<code>v-model</code>',
				description: 'Binding value',
				type: 'String, Number',
				values: '—',
				default: '—',
				required: 'false'
			},
			{
				name: '<code>type</code>',
				description: 'Input type, like native',
				type: 'String',
				values: 'Any native input type, and <code>textarea</code>',
				default: '<code>text</code>',
				required: 'false'
			},
			{
				name: '<code>size</code>',
				description: 'Vertical size of input, optional',
				type: 'String',
				values: '<code>is-small</code>, <code>is-medium</code>, <code>is-large</code>',
				default: '—',
				required: 'false'
			},
			{
				name: '<code>is-expanded</code>',
				description: 'Makes input full width when inside a grouped or addon field',
				type: 'Boolean',
				values: '—',
				default: '<code>false</code>',
				required: 'false'
			},
			{
				name: '<code>use-password-reveal</code>',
				description: 'Add the reveal password functionality',
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
				description: 'Icon component to be added in left icon position of input',
				type: 'Function',
				values: '—',
				default: '—',
				required: 'false'
			},
			{
				name: '<code>maxlength</code>',
				description: 'Same as native <code>maxlength</code>, plus character counter',
				type: 'Number',
				values: '—',
				default: '—',
				required: 'false'
			},
			{
				name: '<code>has-counter</code>',
				description: 'Show character counter when <code>maxlength</code> prop is passed',
				type: 'Boolean',
				values: '—',
				default: '<code>true</code>',
				required: 'false'
			},
			{
				name: 'Any native attribute',
				description: '—',
				type: '—',
				values: '—',
				default: '—',
				required: 'false'
			}
		],
		events: [
			{
				name: '<code>update:model-value</code>',
				description: 'Triggers when value is changed',
				parameters: '<code>value: String|Number</code>'
			},
			{
				name: '<code>focus</code>',
				description: 'Triggers when input has received focus',
				parameters: '<code>event: $event</code>'
			},
			{
				name: '<code>blur</code>',
				description: 'Triggers when input has lost focus',
				parameters: '<code>event: $event</code>'
			},
			{
				name: '<code>[any]</code>',
				description: 'Listen to any native event, e.g. <code>click.native</code>',
				parameters: '<code>event: $event</code>'
			}
		]
	}
];
