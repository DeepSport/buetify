import { VNode } from 'vue';
import {IO} from 'fp-ts/lib/IO';
import {Component, ExtractPropTypes, PropType, Ref, shallowRef} from 'vue';
import {none, Option} from 'fp-ts/lib/Option';
import {ColorVariant} from '../../types/ColorVariants';

export const STEPS_SYMBOL = Symbol('steps')

export interface BStepItemData {
	props: BStepItemProps;
	render: IO<VNode[]>;
}

export interface StepInjection {
	steps: Ref<BStepItemData[]>;
	activeLabel: Ref<Option<string>>;
}

export const DEFAULT_STEP_INJECTION: StepInjection = {
	steps: shallowRef([]),
	activeLabel: shallowRef(none)
};

export const BStepItemPropsDefinition = {
	label: {
		type: String as PropType<string>,
		required: true as const
	},
	variant: {
		type: String as PropType<ColorVariant>,
		default: '' as const
	},
	icon: {
		type: Function as PropType<Component>,
	},
	isClickable: {
		type: Boolean as PropType<boolean>,
		default: false
	},
	isCompleted: {
		type: Boolean as PropType<boolean>,
		default: false
	},
	isVisible: {
		type: Boolean as PropType<boolean>,
		default: true
	}
}

export type BStepItemProps = ExtractPropTypes<typeof BStepItemPropsDefinition>;
