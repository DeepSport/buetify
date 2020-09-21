import { ComponentApiDescription } from '../../../../../components/apiView';
import { ColorVariantPropApi } from '../../../shared/ColorVariantPropApi';

export const api: ComponentApiDescription[] = [
	{
		title: 'Button',
		props: [
			ColorVariantPropApi,
			{
				name: '<code>size</code>',
				description: 'Vertical size of button',
				type: 'String',
				values: '<code>is-small</code>, <code>is-medium</code>, <code>is-large</code>',
				default: '—',
				required: 'false'
			},
			{
				name: '<code>isLoading</code>',
				description: 'Add the loading state to the button',
				type: 'Boolean',
				values: '—',
				default: '<code>false</code>',
				required: 'false'
			},
			{
				name: '<code>isRounded</code>',
				description: 'Rounded style',
				type: 'Boolean',
				values: '—',
				default: '<code>false</code>',
				required: 'false'
			},
			{
				name: '<code>isOutlined</code>',
				description: 'Outlined style',
				type: 'Boolean',
				values: '—',
				default: '<code>false</code>',
				required: 'false'
			},
			{
				name: '<code>isFocused</code>',
				description: 'Focused style',
				type: 'Boolean',
				values: '—',
				default: '<code>false</code>',
				required: 'false'
			},
			{
				name: '<code>isInverted</code>',
				description: 'Inverted style',
				type: 'Boolean',
				values: '—',
				default: '<code>false</code>',
				required: 'false'
			},
			{
				name: '<code>isHovered</code>',
				description: 'Hovered style',
				type: 'Boolean',
				values: '—',
				default: '<code>false</code>',
				required: 'false'
			},
			{
				name: '<code>isActive</code>',
				description: 'Active style',
				type: 'Boolean',
				values: '—',
				default: '<code>false</code>',
				required: 'false'
			},
			{
				name: '<code>isSelected</code>',
				description: 'Selected style',
				type: 'Boolean',
				values: '—',
				default: '<code>false</code>',
				required: 'false'
			},
			{
				name: '<code>isExpanded</code>',
				description: 'Button will be expanded (full-width)',
				type: 'Boolean',
				values: '—',
				default: '<code>false</code>',
				required: 'false'
			},
			{
				name: '<code>tag</code>',
				description: 'HTML tag for button',
				type: 'String',
				values: '<code>button</code>, <code>a</code>, <code>input</code>',
				default: '<code>button</code>',
				required: 'false'
			}
		],
		events: [
			{
				name: '<code>[any]</code>',
				description: 'All listeners are bound to the native element',
				parameters: '<code>event: $event</code>'
			}
		]
	}
];
