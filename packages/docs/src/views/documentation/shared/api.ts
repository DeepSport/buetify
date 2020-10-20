import { EventApiDescription, PropApiDescription } from '../../../components/apiView';

export const ColorVariantPropApi: PropApiDescription = {
	name: '<code>variant</code>',
	description: 'Variant (color)',
	type: 'String',
	values: `<code>is-white</code>, <code>is-black</code>, <code>is-light</code>,
                    <code>is-dark</code>, <code>is-primary</code>, <code>is-info</code>, <code>is-success</code>,
                    <code>is-warning</code>, <code>is-danger</code>,
                    and any other colors you've set in the <code>$colors</code> list on Sass`,
	default: '<code>is-primary</code>',
	required: 'false'
};

export const SizeVariantPropApi: PropApiDescription = {
	name: '<code>size</code>',
	description: 'Size variant',
	type: 'String',
	values: `<code>is-small</code>, <code>is-medium</code>, <code>is-large</code>`,
	default: '-',
	required: 'false'
};

export const EqPropApi: PropApiDescription = {
	name: '<code>eq</code>',
	description:
		'An object with a single function <code>equals</code> used to determine equality of two values of same type',
	type: 'Object',
	values: ``,
	default: '<code>eqDeep</code>',
	required: 'false'
};

export function getBooleanPropsApi(name: string, description: string, defaultValue = false): PropApiDescription {
	return {
		name: `<code>${name}</code>`,
		description,
		type: 'Boolean',
		values: `-`,
		default: `<code>${defaultValue}</code>`,
		required: 'false'
	};
}

export function getUseTogglePropsApi(statusName: string, defaultHasPopup = true): PropApiDescription[] {
	return [
		{
			name: `<code>${statusName}</code>`,
			description: 'Toggle status, can be used by parent component to trigger updates',
			type: 'Boolean',
			values: '-',
			default: '<code>false</code>',
			required: 'false'
		},
		{
			name: '<code>has-popup</code>',
			description: 'Used to set <code>aria-haspopup</code> attribute',
			type: 'Boolean',
			values: '-',
			default: `<code>${defaultHasPopup}</code>`,
			required: 'false'
		}
	];
}

export function getUseToggleEventsApi(statusName: string): EventApiDescription[] {
	return [
		{
			name: '<code>toggle</code>',
			description: 'Toggle event',
			parameters: '<code>status: boolean</code>'
		},
		{
			name: '<code>setOn</code>',
			description: `<code>${statusName}</code> set to <code>true</code>`,
			parameters: '-'
		},
		{
			name: '<code>setOff</code>',
			description: `<code>${statusName}</code> set to <code>false</code>`,
			parameters: '-'
		}
	];
}

export function getUseTransitionPropsApi(defaultTransition: string): PropApiDescription {
	return {
		name: `<code>transition</code>`,
		description: 'Toggle status, can be used by parent component to trigger updates',
		type: '[Object, string]',
		values: '-',
		default: `<code>${defaultTransition}</code>`,
		required: 'false'
	};
}

export function getUseStaticInputPropsApi(): PropApiDescription[] {
	return [
		{ ...ColorVariantPropApi, default: '-' },
		SizeVariantPropApi,
		{
			name: '<code>type</code>',
			description: 'Type attribute for input',
			type: 'String',
			values: `-`,
			default: '-',
			required: 'false'
		},
		{
			name: '<code>autocomplete</code>',
			description: 'Autocomplete attribute for input',
			type: 'String',
			values: `-`,
			default: '-',
			required: 'false'
		},
		{
			name: '<code>placeholder</code>',
			description: 'Placeholder attribute for input',
			type: 'String',
			values: `-`,
			default: '-',
			required: 'false'
		},
		{
			name: '<code>type</code>',
			description: 'Type attribute for input',
			type: 'String',
			values: `-`,
			default: '-',
			required: 'false'
		},
		getBooleanPropsApi('is-rounded', 'Use rounded input'),
		getBooleanPropsApi('is-expanded', 'Expand input to take up all available space'),
		getBooleanPropsApi('is-loading', 'Show loading indicator'),
		getBooleanPropsApi('is-required', 'Make input required', true),
		{
			name: '<code>icon</code>',
			description: 'Icon component to display in left icon position',
			type: '[Function, Object]',
			values: `-`,
			default: '-',
			required: 'false'
		},
		{
			name: '<code>maxlength</code>',
			description: 'maxlength attribute for input',
			type: '[String, Number]',
			values: `-`,
			default: '-',
			required: 'false'
		},
		getBooleanPropsApi(
			'use-password-reveal',
			'Show toggle to make password visible to user, defaults to <code>true</code> if type is <code>password</code>, false otherwise',
			false
		),
		getBooleanPropsApi('use-native-validation', 'Use native platform input validation', true),
		{
			name: '<code>v-model:is-valid</code>',
			description: 'Binding for <code>is-valid</code>',
			type: 'Boolean',
			values: `-`,
			default: 'true',
			required: 'false'
		}
	];
}
