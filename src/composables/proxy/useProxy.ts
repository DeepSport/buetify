import { FunctionN } from 'fp-ts/lib/function';
import { Ref, shallowRef, watch } from 'vue';

export function useProxy<T>(ref: Ref<T>, onUpdate?: Ref<FunctionN<[T], void> | undefined>): Proxy<T> {
  const value = shallowRef(ref.value);
  watch(ref, newValue => {
    value.value = newValue;
  });
  function set(val: T) {
    value.value = val;
    if (onUpdate && onUpdate.value) onUpdate.value(val);
  }
  return {
    value,
    set
  };
}

export interface Proxy<T> {
  value: Ref<T>;
  set: FunctionN<[T], void>;
}
