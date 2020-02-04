import 'bulma/sass/components/navbar.sass';
import { mergeVNodeStaticClass } from '../../utils/mergeVNodeStaticClass';
import Vue, { VNode } from 'vue';

export default Vue.extend({
  name: 'BNavbarItem',
  functional: true,
  props: {
    tag: {
      type: String,
      required: false,
      default: 'a'
    }
  },
  render(h, { props, data, children }): VNode {
    data.staticClass = mergeVNodeStaticClass('navbar-item', data.staticClass);
    return h(props.tag, data, children);
  }
});
