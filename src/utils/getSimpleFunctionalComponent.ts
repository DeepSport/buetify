import { h, FunctionalComponent } from 'vue';
import { Classes, mergeClasses } from './mergeClasses';

export function getSimpleFunctionalComponent(cls: string, el: string = 'div'): FunctionalComponent<{ tag?: string }> {
  return function(props, { attrs, slots }) {
    attrs.class = mergeClasses(attrs.class as Classes, cls)
    return h(props.tag ?? el, attrs, slots.default ? slots.default() : undefined)
  }
}

