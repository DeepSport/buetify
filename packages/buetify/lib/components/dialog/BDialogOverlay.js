import 'bulma/sass/components/modal.sass';
import "../../../src/components/dialog/dialog.sass";
import BOverlay from '../overlay/BOverlay';
import { h } from 'vue';
export default function BDialogOverlay(_, {
  attrs,
  slots
}) {
  return h(BOverlay, { ...attrs,
    class: 'dialog'
  }, slots.default());
}
//# sourceMappingURL=BDialogOverlay.js.map