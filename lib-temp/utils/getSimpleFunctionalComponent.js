import { h } from 'vue';
import { mergeClasses } from './mergeClasses';
export function getSimpleFunctionalComponent(cls, el = 'div') {
    return function (props, { attrs, slots }) {
        attrs.class = mergeClasses(attrs.class, cls);
        return h(props.tag ?? el, attrs, slots.default ? slots.default() : undefined);
    };
}
//# sourceMappingURL=getSimpleFunctionalComponent.js.map