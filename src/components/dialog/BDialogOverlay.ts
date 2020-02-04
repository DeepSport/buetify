import './dialog.sass';
import BOverlay from '../overlay/BOverlay';
import { mergeVNodeStaticClass } from '../../utils/mergeVNodeStaticClass';
import Vue, { VNode } from 'vue';

export default Vue.extend({
  name: 'BDialogOverlay',
  functional: true,
  render(h, { data, children }): VNode {
    data.staticClass = mergeVNodeStaticClass('dialog', data.staticClass);
    return h(BOverlay, data, children);
  }
});
