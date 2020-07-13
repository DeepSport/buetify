import { watch, computed, ref, toRef } from 'vue';
import { isEnterEvent } from '../../utils/eventHelpers';
export function getUseTogglePropsDefinition(statusName) {
    return {
        [statusName]: {
            type: Boolean,
            default: false
        },
        hasPopup: {
            type: Boolean,
            default: false
        }
    };
}
export function getToggleAttrs(status, hasPopup) {
    return computed(() => (Object.assign({ tabindex: 0, role: 'button', type: 'button', 'aria-pressed': status.value, 'aria-expanded': status.value }, (hasPopup.value ? { 'aria-haspopup': true } : {}))));
}
function getListeners(toggle) {
    return {
        onClick: toggle,
        onKeydown: (e) => {
            if (isEnterEvent(e)) {
                e.preventDefault();
                toggle();
            }
        }
    };
}
export function useToggle(props, statusName) {
    const internalStatus = ref(props[statusName]);
    watch(props, newProps => {
        internalStatus.value = newProps[statusName];
    });
    function setOn() {
        internalStatus.value = true;
    }
    function setOff() {
        internalStatus.value = false;
    }
    function toggle() {
        internalStatus.value = !internalStatus.value;
    }
    const attrs = getToggleAttrs(internalStatus, toRef(props, 'hasPopup'));
    const listeners = getListeners(toggle);
    return {
        isOn: internalStatus,
        isOff: computed(() => internalStatus.value === false),
        attrs,
        listeners,
        setOn,
        setOff,
        toggle
    };
}
//# sourceMappingURL=useToggle.js.map