import './bordered-box.sass';
import { ColorVariant } from '../../../types/ColorVariants';
import { mergeVNodeClasses } from '../../../utils/mergeVNodeClasses';
import { mergeVNodeStaticClass } from '../../../utils/mergeVNodeStaticClass';
import Vue, { PropType, VNode } from 'vue';

export default Vue.extend({
  name: 'BBorderedBox',
  functional: true,
  props: {
    variant: {
      type: String as PropType<ColorVariant>,
      default: 'is-primary'
    },
    tag: {
      type: String,
      default: 'div'
    }
  },
  render(h, { data, props, injections, children }): VNode {
    data.staticClass = mergeVNodeStaticClass('b-bordered-box', data.staticClass);
    data.class = mergeVNodeClasses(data.class, props.variant);
    return h(props.tag, data, children);
  }
});
