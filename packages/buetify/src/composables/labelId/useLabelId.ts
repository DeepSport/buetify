import { PropType, ExtractPropTypes, computed, toRef } from 'vue';

let numId = 0;

export const UseLabelIdPropsDefinition = {
  labelFor: String as PropType<string>,
  label: {
    type: String as PropType<string>,
    default: ''
  }
};

export type UseLabelIdProps = ExtractPropTypes<typeof UseLabelIdPropsDefinition>;

export function useLabelId(props: UseLabelIdProps, prefix: string) {
  const newId = numId++;
  const id = computed(() => (props.labelFor ? props.labelFor : `${prefix}-${newId}`));
  const labelId = computed(() => `label-for-${id.value}`);
  return {
    id,
    labelId,
    label: toRef(props, 'label')
  };
}
