import { h, Transition, TransitionGroup } from 'vue';
export function createJavascriptTransition(name, functions, mode = 'in-out') {
    return (props, { attrs, slots }) => {
        return h(Transition, {
            css: false,
            mode: props.mode ?? mode,
            ...functions,
            ...attrs
        }, slots.default && slots.default());
    };
}
export function createJavascriptTransitionGroup(name, functions, mode = 'in-out') {
    return (props, { attrs, slots }) => {
        return h(TransitionGroup, {
            css: false,
            mode: props.mode ?? mode,
            ...functions,
            ...attrs
        }, slots.default && slots.default());
    };
}
//# sourceMappingURL=createJavascriptTransition.js.map