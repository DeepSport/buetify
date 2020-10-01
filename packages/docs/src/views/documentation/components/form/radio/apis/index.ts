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
		title: 'Radio',
		props: [
			{
				name: '<code>v-model</code>',
				description: 'Binding value',
				type: 'Boolean',
				values: `-`,
				default: '',
				required: 'false'
			},
			{
				name: '<code>native-value</code>',
				description: 'Same as native <code>value</code>',
				type: 'Any',
				values: '—',
				default: '—',
				required: 'false'
			},
			{
				name: '<code>true-value</code>',
				description: `Overrides the returned value when it's checked`,
				type: 'Any',
				values: '—',
				default: '<code>true</code>',
				required: 'false'
			},
			{
				name: '<code>false-value</code>',
				description: `Overrides the returned value when it's not checked`,
				type: 'Any',
				values: '—',
				default: '<code>false</code>',
				required: 'false'
			},
			{
				name: '<code>is-disabled</code>',
				description: 'Same as native <code>disabled</code>',
				type: 'Boolean',
				values: '—',
				default: '<code>false</code>',
				required: 'false'
			},
			{
				name: '<code>is-required</code>',
				description: 'Same as native <code>required</code>',
				type: 'Boolean',
				values: '—',
				default: '<code>false</code>',
				required: 'false'
			},
			{
				name: '<code>name</code>',
				description: 'Same as native <code>name</code>',
				type: 'String',
				values: '—',
				default: '—',
				required: 'false'
			},
			SizeVariantPropApi,
			ColorVariantPropApi
		],
		slots: [
			{
				name: 'default',
				description: 'Label text',
				props: '-'
			}
		],
		events: [
			{
				name: '<code>update:model-value</code>',
				description: 'Triggers when checked value is changed',
				parameters: '<code>modelValue: T</code>'
			}
		]
	}
];
