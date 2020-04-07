import './fullscreen-modal.sass';
import { isEnterEvent } from '../../utils/eventHelpers';
import AngleLeftIcon from '../icons/angleLeft/AngleLeftIcon';
import BOverlay from '../overlay/BOverlay';
import BSheet from '../sheet/BSheet';
import { applyMixins } from '../../utils/applyMixins';
import { DisplayModalMixin } from '../../mixins/displayModal/DisplayModalMixin';
import { VNode } from 'vue';
import BTitle from '../title/BTitle';

export default applyMixins(DisplayModalMixin).extend({
  name: 'BFullscreenModal',
  props: {
    title: {
      type: String,
      required: false
    }
  },
  computed: {
    hasHeader(): boolean {
      return !!this.$scopedSlots.header || !!this.$scopedSlots.title || !!this.title;
    }
  },
  methods: {
    onKeydown(e: KeyboardEvent) {
      if (isEnterEvent(e)) {
        this.close();
      }
    },
    generateCloseButton(): VNode {
      return this.$createElement(
        'button',
        {
          staticClass: 'navigation-icon has-text-link-hover',
          attrs: {
            'aria-label': 'Close'
          },
          on: {
            click: this.close,
            keydown: this.onKeydown
          }
        },
        this.$scopedSlots.close ? this.$scopedSlots.close(undefined) : [this.$createElement(AngleLeftIcon)]
      );
    },

    generateHeader(): VNode {
      return this.$createElement(
        'header',
        {
          staticClass: 'b-app-header is-flex flex-direction-row justify-content-center align-items-center'
        },
        this.$scopedSlots.header
          ? this.$scopedSlots.header({
              close: this.close,
              listeners: {
                keydown: this.onKeydown
              }
            })
          : [this.generateCloseButton(), this.generateTitle()]
      );
    },
    generateTitle(): VNode {
      return this.$createElement(
        'div',
        { staticClass: 'main-slot' },
        this.$scopedSlots.title
          ? this.$scopedSlots.title!(undefined)
          : [this.$createElement(BTitle, { props: { text: this.title } })]
      );
    },
    generateContent(): VNode {
      const nodes = this.$scopedSlots.default!(undefined) as VNode[];
      if (this.hasHeader) {
        nodes.unshift(this.generateHeader());
      }
      return this.$createElement(BSheet, { staticClass: 'is-fullheight', props: { tag: 'article' } }, nodes);
    },
    generateModal(): VNode {
      return this.$createElement(
        BOverlay,
        {
          props: {
            isFullscreen: true,
            isActive: true
          }
        },
        [this.generateContent()]
      );
    }
  }
});
