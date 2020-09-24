import "../../../src/components/dialog/dialog.sass";
import { mergeClasses } from '../../utils/mergeClasses';
import BOverlay from '../overlay/BOverlay';
import { h } from 'vue';
export default function BDialogOverlay(_, {
  attrs,
  slots
}) {
  attrs.class = mergeClasses(attrs.class, 'dialog');
  return h(BOverlay, attrs, slots.default());
}
//# sourceMappingURL=BDialogOverlay.js.map