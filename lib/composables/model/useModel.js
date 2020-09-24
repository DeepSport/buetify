import { constant, constVoid } from 'fp-ts/lib/function';
import { shallowRef, watch, toRef } from 'vue';
import { exists, isObject } from '../../utils/helpers';
export function getUseModelPropsDefinition(valueKey = 'modelValue', updateKey = 'onUpdate:modelValue') {
  return {
    [valueKey]: null,
    [updateKey]: {
      type: Function,
      default: constant(constVoid)
    }
  };
}
export function useModel(props, valueKey = 'modelValue', updateKey = 'onUpdate:modelValue') {
  const internalValue = shallowRef(props[valueKey]);
  watch(toRef(props, valueKey), newVal => {
    internalValue.value = newVal;
  });
  watch(internalValue, newVal => props[updateKey](newVal));

  function onUpdate(e) {
    // @ts-ignore-next-line
    if (isObject(e.target) && exists(e.target.value)) {
      // @ts-ignore-next-line
      internalValue.value = e.target.value;
    }
  }

  function set(val) {
    internalValue.value = val;
  }

  return {
    modelValue: internalValue,
    set,
    onNativeInput: onUpdate
  };
}
//# sourceMappingURL=useModel.js.map