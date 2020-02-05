import '../sass/notices.scss';
import { applyMixins } from '../../../utils/applyMixins';
import { DisplayNoticeMixin, OpenNoticeParams } from '../../../mixins/displayNotice/DisplayNoticeMixin';
import { PropValidator } from 'vue/types/options';
import { constVoid } from 'fp-ts/lib/function';
import { IO } from 'fp-ts/lib/IO';
import { VNode } from 'vue';
import { AllColorsVariant } from '../../../types/ColorVariants';
import { PositionVariant } from '../../../types/PositionVariant';

export default applyMixins(DisplayNoticeMixin).extend({
  name: 'BSnackbar',
  props: {
    actionText: {
      type: String,
      default: 'OK'
    },
    onAction: {
      type: Function,
      default: constVoid
    } as PropValidator<IO<void>>
  },
  methods: {
    generateNotice(params: OpenNoticeParams) {
      return this.$createElement(
        'article',
        {
          staticClass: 'snackbar',
          class: params.position || this.position,
          attrs: { role: 'alert' }
        },
        [this.generateMessage(), this.generateAction()]
      );
    },
    generateMessage(message?: string): VNode {
      return this.$createElement(
        'p',
        { staticClass: 'text' },
        this.$slots.message ? this.$slots.message : [message || this.message]
      );
    },
    generateAction(variant?: AllColorsVariant, position?: PositionVariant): VNode {
      return this.$createElement(
        'div',
        {
          staticClass: 'action',
          class: [variant || this.variant, position || this.position]
        },
        [
          this.$createElement(
            'button',
            {
              staticClass: 'button',
              on: {
                click: () => {
                  this.onAction();
                  this.closeNotice();
                }
              }
            },
            this.$slots.action || [this.actionText]
          )
        ]
      );
    }
  }
});
