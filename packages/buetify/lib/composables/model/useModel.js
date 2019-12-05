import { constant, constVoid } from 'fp-ts/lib/function';
import { shallowRef, watch, toRef, computed } from 'vue';
import { exists, isObject } from '../../utils/helpers';
export function getUseModelPropsDefinition(valueKey = 'modelValue', updateKey = 'onUpdate:modelValue') {
  // eslint-disable-line
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
  const value = computed({
    get() {
      return internalValue.value;
    },

    set(val) {
      internalValue.value = val;

      if (val !== undefined) {
        props[updateKey](val);
      }
    }

  });

  function onUpdate(e) {
    // eslint-disable-next-line
    // @ts-ignore-next-line
    if (isObject(e.target) && exists(e.target.value)) {
      // eslint-disable-next-line
      // @ts-ignore-next-line
      value.value = e.target.value;
    }
  }

  function set(val) {
    value.value = val;
  }

  return {
    set,
    modelValue: value,
    onNativeInput: onUpdate
  };
}
//# sourceMappingURL=useModel.js.map