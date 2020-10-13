import { ComponentApiDescription } from '../../../../../components/apiView';

export const apis: ComponentApiDescription[] = [
	{
		title: 'Tabs',
		props: [
			{
				name: '<code>v-model</code>',
				description: 'Binding value, tab index. Passing undefined will show the first tab',
				type: 'Number',
				values: '—',
				default: '<code>undefined</code>',
				required: 'false'
			},
			{
				name: '<code>is-animated</code>',
				description: 'Tabs have slide animation',
				type: 'Boolean',
				values: '—',
				default: '<code>true</code>',
				required: 'false'
			},
			{
				name: '<code>variant</code>',
				description: 'Color variant for the tabs, optional',
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
				description: 'Size of the tabs, optional',
				type: 'String',
				values: '<code>is-small</code>, <code>is-medium</code>, <code>is-large</code>',
				default: '—',
				required: 'false'
			},
			{
				name: '<code>is-vertical</code>',
				description: 'Display the tabs vertically',
				type: 'Boolean',
				values: '—',
				default: '<code>false</code>',
				required: 'false'
			},
			{
				name: '<code>position</code>',
				description:
					'Position of the tabs, optional. <code>is-centered</code> only applicable if tabs are not vertical',
				type: 'String',
				values: '<code>is-centered</code>, <code>is-right</code>',
				default: '—',
				required: 'false'
			},
			{
				name: '<code>type</code>',
				description: 'Type (style) of tabs',
				type: 'String',
				values: '<code>is-boxed</code>, <code>is-toggle</code>, <code>is-toggle-rounded</code>',
				default: '-',
				required: 'false'
			}
		],
		slots: [
			{
				name: 'default',
				description: 'Tabs body where <code>b-tab-item</code> can be included',
				props: '—'
			}
		],
		events: [
			{
				name: '<code>update:model-value</code>',
				description: 'Triggers when active tab is changed',
				parameters: '<code>value: Number</code>'
			}
		]
	},
	{
		title: 'Item',
		props: [
			{
				name: '<code>label</code>',
				description: 'Step label',
				type: 'String',
				values: '—',
				default: '—',
				required: 'true'
			},
			{
				name: '<code>icon</code>',
				description: 'Icon component to be used inside navigation marker',
				type: '[Object, Function]',
				values: '—',
				default: '—',
				required: 'false'
			},
			{
				name: '<code>is-visible</code>',
				description: 'Item is visible',
				type: 'Boolean',
				values: '-',
				default: 'true',
				required: 'false'
			}
		],
		slots: [
			{
				name: 'default',
				description: 'Tab item body',
				props: '—'
			}
		]
	}
];
