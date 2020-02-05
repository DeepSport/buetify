import { DEFAULT_NOTICE_INJECTION, OpenNoticeParams } from '../../../mixins/displayNotice/DisplayNoticeMixin';
import { constant } from 'fp-ts/lib/function';
import { AllColorsVariant } from '../../../types/ColorVariants';
import { PositionVariant } from '../../../types/PositionVariant';
import { mergeVNodeClasses } from '../../../utils/mergeVNodeClasses';
import { mergeVNodeStaticClass } from '../../../utils/mergeVNodeStaticClass';
import { getNoticeTransition } from '../../../utils/helpers';
import Vue, { PropType, VNode } from 'vue';

export default Vue.extend({
  name: 'BToast',
  functional: true,
  props: {
    duration: {
      type: Number,
      default: 2000
    },
    message: {
      type: String
    },
    position: {
      type: String as PropType<PositionVariant>,
      required: false,
      default: 'is-bottom-right'
    },
    shouldQueue: {
      type: Boolean,
      default: true
    },
    variant: {
      type: String as PropType<AllColorsVariant>,
      default: 'is-primary'
    }
  },
  inject: {
    notice: {
      default: constant(DEFAULT_NOTICE_INJECTION)
    }
  },
  render(h, { props, data, scopedSlots, injections, children }): VNode {
    function open(params: OpenNoticeParams) {
      const childrenVNodes = params.message || props.message ? [params.message || props.message] : children;
      const position = params.position || (props.position as PositionVariant);
      const toastNode = h(
        'div',
        {
          staticClass: mergeVNodeStaticClass('toast', data.staticClass),
          class: mergeVNodeClasses(data.class, [position, params.variant || props.variant]),
          attrs: {
            role: 'alert'
          }
        },
        childrenVNodes
      );
      injections.notice.showNotice({
        node: toastNode,
        placement: position.includes('top') ? 'top' : 'bottom',
        duration: params.duration === undefined ? params.duration : props.duration,
        shouldQueue: params.shouldQueue == undefined ? params.shouldQueue : props.shouldQueue,
        transition: getNoticeTransition(position)
      });
    }
    return scopedSlots.default!({
      open
    }) as any;
  }
});
