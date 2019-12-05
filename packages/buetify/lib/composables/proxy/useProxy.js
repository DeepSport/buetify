import { shallowRef, watch, computed, unref } from 'vue';
export function useProxy(ref, onUpdate) {
  const internalValue = shallowRef(ref.value);
  watch(ref, newValue => {
    internalValue.value = newValue;
  });
  const value = computed({
    get() {
      return internalValue.value;
    },

    set(val) {
      internalValue.value = val;
      const update = unref(onUpdate);

      if (update) {
        update(val);
      }
    }

  });
  return {
    value
  };
}
//# sourceMappingURL=useProxy.js.map