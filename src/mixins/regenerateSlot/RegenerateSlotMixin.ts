import Vue, { VNode } from 'vue';

export const RegenerateSlotMixin = Vue.extend({
  name: 'RegenerateSlotMixin',
  methods: {
    regenerateSlot(name: string): VNode {
      return this.$createElement('template', { slot: name }, this.$scopedSlots[name]!(undefined));
    }
  }
});
