import Vue from "vue";
export function getLabelIdMixin(prefix: string, labelSlot: string = "label") {
  return Vue.extend({
    props: {
      id: String,
      label: {
        type: String,
        default: ""
      }
    },
    computed: {
      hasLabel(): boolean {
        return !!this.label || !!this.$slots[labelSlot];
      },
      computedId(): string {
        return this.id || `${prefix}-${this._uid}`;
      },
      labelId(): string {
        return `label-for-${this.computedId}`;
      }
    }
  });
}

export const InputLabelIdMixin = getLabelIdMixin("input");
