import { h, Transition, TransitionGroup } from 'vue';
export function createJavascriptTransition(name, functions, mode = 'in-out') {
  return (props, {
    attrs,
    slots
  }) => {
    return h(Transition, {
      mode: props.mode ?? mode,
      ...functions,
      ...attrs
    }, slots.default);
  };
}
export function createJavascriptTransitionGroup(name, functions, mode = 'in-out') {
  return (props, {
    attrs,
    slots
  }) => {
    return h(TransitionGroup, {
      mode: props.mode ?? mode,
      ...functions,
      ...attrs
    }, slots.default);
  };
}
//# sourceMappingURL=createJavascriptTransition.js.map