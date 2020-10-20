import { ComponentApiDescription } from '../../../../../components/apiView';
import { getUseTransitionPropsApi } from '../../../shared/api';

export const apis: ComponentApiDescription[] = [
	{
		title: 'Dialog',
		props: [
			getUseTransitionPropsApi('fade'),
			{
				name: '<code>is-active</code>',
				description: 'Can be used by parent to open / close dialog',
				type: 'Boolean',
				values: '—',
				default: '<code>false</code>',
				required: 'false'
			}
		],
		events: [
			{
				name: '<code>set-on</code>',
				description: 'Listen to open event',
				parameters: '-'
			},
			{
				name: '<code>set-off</code>',
				description: 'Listen to close event',
				parameters: '-'
			},
			{
				name: '<code>toggle</code>',
				description: 'Listen to toggle event',
				parameters: '<code>status: boolean</code>'
			}
		],
		slots: [
			{
				name: '<code>trigger</code>',
				description: 'Trigger slot',
				props:
					'<code>toggle: { isOpen: Ref<boolean>, isClosed: Ref<boolean>, attrs: object, listeners: object, open: IO<void>, close: IO<void>, toggle: IO<void>}</code>'
			},
			{
				name: '<code>title</code>',
				description: 'Trigger content',
				props:
					'<code>toggle: { isOpen: Ref<boolean>, isClosed: Ref<boolean>, attrs: object, listeners: object, open: IO<void>, close: IO<void>, toggle: IO<void>}</code>'
			},
			{
				name: '<code>default</code>',
				description: 'Content inside body of dialog',
				props: '—'
			},
			{
				name: '<code>footer</code>',
				description: 'Trigger content',
				props:
					'<code>toggle: { isOpen: Ref<boolean>, isClosed: Ref<boolean>, attrs: object, listeners: object, open: IO<void>, close: IO<void>, toggle: IO<void>}</code>'
			}
		]
	}
];
