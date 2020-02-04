import Vue from "vue";
export const DisableMixin = Vue.extend({
  name: "DisableMixin",
  props: {
    isDisabled: {
      type: Boolean,
      default: false
    },
    isReadonly: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    disabled(): boolean {
      return this.isDisabled || this.isReadonly;
    }
  }
});
