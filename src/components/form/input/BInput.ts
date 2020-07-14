import '../sass/form.sass';
import { getUseInputPropsDefinition, Input, useInput, UseInputProps } from '../../../composables/input/useInput';
import { DefaultThemePropsDefinition, useTheme } from '../../../composables/theme/useTheme';
import { Toggle } from '../../../composables/toggle';
import { ColorVariant } from '../../../types/ColorVariants';
import { SizeVariant } from '../../../types/SizeVariants';
import { isNumber, isString } from '../../../utils/helpers';
import { constant } from 'fp-ts/lib/function';
import { VNode } from 'vue';
import { DEFAULT_INPUT_ICONS, InputIcons } from '../shared/types';
import { Component, defineComponent, PropType, shallowRef, h, Ref, computed, SetupContext, shallowReactive } from 'vue';

export function getBInputPropsDefinition<T>() {
	return {
		...getUseInputPropsDefinition<T>(),
		...DefaultThemePropsDefinition,
		isLoading: {
			type: Boolean as PropType<boolean>,
			default: false
		},
		hasCounter: {
			type: Boolean,
			default: true
		},
		customInputClass: {
			type: String,
			default: ''
		},
		inputIcons: {
			type: Object as PropType<InputIcons>,
			required: false,
			default: constant(DEFAULT_INPUT_ICONS)
		}
	};
}

function getIconPosition(leftIcon: ConcreteComponent | undefined, rightIcon: ConcreteComponent | undefined): string {
	if (leftIcon && rightIcon) {
		return 'has-icons-left has-icons-right';
	} else if (rightIcon) {
		return 'has-icons-right';
	} else if (leftIcon) {
		return 'has-icons-left';
	} else {
		return '';
	}
}

function getRightIcon(
	icons: InputIcons,
	variant: ColorVariant,
	usePasswordReveal: boolean,
	passwordIsVisible: boolean
) {
	if (usePasswordReveal) {
		return passwordIsVisible ? icons.passwordVisible : icons.passwordInvisible;
	} else {
		switch (variant) {
			case 'is-danger':
				return icons.isDanger;
			case 'is-info':
				return icons.isInfo;
			case 'is-success':
				return icons.isSuccess;
			case 'is-warning':
				return icons.isWarning;
			default:
				return undefined;
		}
	}
}

function generateLeftIcon(icon: ConcreteComponent, size: SizeVariant): VNode {
	return h(icon, {
		class: 'is-left',
		size
	});
}

function generateRightIcon(
	icon: ConcreteComponent,
	size: SizeVariant,
	variant: ColorVariant,
	usePasswordReveal: boolean,
	passwordToggle: Toggle
): VNode {
	return h(icon, {
		class: ['is-right', { 'is-clickable': usePasswordReveal }],
		variant,
		size,
		...passwordToggle.attrs.value,
		...passwordToggle.listeners
	});
}

function generateCounter(isFocused: boolean, valueLength: number, maxLength: number | string): VNode {
	return h(
		'small',
		{
			class: ['help counter', { 'is-invisible': !isFocused }]
		},
		`${valueLength} / ${maxLength}`
	);
}

function getAutocomplete(autocomplete: undefined | Ref<string | undefined>, type: string | undefined) {
	if (autocomplete && autocomplete.value) {
		return autocomplete.value;
	} else {
		switch (type) {
			case 'email':
				return 'email';
			case 'password':
				return 'password';
			default:
				return undefined;
		}
	}
}

function getInputClasses(
	size: string,
	isExpanded: boolean,
	isLoading: boolean,
	hasMessage: boolean,
	leftIcon: ConcreteComponent | undefined,
	rightIcon: ConcreteComponent | undefined,
	themeClasses: string[]
) {
	return [
		...themeClasses,
		getIconPosition(leftIcon, rightIcon),
		size,
		{
			'is-expanded': isExpanded,
			'is-loading': isLoading,
			'is-clearfix': !hasMessage
		}
	];
}

function generateNonTextInput(
	inputRef: Ref<HTMLInputElement>,
	inputData: Input,
	isLoading: boolean,
	rightIcon: ConcreteComponent | undefined,
	context: SetupContext,
	themeClasses: string[]
): VNode {
	const hasMessage = !!inputData.message.value;
	const type = inputData.type ? inputData.type.value : inputData.usePasswordReveal.value ? 'password' : undefined;
	return h('input', {
		...context.attrs,
		ref: inputRef,
		class: [
			'input',
			...getInputClasses(
				inputData.iconSize.value,
				inputData.isExpanded.value,
				isLoading,
				hasMessage,
				inputData.icon && inputData.icon.value,
				rightIcon,
				themeClasses
			)
		],
		value: inputData.modelValue.value,
		onInput: inputData.onNativeInput,
		type: inputData.type ? inputData.type.value : undefined,
		autocomplete: getAutocomplete(inputData.autocomplete, type),
		maxlength: inputData.maxlength && inputData.maxlength.value,
		placeholder: inputData.placeholder && inputData.placeholder.value,
		onBlur: inputData.onBlur,
		onFocus: inputData.onFocus,
		required: inputData.isRequired.value,
		readonly: inputData.isReadonly.value,
		disabled: inputData.isDisabled.value,
		tabindex: inputData.isDisabled.value ? -1 : 0,
		id: inputData.id.value
	});
}

