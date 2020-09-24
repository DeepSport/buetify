import { constant } from 'fp-ts/lib/function';
import { computed } from 'vue';
import { isString } from '../../utils/helpers';
export function getUseTransitionPropsDefinition(transition) {
  return {
    transition: {
      type: [Object, String],
      default: constant(transition),
      required: false
    }
  };
}
export const FadeTransitionPropsDefinition = getUseTransitionPropsDefinition('fade');
export function formatTransition(transition) {
  return isString(transition) ? {
    name: transition,
    css: true
  } : transition;
}
export function useTransition(props) {
  return computed(() => formatTransition(props.transition));
}
//# sourceMappingURL=useTransition.js.map