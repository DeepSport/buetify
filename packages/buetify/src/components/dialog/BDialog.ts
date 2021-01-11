import 'bulma/sass/components/modal.sass';
import './dialog.sass';
import { head } from 'fp-ts/lib/Array';
import { pipe } from 'fp-ts/lib/function';
import { IO } from 'fp-ts/lib/IO';
import { exists } from 'fp-ts/lib/Option';
import { usePopupController, UsePopupControllerPropsDefinition } from '../../composables/popupController';
import { constEmptyArray, isObject } from '../../utils/helpers';
import BModal from '../modal/BModal';
import BOverlay from '../overlay/BOverlay';
import BDialogContent, { B_DIALOG_CONTENT_NAME } from './BDialogContent';
import { defineComponent, VNode, shallowRef, h, PropType } from 'vue';

function containsBDialogContent(node: any) {
  //eslint-disable-line
  const components = (isObject(node) && (node as any)?.type?.components) || {}; // eslint-disable-line
  for (const k in components) {
    if (components[k]?.name === B_DIALOG_CONTENT_NAME) {
      return true;
    }
  }
  return false;
}

export default defineComponent({
  name: 'b-dialog',
  inheritAttrs: false,
  props: {
    ...UsePopupControllerPropsDefinition,
    showExit: {
      type: Boolean as PropType<boolean>,
      default: true
    },
    isFullscreen: {
      type: Boolean as PropType<boolean>,
      default: false
    }
  },
  setup(props, { attrs, slots }) {
    const generateDialog = shallowRef(constEmptyArray as IO<VNode[]>);
    const popup = usePopupController(props, generateDialog);
    function setIsActive(val: boolean) {
      val ? popup.open() : popup.close();
    }
    generateDialog.value = () => {
      const content = () => {
        const nodes = slots.default ? slots.default(popup) : [];
        const isDialogContent = pipe(head(nodes), exists(containsBDialogContent));
        return isDialogContent
          ? nodes
          : h(
              BDialogContent,
              {
                asCard: false
              },
              {
                header: slots.header ? () => slots.header && slots.header(popup) : undefined,
                default: () => nodes,
                footer: () => slots.footer && slots.footer(popup)
              }
            );
      };

      if (props.isFullscreen) {
        return [
          h(
            BModal,
            {
              isFullscreen: true,
              isActive: popup.isOpen.value,
              'onUpdate:isActive': setIsActive
            },
            content
          )
        ];
      }

      return [
        h(
          BOverlay,
          {
            ...attrs,
            isActive: true,
            onClick: popup.close
          },
          content
        ),
        h('button', { class: 'modal-close is-large', onClick: popup.close })
      ];
    };
    return { popup };
  },
  render() {
    return this.$slots.trigger && this.$slots.trigger(this.popup);
  }
});
