import './message.sass';
import { FadeTransitionMixin } from '../../mixins/fadeTransition/FadeTransitionMixin';
import { VNode } from 'vue';
import { applyMixins } from '../../utils/applyMixins';
import { MessageMixin } from '../../mixins/message/MessageMixin';

export default applyMixins(MessageMixin, FadeTransitionMixin).extend({
  name: 'BMessage',
  methods: {
    generateMessage(): VNode {
      return this.$createElement(
        'article',
        { staticClass: 'message', class: this.messageClasses },
        this.hasTitle ? [this.generateHeader(), this.generateBody()] : [this.generateBody()]
      );
    },
    generateHeader(): VNode {
      const nodes = this.$slots.header || [this.$createElement('p', this.title)];
      if (this.isClosable) {
        nodes.push(
          this.$createElement('button', {
            staticClass: 'delete',
            attrs: { 'aria-label': `Close message` },
            on: { click: this.closeMessage }
          })
        );
      }
      return this.$createElement('header', { staticClass: 'message-header' }, nodes);
    },
    generateBody(): VNode {
      const nodes: VNode[] = [];
      if (this.icon && this.displayIcon) {
        nodes.push(
          this.$createElement('div', { staticClass: 'media-left' }, [
            this.$createElement(this.icon, {
              props: { size: this.newIconSize, variant: this.variant }
            })
          ])
        );
      }
      nodes.push(this.$createElement('div', { staticClass: 'media-content' }, this.$slots.default || [this.message]));
      return this.$createElement(
        'section',
        {
          staticClass: 'message-body',
          attrs: { 'aria-label': 'Close message' }
        },
        [this.$createElement('div', { staticClass: 'media' }, nodes)]
      );
    }
  },
  render(): VNode {
    return this.$createElement(
      'transition',
      { props: this.formattedTransition },
      this.internalIsActive ? [this.generateMessage()] : []
    );
  }
});
