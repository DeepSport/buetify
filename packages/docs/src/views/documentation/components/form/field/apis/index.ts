import { ComponentApiDescription } from '../../../../../../components/apiView';
import {
	ColorVariantPropApi,
	EqPropApi,
	getBooleanPropsApi,
	getUseStaticInputPropsApi,
	SizeVariantPropApi
} from '../../../../shared/api';

export const apis: ComponentApiDescription[] = [
	{
		title: 'Field',
		props: [
			ColorVariantPropApi,
			{
				name: '<code>label</code>',
				description: 'Field label',
				type: 'String',
				values: '—',
				default: '—',
				required: 'false'
			},
			{
				name: '<code>label-for</code>',
				description: 'Same as native <code>for</code> set on the label',
				type: 'String',
				values: '—',
				default: '—',
				required: 'false'
			},
			{
				name: '<code>custom-label-class</code>',
				description: 'CSS classes to be applied on field label',
				type: 'String',
				values: '—',
				default: '—',
				required: 'false'
			},
			{
				name: '<code>message</code>',
				description: 'Help message text',
				type: 'String, Object, Array<String>, Array<Object>',
				values: '—',
				default: '—',
				required: 'false'
			},
			getBooleanPropsApi(
				'is-grouped',
				'Direct child components/elements of Field will be grouped horizontally (see which ones at the top of the page)',
				false
			),
			getBooleanPropsApi(
				'is-grouped-multiline',
				'Allow controls to fill up multiple lines, making it responsive',
				false
			),
			{
				name: '<code>position</code>',
				description: 'Which position should the addons appear, optional',
				type: 'String',
				values: '<code>is-centered</code>, <code>is-right</code>',
				default: '—',
				required: 'false'
			},
			getBooleanPropsApi('has-addons', 'Field automatically attach controls together', false),
			getBooleanPropsApi('is-horizontal', 'Group label and control on the same line for horizontal forms', false)
		],
		slots: [
			// {
			// 	name: '<code>label</code>',
			// 	description: 'Custom label',
			// 	props: '-'
			// },
			// {
			// 	name: '<code>message</code>',
			// 	description: 'Custom message',
			// 	props: '-'
			// }
		]
	}
];
