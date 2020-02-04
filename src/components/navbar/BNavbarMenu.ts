import 'bulma/sass/components/navbar.sass';
import { mergeVNodeClasses } from '../../utils/mergeVNodeClasses';
import { mergeVNodeStaticClass } from '../../utils/mergeVNodeStaticClass';
import Vue, { VNode } from 'vue';
export default Vue.extend({
  name: 'BNavbarMenu',
  functional: true,
  props: {
    isActive: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  render(h, { data, props, children }): VNode {
    data.staticClass = mergeVNodeStaticClass('navbar-menu', data.staticClass);
    if (props.isActive) {
      data.class = mergeVNodeClasses(data.class, 'is-active');
    }
    return h('div', data, children);
  }
});
