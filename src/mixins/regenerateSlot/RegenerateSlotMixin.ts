import Vue, { VNode } from "vue";

export const RegenerateSlotMixin = Vue.extend({
  name: "RegenerateSlotMixin",
  methods: {
    regenerateSlot(name: string): VNode {
      return this.$createElement(
        "template",
        { slot: name },
        // @ts-ignore
        this.$slots[name] ||
          // @ts-ignore
          (this.$scopedSlots[name] && this.$scopedSlots[name]())
      );
    }
  }
});
