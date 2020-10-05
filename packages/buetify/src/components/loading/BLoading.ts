import './loading.sass';
import { IO } from 'fp-ts/lib/IO';
import { usePopupController, UsePopupControllerPropsDefinition } from '../../composables/popupController';
import { isEscEvent } from '../../utils/eventHelpers';
import {
  VNode,
  h,
  defineComponent,
  ExtractPropTypes,
  shallowRef,
  Transition,
  onUnmounted,
  Slots,
  Ref,
  toRef,
  toRefs,
  reactive,
  computed,
  watchEffect
} from 'vue';
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

function getGenerateModal(onClick: IO<void>, slots: Slots, isFullscreen: Ref<boolean>) {
  return () => [
    h('div', { class: ['b-loading-overlay is-active', { 'is-fullscreen': isFullscreen.value }] }, [
      h('div', {
        class: 'loading-background',
        onClick
      }),
      slots.default ? slots.default({ close: onClick }) : h('div', { class: 'loading-icon' })
    ])
  ];
}

export default defineComponent({
  name: 'b-loading',
  props: BLoadingPropsDefinition,
  setup(props, { slots }) {
    const isFullscreen = toRef(props, 'isFullscreen');
    const isActive = computed(() => props.isFullscreen && props.isActive);
    const render = shallowRef(constEmptyArray as IO<VNode[]>);
    const popup = usePopupController(
      reactive({
        ...toRefs(props),
        isActive
      }),
      render
    );

    function onClick() {
      if (props.canCancel && props.isFullscreen ? popup.isOpen.value : props.isActive) {
        popup.close();
      }
    }

    render.value = getGenerateModal(onClick, slots, isFullscreen);

    function onKeyup(e: KeyboardEvent) {
      if (isEscEvent(e)) {
        onClick();
      }
    }

    watchEffect(() => {
      if (window === undefined) return;
      if (popup.isOpen.value && props.canCancel) {
        document.addEventListener('keyup', onKeyup);
      } else {
        document.removeEventListener('keyup', onKeyup);
      }
    });

    onUnmounted(() => {
      window && window.removeEventListener('keyup', onKeyup);
    });

    return () => {
      if (slots.trigger && props.isFullscreen) {
        return slots.trigger(popup);
      } else if (props.isFullscreen) {
        return undefined;
      } else {
        return h(Transition as any, { name: props.transition }, () =>
          props.isActive ? render.value() : undefined
        );
      }
    };
  }
});
