import { ComponentApiDescription } from '../../../../../components/apiView';
import { ColorVariantPropApi } from '../../../shared/api';

export const apis: ComponentApiDescription[] = [
	{
		title: 'Icon',
		props: [
			ColorVariantPropApi,
			{
				name: '<code>size</code>',
				description: 'Icon size, optional',
				type: 'String',
				values: '<code>is-small</code>, <code>is-medium</code>, <code>is-large</code>',
				default: '—',
				required: 'false'
			}
		],
		events: [
			{
				name: '<code>[any]</code>',
				description: 'All listeners are bound to the native element',
				parameters: '<code>event: $event</code>'
			}
		],
		slots: [
			{
				name: '<code>default</code>',
				description: 'For icon',
				props: '-'
			}
		]
	}
];
