import { constant } from 'fp-ts/lib/function';
import { h, shallowRef } from 'vue';
import { constEmptyArray } from '../../utils/helpers';
import { DEFAULT_USE_NOTICE_PROPS, useNoticeController } from '../noticeController';
export function useToast(props = DEFAULT_USE_NOTICE_PROPS, slots = {}) {
  const renderNotification = shallowRef(constant(constEmptyArray));
  const noticeController = useNoticeController(props, renderNotification);

  renderNotification.value = options => () => {
    return [slots.message ? h('div', {
      class: ['toast', options.variant ?? props.variant, options.position ?? props.position],
      role: 'alert'
    }, slots.message && slots.message()) : h('div', {
      class: ['toast', options.variant ?? props.variant, options.position ?? props.position],
      role: 'alert',
      innerHTML: options.message ?? props.message
    })];
  };

  return noticeController;
}
//# sourceMappingURL=useToast.js.map