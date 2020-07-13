import { shallowRef, watch } from 'vue';
export function useProxy(ref, onUpdate) {
    const value = shallowRef(ref.value);
    watch(ref, newValue => {
        value.value = newValue;
    });
    function set(val) {
        value.value = val;
        if (onUpdate && onUpdate.value)
            onUpdate.value(val);
    }
    return {
        value,
        set
    };
}
//# sourceMappingURL=useProxy.js.map