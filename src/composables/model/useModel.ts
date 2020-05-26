import { constant, constVoid, FunctionN } from 'fp-ts/lib/function';
import { PropType, shallowRef, watch, toRef } from 'vue';
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
  value?: T;
  onInput: FunctionN<[T], void>
}

export function useModel<T>(props: UseModelProps<T>) {
  const internalValue = shallowRef(props.value);
  watch(toRef(props, 'value'), newVal => { internalValue.value = newVal })
  watch(internalValue, newVal => props.onInput(newVal))

  function onInput(e: Event) {
    // @ts-ignore-next-line
    if (isObject(e.target) && exists(e.target.value)) {
      // @ts-ignore-next-line
      internalValue.value = e.target.value;
    }
  }
  return {
    value: internalValue,
    onInput
  };
}
