import {ComponentApiDescription} from '../../../../../../components/apiView';
import {EqPropApi, getBooleanPropsApi, getUseStaticInputPropsApi} from '../../../../shared/api';

export const apis: ComponentApiDescription[] = [
	{
		title: 'Select',
		props: [
			{
				name: '<code>v-model</code>',
				description: 'Binding for selected value(s)',
				type: 'Any',
				values: `-`,
				default: '',
				required: 'false'
			},
			{
				name: '<code>items</code>',
				description: 'Available items for select',
				type: 'Array',
				values: `-`,
				default: '-',
				required: 'true'
			},
			{
				name: '<code>itemText</code>',
				description: 'Keyof item or function from item to string',
				type: '[String, Function]',
				values: `-`,
				default: '<code>text</code>',
				required: 'false'
			},
			{
				name: '<code>itemFilter</code>',
				description: 'Function that takes in current search value and returns a predicate for an item',
				type: 'Function',
				values: `-`,
				default: '-',
				required: 'false'
			},
			{
				name: '<code>itemId</code>',
				description: 'Keyof item or function from item to string',
				type: '[String, Function]',
				values: `-`,
				default: '<code>id</code>',
				required: 'false'
			},
			{
				name: '<code>itemDisabled</code>',
				description: 'Keyof item or function from item to string',
				type: '[String, Function]',
				values: `-`,
				default: '<code>isDisabled</code>',
				required: 'false'
			},
			EqPropApi,
			...getUseStaticInputPropsApi()
		],
		slots: [
			{
				name: '<code>placeholder</code>',
				description: 'Can be used to provide a placeholder item',
				props: '-'
			},
			{
				name: '<code>default</code>',
				description: 'Can be used to override slot within option',
				props: '<code>item: SelectItem<T>, index: number</code>'
			},
			{
				name: '<code>option</code>',
				description: 'Show a custom option, overrides entire BSelect option',
				props: '<code>item: SelectItem<T>, index: number</code>'
			}
		],
		events: [
			{
				name: '<code>update:model-value</code>',
				description: 'Triggers when selected item(s) is changed',
				parameters: '<code>modelValue: T</code>'
			}
		]
	}
];
