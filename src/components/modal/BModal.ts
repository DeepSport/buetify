import './modal.sass';
import { IO } from 'fp-ts/lib/IO';
import {
  PopupController,
  usePopupController,
  UsePopupControllerPropsDefinition
} from '../../composables/popupController';
import { constEmptyArray } from '../../utils/helpers';
import BOverlay from '../overlay/BOverlay';
import BBox from '../layout/box/BBox';
import { VNode, defineComponent, PropType, SetupContext, shallowRef, h, ExtractPropTypes } from 'vue';

const BModalPropsDefinition = {
  ...UsePopupControllerPropsDefinition,
  showExit: {
    type: Boolean as PropType<boolean>,
    required: false,
    default: false
  }
};

export type BModalProps = ExtractPropTypes<typeof BModalPropsDefinition>;

function generateCloseButton(close: IO<void>): VNode {
  return h('button', {
    class: 'modal-exit delete is-small',
    onClick: close
  });
}

function generateModalBox(props: BModalProps, context: SetupContext, controller: PopupController): VNode {
  return h(
    BBox,
    {
      class: 'is-paddingless is-fullheight is-fullwidth overflow-scroll'
    },
    () => [
      h('div', { class: 'is-fullheight' }, () =>
        props.showExit ? [generateCloseButton(controller.close), context.slots.default!()] : context.slots.default!()
      )
    ]
  );
}

export default defineComponent({
  name: 'b-modal',
  props: BModalPropsDefinition,
  setup(props, context) {
    const generateModal = shallowRef(constEmptyArray as IO<VNode[]>);
    const popup = usePopupController(props, generateModal);
    generateModal.value = () => {
      return [
        h(
          BOverlay,
          {
            ...context.attrs,
            onClick: popup.close
          },
          () => [generateModalBox(props, context, popup)]
        )
      ];
    };
    return { popup };
  },
  render() {
    return this.$slots.trigger && this.$slots.trigger(this.popup);
  }
});
