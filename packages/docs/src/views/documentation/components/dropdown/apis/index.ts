import { ComponentApiDescription } from '../../../../../components/apiView';
import { getUseToggleEventsApi, getUseTogglePropsApi, getUseTransitionPropsApi } from '../../../shared/api';

export const apis: ComponentApiDescription[] = [
	{
		title: 'Dropdown',
		props: [
			...getUseTogglePropsApi('is-expanded', true),
			getUseTransitionPropsApi('fade'),
			{
				name: '<code>position</code>',
				description: 'Position of the dropdown relative to the trigger',
				type: 'String',
				values: '<code>is-top-right</code>, <code>is-top-left</code>, <code>is-bottom-left</code>',
				default: '<code>is-bottom-left</code>',
				required: '<code>false</code>'
			},
			{
				name: '<code>is-disabled</code>',
				description: 'Disables dropdown',
				type: 'Boolean',
				values: '—',
				default: '<code>false</code>',
				required: '<code>false</code>'
			},
			{
				name: '<code>is-inline</code>',
				description: 'Dropdown content (items) are shown inline, trigger is removed',
				type: 'Boolean',
				values: '—',
				default: '<code>false</code>',
				required: '<code>false</code>'
			},
			{
				name: '<code>is-mobile-modal</code>',
				description: 'Dropdown content (items) are shown into a modal on mobile',
				type: 'Boolean',
				values: '—',
				default: '<code>true</code>',
				required: '<code>false</code>'
			}
		],
		events: getUseToggleEventsApi('isExpanded'),
		slots: [
			{
				name: 'trigger',
				description: 'Dropdown open / close button, has default icon',
				props: '<code>isExpanded: boolean</code>'
			},
			{
				name: 'default',
				description: 'Content to display inside dropdown',
				props:
					'<code>toggle: { isOpen: Ref<boolean>, isClosed: Ref<boolean>, attrs: object, listeners: object, open: IO<void>, close: IO<void>, toggle: IO<void>}</code>'
			}
		]
	}
];
