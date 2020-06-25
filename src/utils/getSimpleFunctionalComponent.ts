import { h, SetupContext } from 'vue';
import { Classes, mergeClasses } from './mergeClasses';

export function getSimpleFunctionalComponent(cls: string, el: string = 'div') {
  return function(props: { tag?: string }, { attrs, slots }: SetupContext) {
    attrs.class = mergeClasses(attrs.class as Classes, cls);
    return h(props.tag ?? el, attrs, slots.default ? slots.default() : undefined);
  };
}
