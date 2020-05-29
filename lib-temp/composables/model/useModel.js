import { constant, constVoid } from 'fp-ts/lib/function';
import { shallowRef, watch, toRef } from 'vue';
import { exists, isObject } from '../../utils/helpers';
export function getUseModelPropsDefinition() {
    return {
        value: null,
        onInput: {
            type: Function,
            default: constant(constVoid)
        }
    };
}
export function useModel(props) {
    const internalValue = shallowRef(props.value);
    watch(toRef(props, 'value'), newVal => { internalValue.value = newVal; });
    watch(internalValue, newVal => props.onInput(newVal));
    function onInput(e) {
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
        value: internalValue,
        set,
        onInput
    };
}
//# sourceMappingURL=useModel.js.map