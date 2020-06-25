import { constant, constVoid, FunctionN } from 'fp-ts/lib/function';
import { PropType, shallowRef, watch, toRef, Ref } from 'vue';
import { exists, isObject } from '../../utils/helpers';

export function getUseModelPropsDefinition<T>() {
  return {
    value: (null as unknown) as PropType<T>,
    onInput: {
      type: Function as PropType<FunctionN<[T], void>>,
      default: constant(constVoid)
    }
  };
}

export interface UseModelProps<T> {
  value?: T | undefined;
  onInput: FunctionN<[T], void>;
}

export function useModel<T>(props: UseModelProps<T>) {
  const internalValue = shallowRef(props.value);
  watch(toRef(props, 'value'), newVal => {
    internalValue.value = newVal;
  });
  watch(internalValue, newVal => props.onInput(newVal));

  function onInput(e: Event) {
    // @ts-ignore-next-line
    if (isObject(e.target) && exists(e.target.value)) {
      // @ts-ignore-next-line
      internalValue.value = e.target.value;
    }
  }
  function set(val: T) {
    internalValue.value = val;
  }
  return {
    value: internalValue,
    set,
    onInput
  };
}

export interface Model<T> {
  value: Ref<T | undefined>;
  set: FunctionN<[T], void>;
  onInput: FunctionN<[Event], void>;
}
