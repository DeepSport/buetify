import { ComponentApiDescription } from '../../../../../components/apiView';
import { getUseToggleEventsApi, getUseTogglePropsApi } from '../../../shared/api';

export const apis: ComponentApiDescription[] = [
	{
		title: 'Modal',
		props: [
			{
				name: '<code>v-model:is-active</code>',
				description: 'Whether modal is active or not, omit the <code>v-model</code> modifier to make it a one way binding',
				type: 'Boolean',
				values: '—',
				default: '<code>false</code>',
				required: 'false'
			},
			{
				name: '<code>is-fullscreen</code>',
				description: 'Display modal as full screen',
				type: 'Boolean',
				values: '—',
				default: '<code>false</code>',
				required: 'false'
			},
			{
				name: '<code>transition</code>',
				description: 'Custom transition (transition name)',
				type: 'String',
				values: '—',
				default: '<code>fade</code>',
				required: 'false'
			}
		],
		events: [
			{
				name: '<code>set-off</code>',
				description: 'Triggers when user closes modal',
				parameters: '—'
			},
			{
				name: '<code>set-on</code>',
				description: 'Triggers when user opens modal',
				parameters: '—'
			},
			{
				name: '<code>toggle</code>',
				description: 'Triggers when user toggles status of modal',
				parameters: '—'
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
				name: 'default',
				description: 'Content to display inside modal',
				props: '\'<code>toggle: { isOpen: Ref<boolean>, isClosed: Ref<boolean>, attrs: object, listeners: object, open: IO<void>, close: IO<void>, toggle: IO<void>}</code>\''
			}
		]
	}
];
