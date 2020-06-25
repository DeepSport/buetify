import { constant, FunctionN } from 'fp-ts/lib/function';
import { IO } from 'fp-ts/lib/IO';
import { h, shallowRef, VNode, Slots } from 'vue';
import { alwaysEmptyArray } from '../../utils/helpers';
import {
  DEFAULT_USE_NOTICE_PROPS,
  RenderNoticeOptions,
  useNoticeController,
  UseNoticeProps
} from '../noticeController';

export function useToast(props: UseNoticeProps = DEFAULT_USE_NOTICE_PROPS, slots: Slots = {}) {
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
  return noticeController;
}
