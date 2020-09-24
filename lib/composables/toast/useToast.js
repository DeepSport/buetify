import { constant } from 'fp-ts/lib/function';
import { h, shallowRef } from 'vue';
import { alwaysEmptyArray } from '../../utils/helpers';
import { DEFAULT_USE_NOTICE_PROPS, useNoticeController } from '../noticeController';
export function useToast(props = DEFAULT_USE_NOTICE_PROPS, slots = {}) {
  const renderNotification = shallowRef(constant(alwaysEmptyArray));
  const noticeController = useNoticeController(props, renderNotification);

  renderNotification.value = options => () => {
    var _a, _b, _c, _d;

    return [h('div', {
      class: ['toast', (_a = options.variant) !== null && _a !== void 0 ? _a : props.variant, (_b = options.position) !== null && _b !== void 0 ? _b : props.position],
      role: 'alert'
    }, (_d = (_c = options.message) !== null && _c !== void 0 ? _c : slots.message && slots.message()) !== null && _d !== void 0 ? _d : props.message)];
  };

  return noticeController;
}
//# sourceMappingURL=useToast.js.map