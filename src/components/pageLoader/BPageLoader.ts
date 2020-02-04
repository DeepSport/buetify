import './pageloader.sass';
import { mergeVNodeStaticClass } from '../../utils/mergeVNodeStaticClass';
import { isObject } from '../../utils/helpers';
import Vue, { VNode } from 'vue';
export default Vue.extend({
  name: 'BPageLoader',
  functional: true,
  props: {
    text: {
      type: String,
      required: false
    }
  },
  render(h, { data, props }): VNode {
    data.staticClass = mergeVNodeStaticClass('b-pageloader is-active', data.staticClass);
    data.attrs = isObject(data.attrs) ? { ...data.attrs, 'data-content': props.text } : { 'data-content': props.text };
    return h('div', data);
  }
});
