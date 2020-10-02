import { ComponentApiDescription } from '../../../../../components/apiView';
import {getUseToggleEventsApi, getUseTogglePropsApi} from '../../../shared/api';

export const apis: ComponentApiDescription[] = [
	{
		title: 'Menu',
		props: [
			{
				name: '<code>tag</code>',
				description: 'Html tag for component',
				type: 'String',
				values: '-',
				default: '<code>aside</code>',
				required: 'false'
			}
		],
		slots: [
			{
				name: '<code>default</code>',
				description: 'Menu content',
				props: '-'
			}
		]
	},
	{
		title: 'Group',
		props: [
			{
				name: '<code>is-expandable</code>',
				description: 'Controls whether group is expandable or always open',
				type: 'Boolean',
				values: '-',
				default: '<code>false</code>',
				required: 'false'
			},
			...getUseTogglePropsApi('isExpanded', false),
			{
				name: '<code>menu-label-class</code>',
				description: 'Class to apply to <code>menu-label</code>',
				type: 'String',
				values: '-',
				default: '-',
				required: 'false'
			},
			{
				name: '<code>menu-list-class</code>',
				description: 'Class to apply to <code>menu-list</code>',
				type: 'String',
				values: '-',
				default: '-',
				required: 'false'
			}
		],
		slots: [
			{
				name: '<code>menu-label</code>',
				description: 'Slot for menu label',
				props: '-'
			},
			{
				name: '<code>default</code>',
				description: 'Slot for menu list items',
				props: '-'
			}
		],
		events: getUseToggleEventsApi('isExpanded')
	},
	{
		title: 'List',
		props: [
			{
				name: '<code>tag</code>',
				description: 'Html tag for component',
				type: 'String',
				values: '-',
				default: '<code>ul</code>',
				required: 'false'
			}
		],
		slots: [
			{
				name: '<code>default</code>',
				description: 'Slot for menu list items',
				props: '-'
			}
		]
	}
];
