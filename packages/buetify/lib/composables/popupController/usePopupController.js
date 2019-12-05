import { constVoid } from 'fp-ts/lib/function';
import { inject, shallowRef, onMounted, computed, watchEffect, toRef, onUnmounted } from 'vue';
import { getToggleAttrs, getUseTogglePropsDefinition, useToggle } from '../toggle';
import { FadeTransitionPropsDefinition } from '../transition';
import { DEFAULT_POPUP_CONTROLLER_INJECTION, POPUP_CONTROLLER_SYMBOL } from './providePopupController';
export const UsePopupControllerPropsDefinition = { ...FadeTransitionPropsDefinition,
  ...getUseTogglePropsDefinition('isActive')
};
export function usePopupController(props, render) {
  const hasMounted = shallowRef(false);
  onMounted(() => {
    hasMounted.value = true;
  });
  let remove = constVoid;
  const {
    isOn,
    setOn,
    setOff,
    toggle,
    listeners
  } = useToggle(props, 'isActive');
  const {
    showPopup
  } = inject(POPUP_CONTROLLER_SYMBOL, DEFAULT_POPUP_CONTROLLER_INJECTION);
  const isOpen = computed(() => {
    return hasMounted.value && isOn.value;
  });
  const attrs = getToggleAttrs(isOpen, toRef(props, 'hasPopup'));
  watchEffect(() => {
    if (isOpen.value) {
      remove();
      remove = showPopup({
        render: render.value,
        transition: props.transition
      });
    } else {
      remove();
      remove = constVoid;
    }
  }, {
    flush: 'sync'
  });
  onUnmounted(() => {
    remove();
  });
  return {
    isOpen,
    attrs,
    listeners,
    props: computed(() => ({ ...attrs.value,
      ...listeners
    })),
    open: setOn,
    close: setOff,
    toggle: toggle
  };
}
//# sourceMappingURL=usePopupController.js.map