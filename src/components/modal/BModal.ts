import './modal.sass';
import BOverlay from '../overlay/BOverlay';
import BBox from '../layout/box/BBox';
import { DisplayModalMixin } from '../../mixins/displayModal/DisplayModalMixin';
import { applyMixins } from '../../utils/applyMixins';
import { VNode } from 'vue';

const DEFAULT_STYLE = {
  height: 'inherit'
};

export default applyMixins(DisplayModalMixin).extend({
  name: 'BModal',
  inheritAttrs: false,
  props: {
    modalStyle: {
      type: Object,
      required: false,
      default: () => {}
    },
    showExit: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    appliedStyle(): object {
      return { ...DEFAULT_STYLE, ...this.modalStyle };
    }
  },
  methods: {
    generateModal(): VNode {
      return this.$createElement(
        BOverlay,
        {
          style: this.appliedStyle,
          on: {
            ...this.listeners,
            close: this.close.bind(this)
          }
        },
        [this.generateModalBox()]
      );
    },
    generateModalBox(): VNode {
      return this.$createElement(
        BBox,
        {
          staticClass: 'is-paddingless is-fullheight is-fullwidth overflow-scroll'
        },
        [
          this.$createElement(
            'div',
            { staticClass: 'is-fullheight' },
            this.showExit ? [this.generateCloseButton(), this.generateDefaultSlot()] : [this.generateDefaultSlot]
          )
        ]
      );
    },
    generateDefaultSlot(): VNode {
      return this.$createElement(
        'template',
        { slot: 'default' },
        this.$scopedSlots.default && this.$scopedSlots.default(this.triggerScopedProps)
      );
    },
    generateCloseButton(): VNode {
      return this.$createElement('button', {
        staticClass: 'modal-exit delete is-small',
        on: { click: this.closeModal }
      });
    },
    closeModal(e: MouseEvent) {
      e.stopPropagation();
      this.$emit('close');
    }
  }
});
