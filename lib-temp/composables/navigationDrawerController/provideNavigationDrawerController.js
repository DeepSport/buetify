import { constVoid } from 'fp-ts/lib/function';
import { none, some } from 'fp-ts/lib/Option';
import { shallowRef, computed, provide } from 'vue';
import { useToggle } from '../toggle';
import { DEFAULT_BREAK_POINTS } from '../windowSize/provideWindowSize';
export const NAVIGATION_DRAWER_CONTROLLER_INJECTION_SYMBOL = Symbol('navigation-drawer-controller');
export const ProvideNavigationDrawerControllerPropsDefinition = {
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
export const DEFAULT_NAVIGATION_DRAWER_CONTROLLER_INJECTION = {
    isVisible: shallowRef(none),
    attrs: shallowRef(none),
    listeners: shallowRef(none),
    show: constVoid,
    hide: constVoid,
    toggle: constVoid,
};
export function provideNavigationDrawerController(props) {
    const toggle = useToggle(props, 'isVisible');
    const injection = {
        isVisible: computed(() => some(toggle.isOn.value)),
        listeners: computed(() => some(toggle.listeners)),
        attrs: computed(() => some(toggle.attrs.value)),
        show: toggle.setOn,
        hide: toggle.setOff,
        toggle: toggle.toggle
    };
    provide(NAVIGATION_DRAWER_CONTROLLER_INJECTION_SYMBOL, injection);
    return injection;
}
//# sourceMappingURL=provideNavigationDrawerController.js.map