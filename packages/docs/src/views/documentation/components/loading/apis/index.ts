import { ComponentApiDescription } from '../../../../../components/apiView';

export const apis: ComponentApiDescription[] = [
	{
		title: 'Loading',
		props: [
			{
				name: '<code>v-model:is-active</code>',
				description:
					'Whether loading overlay is active or not, omit the <code>v-model</code> modifier to make it a one-way binding',
				type: 'Boolean',
				values: '—',
				default: '<code>false</code>',
				required: 'false'
			},
			{
				name: '<code>transition</code>',
				description: 'Custom animation (transition name)',
				type: 'String',
				values: '—',
				default: '<code>fade</code>',
				required: 'false'
			},
			{
				name: '<code>is-fullscreen</code>',
				description: 'Loader will overlay the full screen',
				type: 'Boolean',
				values: '—',
				default: '<code>true</code>',
				required: 'false'
			},
			{
				name: '<code>can-cancel</code>',
				description: `Can close Loading by pressing escape (if fullscreen) or clicking on overlay`,
				type: 'Boolean',
				values: '—',
				default: '<code>false</code>',
				required: 'false'
			}
		],
		slots: [
			{
				name: '<code>trigger</code>',
				description: 'Trigger slot, only available on fullscreen loaders',
				props:
					'<code>toggle: { isOpen: Ref<boolean>, isClosed: Ref<boolean>, attrs: object, listeners: object, open: IO<void>, close: IO<void>, toggle: IO<void>}</code>'
			},
			{
				name: 'default',
				description: 'Content to display inside loader',
				props: '<code>close: IO<void></code>'
			}
		]
	}
];
