import './dialog.sass';
import { Classes, mergeClasses } from '../../utils/mergeClasses';
import BOverlay from '../overlay/BOverlay';
import { h, SetupContext } from 'vue';

export default function BDialogOverlay(_: any, { attrs, slots }: SetupContext) {
  attrs.class = mergeClasses(attrs.class as Classes, 'dialog');
  return h(BOverlay, attrs, slots.default!());
}
