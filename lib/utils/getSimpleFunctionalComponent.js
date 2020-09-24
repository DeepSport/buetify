import { h } from 'vue';
import { mergeClasses } from './mergeClasses';
export function getSimpleFunctionalComponent(cls, el = 'div') {
  return function (props, {
    attrs,
    slots
  }) {
    var _a;

    attrs.class = mergeClasses(attrs.class, cls);
    return h((_a = props.tag) !== null && _a !== void 0 ? _a : el, attrs, slots.default ? slots.default() : undefined);
  };
}
//# sourceMappingURL=getSimpleFunctionalComponent.js.map