function generateTextarea(
	inputRef: Ref<HTMLInputElement>,
	inputData: Input,
	isLoading: boolean,
	rightIcon: ConcreteComponent | undefined,
	context: SetupContext,
	themeClasses: string[]
): VNode {
	const hasMessage = !!inputData.message.value;
	return h('textarea', {
		...context.attrs,
		ref: inputRef,
		class: [
			'textarea',
			...getInputClasses(
				inputData.iconSize.value,
				inputData.isExpanded.value,
				isLoading,
				hasMessage,
				inputData.icon && inputData.icon.value,
				rightIcon,
				themeClasses
			)
		],
		value: inputData.modelValue.value,
		onInput: inputData.onNativeInput,
		maxlength: inputData.maxlength && inputData.maxlength.value,
		placeholder: inputData.placeholder && inputData.placeholder.value,
		onBlur: inputData.onBlur,
		onFocus: inputData.onFocus,
		required: inputData.isRequired.value,
		readonly: inputData.isReadonly.value,
		disabled: inputData.isDisabled.value,
		tabindex: inputData.isDisabled.value ? -1 : 0,
		id: inputData.id.value
	});
}
function generateInput(
	inputRef: Ref<HTMLInputElement>,
	inputData: Input,
	isLoading: boolean,
	rightIcon: ConcreteComponent | undefined,
	context: SetupContext,
	themeClasses: string[]
): VNode {
	const type = inputData.type && inputData.type.value;
	return type === 'textarea'
		? generateTextarea(inputRef, inputData, isLoading, rightIcon, context, themeClasses)
		: generateNonTextInput(inputRef, inputData, isLoading, rightIcon, context, themeClasses);
}

function getValueLength(modelValue: unknown) {
	if (isString(modelValue)) {
		return modelValue.length;
	} else if (isNumber(modelValue)) {
		return modelValue.toString().length;
	}
	return 0;
}

export function defineInput<T>() {
  return defineComponent({
    name: 'b-input',
    props: getBInputPropsDefinition<T>(),
    setup(props, context: SetupContext) {
      const inputRef = shallowRef((null as unknown) as HTMLInputElement);
      const inputData = useInput(props as UseInputProps<T>, inputRef);
      const passwordToggle = useToggle(shallowReactive({ isVisible: false, hasPopup: false }), 'isVisible');
      const rightIcon = computed(() =>
        getRightIcon(
          props.inputIcons,
          inputData.messageVariant.value,
          props.usePasswordReveal,
          passwordToggle.isOn.value
        )
      );
      const useCounter = computed(
        () =>
          (inputData.type === undefined || (inputData.modelValue && typeof inputData.modelValue.value !== 'number')) &&
          !!inputData.maxlength &&
          props.hasCounter
      );
			return () => {
				const nodes: VNode[] = [
					generateInput(
						inputRef,
						inputData as Input,
						props.isLoading,
						rightIcon.value,
						context,
						themeClasses.value
					)
				];
				if (inputData.icon && inputData.icon.value) {
					nodes.push(generateLeftIcon(inputData.icon.value, inputData.iconSize.value));
				}
				if (rightIcon.value) {
					nodes.push(
						generateRightIcon(
							rightIcon.value,
							inputData.iconSize.value,
							inputData.messageVariant.value,
							props.usePasswordReveal,
							inputData.passwordToggle
						)
					);
				}
				if (useCounter.value && inputData.maxlength && inputData.maxlength.value !== undefined) {
					nodes.push(
						generateCounter(
							inputData.isFocused.value,
							getValueLength(inputData.modelValue.value),
							inputData.maxlength.value
						)
					);
				}
				return h(
					'div',
					{
						class: [
							'control',
							getInputClasses(
								props.size,
								inputData.isExpanded.value,
								props.isLoading,
								!!inputData.message.value,
								inputData.icon && inputData.icon.value,
								rightIcon.value,
								themeClasses.value
							)
						]
					},
					nodes
				);
			};
		}
	});
}

// eslint-disable-next-line
export const BInput = defineInput<any>();
