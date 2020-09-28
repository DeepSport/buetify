import { FunctionN } from 'fp-ts/lib/function';
import { Ref, shallowRef, watch, computed, unref } from 'vue';

export function useProxy<T>(
  ref: Ref<T>,
  onUpdate?: Ref<FunctionN<[T], void> | undefined> | FunctionN<[T], void>
): Proxy<T> {
  const internalValue = shallowRef(ref.value);
  watch(ref, newValue => {
    internalValue.value = newValue;
  });

  const value = computed({
    get() {
      return internalValue.value;
    },
    set(val: T) {
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

export interface Proxy<T> {
  value: Ref<T>;
}
