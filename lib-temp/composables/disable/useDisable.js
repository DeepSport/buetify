import { computed } from 'vue';
export const UseDisablePropsDefinition = {
    isDisabled: {
        type: Boolean,
        required: false,
        default: false
    },
    isReadonly: {
        type: Boolean,
        required: false,
        default: false
    },
    disableIfReadonly: {
        type: Boolean,
        required: false,
        default: false
    }
};
export function useDisable(props) {
    return computed(() => (props.isDisabled || (props.isReadonly && props.disableIfReadonly)));
}
//# sourceMappingURL=useDisable.js.map