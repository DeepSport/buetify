import { constant } from 'fp-ts/lib/function';
import { defineAsyncComponent, PropType, ExtractPropTypes, Component, computed } from 'vue';
import { AllColorsVariant } from '../../types/ColorVariants';
import { getUseTogglePropsDefinition, useToggle } from '../toggle';

export type MessageSize = 'is-small' | 'is-medium' | 'is-large' | '';

export type MessageIcons = {
	[K in AllColorsVariant]: Component;
};

const DEFAULT_MESSAGE_ICONS: Partial<MessageIcons> = {
	'is-info': defineAsyncComponent(() => import('../../components/icons/infoCircle')),
	'is-success': defineAsyncComponent(() => import('../../components/icons/checkCircle')),
	'is-warning': defineAsyncComponent(() => import('../../components/icons/exclamationTriangle')),
	'is-danger': defineAsyncComponent(() => import('../../components/icons/exclamationCircle'))
};

export function getMessageIcons(icons: Partial<MessageIcons>) {
	return {
		...DEFAULT_MESSAGE_ICONS,
		...icons
	};
}

export const UseMessagePropsDefinition = {
	...getUseTogglePropsDefinition('isActive'),
	title: {
		type: String as PropType<string>
	},
	isClosable: {
		type: Boolean,
		default: true
	},
	message: {
		type: String as PropType<string>
	},
	variant: {
		type: String as PropType<AllColorsVariant>,
		default: '' as const
	},
	size: {
		type: String as PropType<MessageSize>,
		default: '' as const
	},
	iconSize: {
		type: String as PropType<MessageSize>,
		default: '' as const
	},
	useAutoClose: {
		type: Boolean as PropType<boolean>,
		default: false
	},
	duration: {
		type: Number as PropType<number>,
		default: 2000
	},
	useIcon: {
		type: Boolean as PropType<boolean>,
		default: false
	},
	icons: {
		type: Object as PropType<Partial<MessageIcons>>,
		default: constant(DEFAULT_MESSAGE_ICONS)
	}
};

export type UseMessageProps = ExtractPropTypes<typeof UseMessagePropsDefinition>;

export function useMessage(props: UseMessageProps) {
	const toggle = useToggle(props, 'isActive');
	const icon = computed(() => props.icons[props.variant]);
	const iconSize = computed(() => props.iconSize || props.size || 'is-large');
	function setAutoClose() {
		if (props.useAutoClose) {
			setTimeout(() => {
				if (toggle.isOn.value) {
					toggle.setOff();
				}
			}, props.duration);
		}
	}
	return {
		...toggle,
		icon,
		iconSize,
		setAutoClose
	};
}

export type Message = ReturnType<typeof useMessage>;
