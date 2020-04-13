import './dialog.sass';
import BDialogContent from './BDialogContent';
import BDialogOverlay from './BDialogOverlay';
import { DisplayModalMixin } from '../../mixins/displayModal/DisplayModalMixin';
import { applyMixins } from '../../utils/applyMixins';
import { VNode } from 'vue';

export default applyMixins(DisplayModalMixin).extend({
  name: 'BDialog',
  components: {
    BDialogContent,
    BDialogOverlay
  },
  methods: {
    generateModal(): VNode {
      return this.$createElement(
        BDialogOverlay,
        {
          props: {
            isActive: true
          },
          on: {
            close: this.setOff
          }
        },
        [
          this.$createElement(BDialogContent, {
            scopedSlots: {
              header: () => this.$scopedSlots.header && this.$scopedSlots.header(this.triggerScopedProps),
              default: () => this.$scopedSlots.default && this.$scopedSlots.default(this.triggerScopedProps),
              footer: () => this.$scopedSlots.footer && this.$scopedSlots.footer(this.triggerScopedProps)
            }
          })
        ]
      );
    }
  }
});
