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
          on: this.$listeners
        },
        [
          this.$createElement(BDialogContent, [
            this.regenerateSlot('header'),
            this.regenerateSlot('default'),
            this.regenerateSlot('footer')
          ])
        ]
      );
    }
  }
});
