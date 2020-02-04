import './slide-right-transition.sass';
import Vue, { VNode } from 'vue';
export default Vue.extend({
  name: 'SlideRightTransition',
  functional: true,
  render(h, { children }): VNode {
    return h('transition', { attrs: { name: 'slide-right', css: true } }, children);
  }
});
