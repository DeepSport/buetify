import { constant } from 'fp-ts/lib/function';
import { computed, PropType, ExtractPropTypes } from 'vue';
import {Transition, TransitionClasses} from '../../types/Transition';
import {isString} from '../../utils/helpers';

export function getUseTransitionPropsDefinition(transition: Transition) {
	return {
		transition: {
			type: [Object, String] as PropType<Transition>,
			default: constant(transition),
			required: false
		}
	}
}

export type UserTransitionProps = ExtractPropTypes<ReturnType<typeof getUseTransitionPropsDefinition>>;

export const FadeTransitionPropsDefinition = getUseTransitionPropsDefinition('fade');

export function formatTransition(transition: Transition): TransitionClasses {
	return isString(transition) ? { name: transition, css: true } : transition;
}

export function useTransition(props: UserTransitionProps) {
	return computed(() => formatTransition(props.transition));
}

