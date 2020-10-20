import { constVoid } from 'fp-ts/lib/function';
import { none, Option, some } from 'fp-ts/lib/Option';
import { Ref, ExtractPropTypes, shallowRef, PropType, computed, provide, inject } from 'vue';
import { IO } from 'fp-ts/lib/IO';
import { ToggleAttrs, ToggleListeners, useToggle } from '../../composables/toggle';
import { DEFAULT_BREAK_POINTS } from '../../composables/windowSize/provideWindowSize';

export interface SidebarController {
  isVisible: Ref<boolean>;
  attrs: Ref<Option<ToggleAttrs>>;
  listeners: Ref<Option<ToggleListeners>>;
  show: IO<void>;
  hide: IO<void>;
  toggle: IO<void>;
}

const SIDEBAR_CONTROLLER_INJECTION_SYMBOL = Symbol('navigation-drawer-controller');

export const ProvideSidebarControllerPropsDefinition = {
  currentRoute: {
    required: false
  },
  isVisible: {
    type: Boolean as PropType<boolean>,
    required: false,
    default: !!window && window.innerWidth > DEFAULT_BREAK_POINTS.value.desktop
  },
  hasPopup: {
    type: Boolean as PropType<boolean>,
    required: false,
    default: true
  }
};

export type ProvideNavigationDrawerControllerProps = ExtractPropTypes<typeof ProvideSidebarControllerPropsDefinition>;

const DEFAULT_SIDEBAR_CONTROLLER_INJECTION: SidebarController = {
  isVisible: shallowRef(false),
  attrs: shallowRef(none),
  listeners: shallowRef(none),
  show: constVoid,
  hide: constVoid,
  toggle: constVoid
};

export function useSidebarController(): SidebarController {
  return inject(SIDEBAR_CONTROLLER_INJECTION_SYMBOL, DEFAULT_SIDEBAR_CONTROLLER_INJECTION);
}

export function provideSidebarController(props: ProvideNavigationDrawerControllerProps) {
  const toggle = useToggle(props, 'isVisible');
  const injection: SidebarController = {
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
