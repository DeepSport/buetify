import './loading.sass';
import { IO } from 'fp-ts/lib/IO';
import { usePopupController, UsePopupControllerPropsDefinition } from '../../composables/popupController';
import { useToggle } from '../../composables/toggle';
import { isEscEvent } from '../../utils/eventHelpers';
import { VNode, h, defineComponent, ExtractPropTypes, shallowRef, Transition, onMounted, onUnmounted } from 'vue';
import { constEmptyArray } from '../../utils/helpers';

export const BLoadingPropsDefinition = {
  ...UsePopupControllerPropsDefinition,
  isFullscreen: {
    type: Boolean,
    default: false
  },
  canCancel: {
    type: Boolean,
    default: false
  }
};

export type BLoadingProps = ExtractPropTypes<typeof BLoadingPropsDefinition>;

function getGenerateModal(onClick: IO<void>) {
  return () => [
    h('div', { class: 'b-loading-overlay is-active is-fullscreen' }, [
      h('div', {
        class: 'loading-background',
        onClick
      }),
      h('div', { class: 'loading-icon' })
    ])
  ];
}

export default defineComponent({
  name: 'b-loading',
  props: BLoadingPropsDefinition,
  setup(props, { slots }) {
    if (props.isFullscreen) {
      const generateLoadingPopup = shallowRef(constEmptyArray as IO<VNode[]>);
      const popup = usePopupController(props, generateLoadingPopup);
      const onClick = () => {
        if (props.canCancel && popup.isOpen.value) {
          popup.close();
        }
      };
      const onKeyup = (e: KeyboardEvent) => {
        if (isEscEvent(e)) {
          onClick();
        }
      };
      onMounted(() => {
        if (typeof window !== 'undefined') {
          document.addEventListener('keyup', onKeyup);
        }
      });
      onUnmounted(() => {
        if (typeof window !== 'undefined') {
          document.removeEventListener('keyup', onKeyup);
        }
      });
      generateLoadingPopup.value = getGenerateModal(onClick);
      return () => (slots.trigger ? slots.trigger(popup) : []);
    } else {
      const toggle = useToggle(props, 'isActive');
      const onClick = () => {
        if (props.canCancel && toggle.isOn.value) {
          toggle.setOff();
        }
      };
      const render = getGenerateModal(onClick);
      return () => h(Transition, { name: props.transition }, toggle.isOn.value && render());
    }
  }
});
