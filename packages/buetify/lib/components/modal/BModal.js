import 'bulma/sass/components/card.sass';
import 'bulma/sass/components/modal.sass';
import "../../../src/sass/helpers/animations.sass";
import "../../../src/components/modal/modal.sass";
import { usePopupController, UsePopupControllerPropsDefinition } from '../../composables/popupController';
import { constEmptyArray } from '../../utils/helpers';
import { defineComponent, shallowRef, h, watchEffect, onUnmounted } from 'vue';
import BSheet from '../sheet/BSheet';
const BModalPropsDefinition = { ...UsePopupControllerPropsDefinition,
  showExit: {
    type: Boolean,
    default: true
  },
  isFullscreen: {
    type: Boolean,
    default: false
  }
};
export default defineComponent({
  name: 'b-modal',
  props: BModalPropsDefinition,

  setup(props, {
    attrs,
    slots
  }) {
    const generateModal = shallowRef(constEmptyArray);
    const popup = usePopupController(props, generateModal);

    generateModal.value = () => {
      if (!props.isFullscreen) {
        const nodes = [h('div', {
          onClick: popup.close,
          class: 'modal-background'
        }), h('div', {
          class: 'modal-content'
        }, slots.default && slots.default(popup))];

        if (props.showExit) {
          nodes.push(h('button', {
            class: 'modal-close is-large',
            onClick: popup.close
          }));
        }

        return [h('div', { ...attrs,
          class: 'modal is-active'
        }, nodes)];
      } else {
        return [h('div', { ...attrs,
          class: 'modal is-active is-fullscreen'
        }, [h(BSheet, () => slots.default && slots.default(popup))])];
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
    return {
      popup
    };
  },

  render() {
    return this.$slots.trigger && this.$slots.trigger(this.popup);
  }

});
//# sourceMappingURL=BModal.js.map