import { WindowSizeMixin } from '../../../mixins/windowSize/WindowSizeMixin';
import { applyMixins } from '../../../utils/applyMixins';
import { VNode } from 'vue';

export const WindowSize = applyMixins(WindowSizeMixin).extend({
  name: 'WindowSize',
  render(): VNode {
    return this.$scopedSlots.default!(this.windowSize) as any;
  }
});
