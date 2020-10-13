import { ComponentApiDescription } from '../../../../../../components/apiView';
import { EqPropApi, getBooleanPropsApi, getUseStaticInputPropsApi } from '../../../../shared/api';

export const apis: ComponentApiDescription[] = [
	{
		title: 'Autocomplete',
		props: [
			{
				name: '<code>v-model</code>',
				description: 'Binding for search value',
				type: 'String',
				values: `-`,
				default: '',
				required: 'false'
			},
			{
				name: '<code>items</code>',
				description: 'Available items for autocomplete',
				type: 'Array',
				values: `-`,
				default: '-',
				required: 'true'
			},
			{
				name: '<code>v-model:selected-items</code>',
				description: 'Binding for selected autocomplete items',
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
				required: 'true'
			},
			getBooleanPropsApi('closeOnSelect', 'Close dropdown on item selection', true),
			getBooleanPropsApi('clearOnSelect', 'Clear search value on item selection', true),
			EqPropApi,
			...getUseStaticInputPropsApi()
		],
		slots: [
			{
				name: 'default',
				description: 'Can be used to override default autocomplete item',
				props: '<code>option: AutocompleteItem<T></code>, <code>index: Number</code>'
			},
			{
				name: '<code>empty</code>',
				description: 'Show like an option if <code>items</code> array prop is empty',
				props: '—'
			},
			{
				name: '<code>header</code>',
				description: 'Show a custom header as first option',
				props: '—'
			},
			{
				name: '<code>footer</code>',
				description: 'Show a custom footer as last option',
				props: '—'
			}
		],
		events: [
			{
				name: '<code>update:model-value</code>',
				description: 'Triggers when search value is changed',
				parameters: '<code>modelValue: Number</code>'
			},
			{
				name: '<code>selected</code>',
				description: 'Triggers when an option is selected or unset',
				parameters: '<code>option: T</code>'
			},
			{
				name: '<code>update:selected-items</code>',
				description: 'Triggers when there is a change to selectedItems',
				parameters: '<code>selectedItems: T[]</code>'
			}
		]
	}
];
