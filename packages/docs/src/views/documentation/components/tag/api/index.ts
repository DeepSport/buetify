import { ComponentApiDescription } from '../../../../../components/apiView';

export const api: ComponentApiDescription[] = [
	{
		title: 'Tag',
		props: [
			{
				name: '<code>variant</code>',
				description: 'Variant (color) of the tag, optional',
				type: 'String',
				values: `<code>is-white</code>, <code>is-black</code>, <code>is-light</code>,
                    <code>is-dark</code>, <code>is-primary</code>, <code>is-info</code>, <code>is-success</code>,
                    <code>is-warning</code>, <code>is-danger</code>,
                    and any other colors you've set in the <code>$colors</code> list on Sass`,
				default: '—',
				required: 'false'
			},
			{
				name: '<code>close-variant</code>',
				description: 'Variant (color) of the cross button of tag, optional',
				type: 'String',
				values: `<code>is-white</code>, <code>is-black</code>, <code>is-light</code>,
                    <code>is-dark</code>, <code>is-primary</code>, <code>is-info</code>, <code>is-success</code>,
                    <code>is-warning</code>, <code>is-danger</code>,
                    and any other colors you've set in the <code>$colors</code> list on Sass`,
				default: '—',
				required: 'false'
			},
			{
				name: '<code>size</code>',
				description: 'Size of the tag, optional',
				type: 'String',
				values: '<code>is-medium</code>, <code>is-large</code>',
				default: '—',
				required: 'false'
			},
			{
				name: '<code>is-rounded</code>',
				description: 'Tag border rounded',
				type: 'Boolean',
				values: '—',
				default: '<code>false</code>',
				required: 'false'
			},
			{
				name: '<code>is-closable</code>',
				description: 'Add close/delete button to the tag',
				type: 'Boolean',
				values: '—',
				default: '<code>false</code>',
				required: 'false'
			},
			{
				name: '<code>is-attached</code>',
				description: 'Close/delete button style equal to attached tags',
				type: 'Boolean',
				values: '—',
				default: '<code>false</code>',
				required: 'false'
			},
			{
				name: '<code>has-ellipsis</code>',
				description: 'Adds ellipsis to not overflow the text',
				type: 'Boolean',
				values: '—',
				default: '<code>false</code>',
				required: 'false'
			},
			{
				name: '<code>is-tabable</code>',
				description: 'If should stop when using tab key',
				type: 'Boolean',
				values: '—',
				default: '<code>true</code>',
				required: 'false'
			},
			{
				name: '<code>is-disabled</code>',
				description: 'Disable delete button',
				type: 'Boolean',
				values: '—',
				default: '<code>false</code>',
				required: 'false'
			}
		],
		events: [
			{
				name: '<code>close</code>',
				description: 'Triggers when close/delete button is clicked or <b>delete</b> key is pressed',
				parameters: '—'
			}
		]
	},
	{
		title: 'Tag List',
		props: [
			{
				name: '<code>is-attached</code>',
				description: 'Tags inside are attached together',
				type: 'Boolean',
				values: '—',
				default: '<code>false</code>',
				required: 'false'
			}
		]
	}
];
