import Vue, { VNode } from 'vue';
import { mergeVNodeStaticClass } from './mergeVNodeStaticClass';
export const getSimpleFunctionalComponent = (cls: string, name: string, el: string = 'div') =>
  Vue.extend({
    name,
    functional: true,
    render(h, { data, children }): VNode {
      data.staticClass = mergeVNodeStaticClass(cls, data.staticClass);
      return h(el, data, children);
    }
  });
