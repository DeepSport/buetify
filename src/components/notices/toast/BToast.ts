import { DisplayNoticeMixin, OpenNoticeParams } from '../../../mixins/displayNotice/DisplayNoticeMixin';
import { PositionVariant } from '../../../types/PositionVariant';
import { applyMixins } from '../../../utils/applyMixins';
import { VNode } from 'vue';

export default applyMixins(DisplayNoticeMixin).extend({
  name: 'BToast',
  methods: {
    generateNotice(params: OpenNoticeParams): VNode {
      const childrenVNodes =
        params.message || this.message ? [params.message || this.message] : this.$scopedSlots.message!(undefined);
      const position = params.position || (this.position as PositionVariant);
      return this.$createElement(
        'div',
        {
          staticClass: 'toast',
          class: [position, params.variant || this.variant],
          attrs: {
            role: 'alert'
          }
        },
        childrenVNodes
      );
    }
  }
});
