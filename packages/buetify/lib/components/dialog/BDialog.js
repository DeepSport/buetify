import 'bulma/sass/components/modal.sass';
import "../../../src/components/dialog/dialog.sass";
import { head } from 'fp-ts/lib/Array';
import { pipe } from 'fp-ts/lib/function';
import { exists } from 'fp-ts/lib/Option';
import { usePopupController, UsePopupControllerPropsDefinition } from '../../composables/popupController';
import { constEmptyArray, isObject } from '../../utils/helpers';
import BOverlay from '../overlay/BOverlay';
import BDialogContent, { B_DIALOG_CONTENT_NAME } from './BDialogContent';
import { defineComponent, shallowRef, h } from 'vue';

function containsBDialogContent(node) {
  const components = isObject(node) && node?.type?.components || {};

  for (const k in components) {
    if (components[k]?.name === B_DIALOG_CONTENT_NAME) {
      return true;
    }
  }

  return false;
}

export default defineComponent({
  name: 'b-dialog',
  props: UsePopupControllerPropsDefinition,

  setup(props, {
    attrs,
    slots
  }) {
    const generateDialog = shallowRef(constEmptyArray);
    const popup = usePopupController(props, generateDialog);

    generateDialog.value = () => {
      return [h(BOverlay, { ...attrs,
        class: 'dialog',
        isActive: true,
        onClick: popup.close
      }, () => {
        const nodes = slots.default ? slots.default(popup) : [];
        const isDialogContent = pipe(head(nodes), exists(containsBDialogContent));
        return isDialogContent ? nodes : h(BDialogContent, {
          asCard: false
        }, {
          header: slots.header ? () => slots.header && slots.header(popup) : undefined,
          default: () => nodes,
          footer: () => slots.footer && slots.footer(popup)
        });
      })];
    };

    return {
      popup
    };
  },

  render() {
    return this.$slots.trigger && this.$slots.trigger(this.popup);
  }

});
//# sourceMappingURL=BDialog.js.map