import './dialog.sass';
import { isNonEmpty } from 'fp-ts/lib/Array';
import { pipe } from 'fp-ts/lib/function';
import { IO } from 'fp-ts/lib/IO';
import { head } from 'fp-ts/lib/NonEmptyArray';
import { exists, fromNullable, mapNullable } from 'fp-ts/lib/Option';
import { usePopupController, UsePopupControllerPropsDefinition } from '../../composables/popupController';
import { alwaysEmptyArray } from '../../utils/helpers';
import BDialogContent, { B_DIALOG_CONTENT_NAME } from './BDialogContent';
import BDialogOverlay from './BDialogOverlay';
import { defineComponent, VNode, shallowRef, h } from 'vue';

export default defineComponent({
  name: 'b-dialog',
  props: UsePopupControllerPropsDefinition,
  setup(props, { attrs, slots }) {
    const generateDialog = shallowRef(alwaysEmptyArray as IO<VNode[]>);
    const popup = usePopupController(props, generateDialog);
    generateDialog.value = () => {
      const nodes = slots.default ? slots.default(popup) : [];
      const isDialogContent =
        isNonEmpty(nodes) &&
        pipe(
          head(nodes),
          node => fromNullable(node.component),
          mapNullable(component => component.type.name),
          exists(name => name === B_DIALOG_CONTENT_NAME)
        );
      return [
        h(BDialogOverlay, {
          isActive: true,
          onClose: popup.close,
          slots: {
            default: () =>
              isDialogContent
                ? nodes
                : h(BDialogContent, {
                    ...attrs,
                    slots: {
                      header: () => slots.header && slots.header(popup),
                      default: () => nodes,
                      footer: () => slots.footer && slots.footer(popup)
                    }
                  })
          }
        })
      ];
    };
    return () => (slots.trigger ? slots.trigger(popup) : []);
  }
});
