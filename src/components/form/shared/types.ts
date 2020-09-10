import { ConcreteComponent, defineAsyncComponent } from 'vue';

export interface InputIcons {
	isSuccess: ConcreteComponent;
	isDanger: ConcreteComponent;
	isWarning: ConcreteComponent;
	isInfo: ConcreteComponent;
	passwordVisible: ConcreteComponent;
	passwordInvisible: ConcreteComponent;
}

export const DEFAULT_INPUT_ICONS: InputIcons = {
	isSuccess: defineAsyncComponent(() => import('../../icons/check')),
	isDanger: defineAsyncComponent(() => import('../../icons/exclamationCircle')),
	isInfo: defineAsyncComponent(() => import('../../icons/infoCircle')),
	isWarning: defineAsyncComponent(() => import('../../icons/exclamationTriangle')),
	passwordInvisible: defineAsyncComponent(() => import('../../icons/eye')),
	passwordVisible: defineAsyncComponent(() => import('../../icons/eyeSlash'))
};

export function getInputIcons(icons: Partial<InputIcons>): InputIcons {
	return {
		...DEFAULT_INPUT_ICONS,
		...icons
	};
}

export interface NumberInputIcons {
	minus: ConcreteComponent;
	plus: ConcreteComponent;
}

export const DEFAULT_NUMBER_INPUT_ICONS: NumberInputIcons = {
	minus: defineAsyncComponent(() => import('../../icons/minus')),
	plus: defineAsyncComponent(() => import('../../icons/plus'))
};

export function getNumberInputIcons(icons: Partial<NumberInputIcons>): NumberInputIcons {
	return {
		...DEFAULT_NUMBER_INPUT_ICONS,
		...icons
	};
}
