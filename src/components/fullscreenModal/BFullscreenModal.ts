import BOverlay from '../overlay/BOverlay';
import BSheet from '../sheet/BSheet';
import { applyMixins } from '../../utils/applyMixins';
import { DisplayModalMixin } from '../../mixins/displayModal/DisplayModalMixin';
import { VNode } from 'vue';

export default applyMixins(DisplayModalMixin).extend({
  name: 'BFullscreenModal',
  methods: {
    close() {
      this.$emit('close');
    },
    generateModal(): VNode {
      return this.$createElement(
        BOverlay,
        {
          props: {
            isFullscreen: true,
            isActive: this.isActive
          }
        },
        [this.$createElement(BSheet, { staticClass: 'height-100-percent' }, this.$slots.default)]
      );
    }
  }
});
