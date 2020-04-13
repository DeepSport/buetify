import { ToggleMixin } from '../../../mixins/toggle/ToggleMixin';
import { applyMixins } from '../../../utils/applyMixins';
import { VNode } from 'vue';

export const Toggle = applyMixins(ToggleMixin).extend({
  name: 'Toggle',
  render(): VNode {
    return this.$scopedSlots.default!({
      attrs: this.attrs,
      isOn: this.internalStatus,
      isOff: !this.internalStatus,
      setOn: this.setOn,
      setOff: this.setOff,
      toggle: this.toggle,
      clickToggler: this.clickToggler,
      keyboardToggler: this.keyboardToggler,
      listeners: this.listeners
    }) as any;
  }
});
