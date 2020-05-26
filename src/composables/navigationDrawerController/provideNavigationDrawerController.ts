import { constVoid } from 'fp-ts/lib/function';
import { none, Option, some } from 'fp-ts/lib/Option';
import { Ref, ExtractPropTypes, shallowRef, PropType, computed, provide } from 'vue';
import { IO } from 'fp-ts/lib/IO';
import { ToggleAttrs, ToggleListeners, useToggle } from '../toggle';
import { DEFAULT_BREAK_POINTS } from '../windowSize/provideWindowSize';

export interface NavigationDrawerControllerInjection {
  isVisible: Ref<Option<boolean>>;
  attrs: Ref<Option<ToggleAttrs>>;
  listeners: Ref<Option<ToggleListeners>>;
  show: IO<void>;
  hide: IO<void>;
  toggle: IO<void>;
}

export const NAVIGATION_DRAWER_CONTROLLER_INJECTION_SYMBOL = Symbol('navigation-drawer-controller');

export const ProvideNavigationDrawerControllerPropsDefinition = {
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
}

export type ProvideNavigationDrawerControllerProps = ExtractPropTypes<typeof ProvideNavigationDrawerControllerPropsDefinition>

export const DEFAULT_NAVIGATION_DRAWER_CONTROLLER_INJECTION: NavigationDrawerControllerInjection = {
  isVisible: shallowRef(none),
  attrs: shallowRef(none),
  listeners: shallowRef(none),
  show: constVoid,
  hide: constVoid,
  toggle: constVoid,
}

export function provideNavigationDrawerController(props: ProvideNavigationDrawerControllerProps) {
  const toggle = useToggle(props, 'isVisible');
  const injection: NavigationDrawerControllerInjection = {
    isVisible: computed(() => some(toggle.isOn.value)),
    listeners: computed(() => some(toggle.listeners)),
    attrs: computed(() => some(toggle.attrs.value)),
    show: toggle.setOn,
    hide: toggle.setOff,
    toggle: toggle.toggle
  }
  provide(NAVIGATION_DRAWER_CONTROLLER_INJECTION_SYMBOL, injection);
  return injection;
}
