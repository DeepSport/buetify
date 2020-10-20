import 'bulma/sass/components/card.sass';
import 'bulma/sass/components/modal.sass';
import '../../sass/helpers/animations.sass';
import './modal.sass';
import { IO } from 'fp-ts/lib/IO';
import { usePopupController, UsePopupControllerPropsDefinition } from '../../composables/popupController';
import { constEmptyArray } from '../../utils/helpers';
import { VNode, defineComponent, PropType, shallowRef, h, ExtractPropTypes, watchEffect, onUnmounted } from 'vue';
import BSheet from '../sheet/BSheet';

const BModalPropsDefinition = {
  ...UsePopupControllerPropsDefinition,
  showExit: {
    type: Boolean as PropType<boolean>,
    default: true
  },
  isFullscreen: {
    type: Boolean as PropType<boolean>,
    default: false
  }
};

export type BModalProps = ExtractPropTypes<typeof BModalPropsDefinition>;

export default defineComponent({
  name: 'b-modal',
  props: BModalPropsDefinition,
  setup(props, { attrs, slots }) {
    const generateModal = shallowRef(constEmptyArray as IO<VNode[]>);
    const popup = usePopupController(props, generateModal);
    generateModal.value = () => {
      if (!props.isFullscreen) {
        const nodes = [
          h('div', { onClick: popup.close, class: 'modal-background' }),
          h('div', { class: 'modal-content' }, slots.default && slots.default(popup))
        ];
        if (props.showExit) {
          nodes.push(h('button', { class: 'modal-close is-large', onClick: popup.close }));
        }
        return [
          h(
            'div',
            {
              ...attrs,
              class: 'modal is-active'
            },
            nodes
          )
        ];
      } else {
        return [
          h(
            'div',
            {
              ...attrs,
              class: 'modal is-active is-fullscreen'
            },
            [h(BSheet, () => slots.default && slots.default(popup))]
          )
        ];
      }
    };

    watchEffect(() => {
      if (window === undefined) {
        return;
      }
      if (popup.isOpen.value && props.isFullscreen) {
        window.document.documentElement.classList.add('is-clipped');
      } else {
        window.document.documentElement.classList.remove('is-clipped');
      }
    });

    onUnmounted(() => {
      window && window.document.documentElement.classList.remove('is-clipped');
    });
    return { popup };
  },
  render() {
    return this.$slots.trigger && this.$slots.trigger(this.popup);
  }
});
