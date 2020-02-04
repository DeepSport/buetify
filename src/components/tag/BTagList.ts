import './tag.sass';
import { mergeVNodeClasses } from '../../utils/mergeVNodeClasses';
import { mergeVNodeStaticClass } from '../../utils/mergeVNodeStaticClass';
import Vue, { VNode } from 'vue';
export default Vue.extend({
  name: 'BTagList',
  functional: true,
  props: {
    isAttached: Boolean,
    tag: {
      type: [String, Function],
      required: false,
      default: 'div'
    }
  },
  render(h, { data, props, children }): VNode {
    data.staticClass = mergeVNodeStaticClass('tags', data.staticClass);
    data.class = mergeVNodeClasses(data.class, {
      'has-addons': props.isAttached
    });
    return h(props.tag, data, children);
  }
});
