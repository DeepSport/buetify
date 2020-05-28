import { constant, FunctionN } from 'fp-ts/lib/function';
import { IO } from 'fp-ts/lib/IO';
import {
  RenderNoticeOptions,
  useNoticeController,
  UseNoticePropsDefinition
} from '../../../composables/noticeController';
import { VNode, defineComponent, shallowRef, h } from 'vue';
import { alwaysEmptyArray } from '../../../utils/helpers';

export default defineComponent({
  name: 'b-toast',
  props: UseNoticePropsDefinition,
  setup(props, { slots }) {
    const renderNotification = shallowRef(constant(alwaysEmptyArray) as FunctionN<[RenderNoticeOptions], IO<VNode[]>>);
    const noticeController = useNoticeController(props, renderNotification);
    renderNotification.value = options => () => {
      return [
        h(
          'div',
          {
            class: ['toast', options.variant ?? props.variant, options.position ?? props.position],
            role: 'alert'
          },
          options.message ?? (slots.message && slots.message()) ?? props.message
        )
      ];
    };
    return () =>
      slots.default &&
      slots.default({
        open: noticeController.open,
        clsoe: noticeController.close
      });
  }
});
