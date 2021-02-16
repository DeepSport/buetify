import { constant, FunctionN } from 'fp-ts/lib/function';
import { IO } from 'fp-ts/lib/IO';
import { h, shallowRef, VNode, Slots } from 'vue';
import { constEmptyArray } from '../../utils/helpers';
import {
  DEFAULT_USE_NOTICE_PROPS,
  RenderNoticeOptions,
  useNoticeController,
  UseNoticeProps
} from '../noticeController';

export function useToast(props: UseNoticeProps = DEFAULT_USE_NOTICE_PROPS, slots: Slots = {}) {
  const renderNotification = shallowRef(constant(constEmptyArray) as FunctionN<[RenderNoticeOptions], IO<VNode[]>>);
  const noticeController = useNoticeController(props, renderNotification);
  renderNotification.value = options => () => {
    return [
      slots.message
        ? h(
            'div',
            {
              class: ['toast', options.variant ?? props.variant, options.position ?? props.position],
              role: 'alert'
            },
            slots.message && slots.message()
          )
        : h('div', {
            class: ['toast', options.variant ?? props.variant, options.position ?? props.position],
            role: 'alert',
            innerHTML: options.message ?? props.message
          })
    ];
  };
  return noticeController;
}
