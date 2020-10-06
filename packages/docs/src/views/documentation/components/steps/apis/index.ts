import { ComponentApiDescription } from '../../../../../components/apiView';

export const apis: ComponentApiDescription[] = [
	{
		title: 'Pagination',
		props: [
			{
				name: '<code>v-model</code>',
				description: 'Current page number, use the prop<code>model-value</code> to make it a one way binding. Page is 1-indexed',
				type: 'Number',
				values: '—',
				default: '<code>1</code>',
				required: 'false'
			},
			{
				name: '<code>total</code>',
				description: `Total count of items`,
				type: 'Number',
				values: '—',
				default: '—',
				required: 'true'
			},
			{
				name: '<code>per-page</code>',
				description: 'Items count for each page',
				type: 'Number',
				values: '—',
				default: '<code>25</code>',
				required: 'false'
			},
			{
				name: '<code>position</code>',
				description: 'Buttons position, optional',
				type: 'String',
				values: '<code>is-centered</code>, <code>is-right</code>',
				default: '—',
				required: 'false'
			},
			{
				name: '<code>size</code>',
				description: 'Pagination size, optional',
				type: 'String',
				values: '<code>is-small</code>, <code>is-medium</code>, <code>is-large</code>',
				default: '—',
				required: 'false'
			},
			{
				name: '<code>is-simple</code>',
				description: 'Simpler style',
				type: 'Boolean',
				values: '—',
				default: '<code>false</code>',
				required: 'false'
			},
			{
				name: '<code>is-rounded</code>',
				description: 'Rounded button styles',
				type: 'Boolean',
				values: '—',
				default: '<code>false</code>',
				required: 'false'
			}
		]
	}
];
