import 'bulma/sass/components/modal.sass';
import './dialog.sass';
import BOverlay from '../overlay/BOverlay';
import { h, SetupContext } from 'vue';

export default function BDialogOverlay(_: any, { attrs, slots }: SetupContext) {
  return h(BOverlay, { ...attrs, class: 'dialog' }, slots.default!());
}
