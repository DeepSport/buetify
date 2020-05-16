import { computed } from 'vue';
import {Param} from '../../types/Param';
import {Transition, TransitionClasses} from '../../types/Transition';
import {isString} from '../../utils/helpers';
import {toRef} from '../../utils/toRef';

export function useTransition(transition: Param<Transition>) {
	const _transition = toRef(transition);
	return computed(() => formatTransition(_transition.value));
}


function formatTransition(transition: Transition): TransitionClasses {
	return isString(transition) ? { name: transition, css: true } : transition;
}
