import { constVoid } from 'fp-ts/lib/function';
import { inject, shallowRef, onMounted, computed, watch, toRef, onUnmounted } from 'vue';
import { getToggleAttrs, getUseTogglePropsDefinition, useToggle } from '../toggle';
import { FadeTransitionPropsDefinition } from '../transition';
import { DEFAULT_POPUP_CONTROLLER_INJECTION, POPUP_CONTROLLER_SYMBOL } from './providePopupController';
export const UsePopupControllerPropsDefinition = {
    ...FadeTransitionPropsDefinition,
    ...getUseTogglePropsDefinition('isActive')
};
export function usePopupController(props, render) {
    const hasMounted = shallowRef(false);
    onMounted(() => {
        hasMounted.value = true;
    });
    const remove = shallowRef(constVoid);
    const { isOn, setOn, setOff, toggle, listeners } = useToggle(props, 'isActive');
    const { showPopup } = inject(POPUP_CONTROLLER_SYMBOL, DEFAULT_POPUP_CONTROLLER_INJECTION);
    const isOpen = computed(() => hasMounted.value && isOn.value);
    const attrs = getToggleAttrs(isOpen, toRef(props, 'hasPopup'));
    watch(isOpen, newValue => {
        if (newValue) {
            remove.value();
            remove.value = showPopup({
                render: render.value,
                transition: props.transition
            });
        }
        else {
            remove.value();
            remove.value = constVoid;
        }
    });
    onUnmounted(() => {
        remove.value();
    });
    return {
        isOpen,
        attrs,
        listeners,
        open: setOn,
        close: setOff,
        toggle: toggle
    };
}
//# sourceMappingURL=usePopupController.js.map