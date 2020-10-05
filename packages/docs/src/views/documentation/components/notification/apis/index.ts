import { ComponentApiDescription } from '../../../../../components/apiView';
import { getUseToggleEventsApi, getUseTogglePropsApi } from '../../../shared/api';

export const apis: ComponentApiDescription[] = [
	{
		title: 'Message',
		props: [
			{
				name: '<code>variant</code>',
				description: 'Type (color) of the message, optional',
				type: 'String',
				values: `<code>is-white</code>, <code>is-black</code>, <code>is-light</code>,
                    <code>is-dark</code>, <code>is-primary</code>, <code>is-info</code>, <code>is-success</code>,
                    <code>is-warning</code>, <code>is-danger</code>,
                    and any other colors you've set in the <code>$colors</code> list on Sass`,
				default: '—',
				required: 'false'
			},
			{
				name: '<code>v-model:is-active</code>',
				description: 'Whether notification is active or not, use the modifier to make it two-way binding',
				type: 'Boolean',
				values: '—',
				default: '<code>true</code>',
				required: 'false'
			},
			{
				name: '<code>is-closable</code>',
				description: `Adds an 'X' button that closes the notification — works if has a <code>title</code>`,
				type: 'Boolean',
				values: '—',
				default: '<code>true</code>',
				required: 'false'
			},
			{
				name: '<code>auto-close</code>',
				description: `Hide message after <code>duration</code>`,
				type: 'Boolean',
				values: '—',
				default: '<code>false</code>',
				required: 'false'
			},
			{
				name: '<code>duration</code>',
				description: 'Visibility duration in miliseconds',
				type: 'Number',
				values: '—',
				default: '<code>2000</code>',
				required: 'false'
			},
			{
				name: '<code>use-icon</code>',
				description:
					'Adds an icon on the left side depending on the <code>variant</code> (or the <code>icon</code> prop if defined)',
				type: 'Boolean',
				values: '—',
				default: '<code>false</code>',
				required: 'false'
			},
			{
				name: '<code>icons</code>',
				description: 'Record<ColorVariant, IconComponent>, can be used to override Buetify variant icons',
				type: 'Object',
				values: '—',
				default: '<code>false</code>',
				required: 'false'
			},
			{
				name: '<code>icon</code>',
				description: 'Icon component to use with <code>use-icon</code>',
				type: 'Object',
				values: '—',
				default: '—',
				required: 'false'
			},
			{
				name: '<code>size</code>',
				description: 'Size of the control, optional',
				type: 'String',
				values: '<code>is-small</code>, <code>is-medium</code>, <code>is-large</code>',
				default: '—',
				required: 'false'
			},
			{
				name: '<code>icon-size</code>',
				description: 'Size of the icon, optional',
				type: 'String',
				values: '<code>is-small</code>, <code>is-medium</code>, <code>is-large</code>',
				default: '<code>is-large</code> or <code>size</code> prop',
				required: 'false'
			},
			{
				name: '<code>title</code>',
				description: 'Message title, can also use the <code>title</code> slot',
				type: 'String',
				values: '—',
				default: '—',
				required: 'false'
			},
			...getUseTogglePropsApi('isActive', true)
		],
		events: getUseToggleEventsApi('isActive'),
		slots: [
			{
				name: 'default',
				description: 'Content to display inside message',
				props: '-'
			},
			{
				name: 'title',
				description: 'Title',
				props: '-'
			}
		]
	}
];
