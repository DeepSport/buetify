import { PropType } from 'vue';

export function useCheckRadioPropsDefinition<T>() {
  return {
    value: (null as unknown) as PropType<T>,
    nativeValue: (null as unknown) as PropType<unknown>,
    type: {
      type: String as PropType<string>
    }
  };
}

export function useCheckRadio<T>() {}
