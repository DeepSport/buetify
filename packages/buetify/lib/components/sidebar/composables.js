import { constVoid } from 'fp-ts/lib/function';
import { none, some } from 'fp-ts/lib/Option';
import { shallowRef, computed, provide, inject } from 'vue';
import { useToggle } from '../../composables/toggle';
import { DEFAULT_BREAK_POINTS } from '../../composables/windowSize/provideWindowSize';
const SIDEBAR_CONTROLLER_INJECTION_SYMBOL = Symbol('navigation-drawer-controller');
export const ProvideSidebarControllerPropsDefinition = {
  currentRoute: {
    required: false
  },
  isVisible: {
    type: Boolean,
    required: false,
    default: !!window && window.innerWidth > DEFAULT_BREAK_POINTS.value.desktop
  },
  hasPopup: {
    type: Boolean,
    required: false,
    default: true
  }
};
const DEFAULT_SIDEBAR_CONTROLLER_INJECTION = {
  isVisible: shallowRef(false),
  attrs: shallowRef(none),
  listeners: shallowRef(none),
  show: constVoid,
  hide: constVoid,
  toggle: constVoid
};
export function useSidebarController() {
  return inject(SIDEBAR_CONTROLLER_INJECTION_SYMBOL, DEFAULT_SIDEBAR_CONTROLLER_INJECTION);
}
export function provideSidebarController(props) {
  const toggle = useToggle(props, 'isVisible');
  const injection = {
    isVisible: toggle.isOn,
    listeners: computed(() => some(toggle.listeners)),
    attrs: computed(() => some(toggle.attrs.value)),
    show: toggle.setOn,
    hide: toggle.setOff,
    toggle: toggle.toggle
  };
  provide(SIDEBAR_CONTROLLER_INJECTION_SYMBOL, injection);
  return injection;
}
//# sourceMappingURL=composables.js.map