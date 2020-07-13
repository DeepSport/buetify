import { h, Transition, TransitionGroup } from 'vue';
export function createJavascriptTransition(name, functions, mode = 'in-out') {
    return (props, { attrs, slots }) => {
        var _a;
        return h(Transition, Object.assign(Object.assign({ css: false, mode: (_a = props.mode) !== null && _a !== void 0 ? _a : mode }, functions), attrs), slots.default && slots.default());
    };
}
export function createJavascriptTransitionGroup(name, functions, mode = 'in-out') {
    return (props, { attrs, slots }) => {
        var _a;
        return h(TransitionGroup, Object.assign(Object.assign({ css: false, mode: (_a = props.mode) !== null && _a !== void 0 ? _a : mode }, functions), attrs), slots.default && slots.default());
    };
}
//# sourceMappingURL=createJavascriptTransition.js.map