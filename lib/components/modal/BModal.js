import "../../../src/components/modal/modal.sass";
import { usePopupController, UsePopupControllerPropsDefinition } from '../../composables/popupController';
import { alwaysEmptyArray } from '../../utils/helpers';
import BOverlay from '../overlay/BOverlay';
import BBox from '../layout/box/BBox';
import { defineComponent, shallowRef, h } from 'vue';
const BModalPropsDefinition = Object.assign(Object.assign({}, UsePopupControllerPropsDefinition), {
  showExit: {
    type: Boolean,
    required: false,
    default: false
  }
});

function generateCloseButton(close) {
  return h('button', {
    class: 'modal-exit delete is-small',
    onClick: close
  });
}

function generateModalBox(props, context, controller) {
  return h(BBox, {
    class: 'is-paddingless is-fullheight is-fullwidth overflow-scroll'
  }, [h('div', {
    class: 'is-fullheight'
  }, () => props.showExit ? [generateCloseButton(controller.close), context.slots.default()] : context.slots.default())]);
}

export default defineComponent({
  name: 'b-modal',
  props: BModalPropsDefinition,

  setup(props, context) {
    const generateModal = shallowRef(alwaysEmptyArray);
    const popup = usePopupController(props, generateModal);

    generateModal.value = () => {
      return [h(BOverlay, Object.assign(Object.assign({}, context.attrs), {
        onClick: popup.close
      }), [generateModalBox(props, context, popup)])];
    };

    return () => context.slots.trigger ? context.slots.trigger(popup) : [];
  }

});
//# sourceMappingURL=BModal.js.map