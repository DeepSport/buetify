import { Ref, computed, PropType, ExtractPropTypes } from 'vue';

export const UseDisablePropsDefinition = {
  isDisabled: {
    type: Boolean as PropType<boolean>,
    required: false,
    default: false
  },
  isReadonly: {
    type: Boolean as PropType<boolean>,
    required: false,
    default: false
  },
  disableIfReadonly: {
    type: Boolean as PropType<boolean>,
    required: false,
    default: false
  }
};

export type UseDisableProps = ExtractPropTypes<typeof UseDisablePropsDefinition>;

export function useDisable(props: UseDisableProps): Ref<boolean> {
  return computed(() => props.isDisabled || (props.isReadonly && props.disableIfReadonly));
}
