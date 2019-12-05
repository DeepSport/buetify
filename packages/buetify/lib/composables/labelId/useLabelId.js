import { computed, toRef } from 'vue';
let numId = 0;
export const UseLabelIdPropsDefinition = {
  labelFor: String,
  label: {
    type: String,
    default: ''
  }
};
export function useLabelId(props, prefix) {
  const newId = numId++;
  const id = computed(() => props.labelFor ? props.labelFor : `${prefix}-${newId}`);
  const labelId = computed(() => `label-for-${id.value}`);
  return {
    id,
    labelId,
    label: toRef(props, 'label')
  };
}
//# sourceMappingURL=useLabelId.js.map