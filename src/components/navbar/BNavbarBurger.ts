import 'bulma/sass/components/navbar.sass';
import { replicate } from 'fp-ts/lib/Array';
import Vue, { VNode } from 'vue';
import { mergeVNodeClasses } from '../../utils/mergeVNodeClasses';
import { mergeVNodeStaticClass } from '../../utils/mergeVNodeStaticClass';

export default Vue.extend({
  name: 'BNavbarBurger',
  functional: true,
  props: {
    tag: {
      type: String,
      required: false,
      default: 'a'
    },
    isActive: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  render(h, { data, props }): VNode {
    data.staticClass = mergeVNodeStaticClass('navbar-burger', data.staticClass);
    data.class = mergeVNodeClasses(data.class, { 'is-active': props.isActive });
    data.attrs = {
      role: 'button',
      'aria-expanded': props.isActive
    };
    const hamburgerLine = h('span', { attrs: { 'aria-hidden': true } });
    return h(props.tag, data, replicate(3, hamburgerLine));
  }
});
