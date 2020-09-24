import "../../../../src/components/notices/sass/notices.scss";
import { constant } from 'fp-ts/lib/function';
import { useMessage, UseMessagePropsDefinition } from '../../../composables/message';
import { useNoticeController, UseNoticePropsDefinition } from '../../../composables/noticeController';
import { formatTransition } from '../../../composables/transition';
import { Transition, h, defineComponent, shallowRef, withDirectives, vShow } from 'vue';
import { alwaysEmptyArray } from '../../../utils/helpers';
export const BNotificationPropsDefinition = Object.assign(Object.assign(Object.assign({}, UseMessagePropsDefinition), UseNoticePropsDefinition), {
  isNotice: {
    type: Boolean,
    default: true
  }
});

function generateCloseButton(props, messageController, noticeController) {
  return h('button', {
    class: 'delete',
    onClick: props.isNotice ? noticeController.close : messageController.setOff
  });
}

function generateIcon(messageController) {
  return h('div', {
    class: 'media-left'
  }, [h(messageController.icon.value, {
    size: messageController.iconSize.value
  })]);
}

function generateNoticeContent(context, message) {
  return h('div', {
    class: 'media-content'
  }, context.slots.message && context.slots.message() || h('p', message));
}

function generateNoticeBody(props, context, messageController, noticeController, message) {
  return h('div', {
    class: 'media'
  }, props.useIcon && messageController.icon.value ? [generateIcon(messageController), generateNoticeContent(context, message)] : [generateNoticeContent(context, message)]);
}

function getGenerateNotice(props, context, messageController, noticeController) {
  return options => () => {
    var _a, _b, _c, _d;

    const notice = h('article', {
      class: ['notification', (_a = options.variant) !== null && _a !== void 0 ? _a : props.variant, (_b = options.position) !== null && _b !== void 0 ? _b : props.position]
    }, props.isClosable ? [generateCloseButton(props, messageController, noticeController), generateNoticeBody(props, context, messageController, noticeController, (_c = options.message) !== null && _c !== void 0 ? _c : props.message)] : [generateNoticeBody(props, context, messageController, noticeController, (_d = options.message) !== null && _d !== void 0 ? _d : props.message)]);
    return props.isNotice ? [notice] : [withDirectives(notice, [[vShow, messageController.isOn.value]])];
  };
}

export default defineComponent({
  name: 'b-notification',
  props: BNotificationPropsDefinition,

  setup(props, context) {
    const renderNotification = shallowRef(constant(alwaysEmptyArray));
    const noticeController = useNoticeController(props, renderNotification);
    const messageController = useMessage(props);
    renderNotification.value = getGenerateNotice(props, context, messageController, noticeController);
    return () => props.isNotice ? context.slots.default && context.slots.default({
      open: noticeController.open,
      close: noticeController.close
    }) : h(Transition, props.transition ? formatTransition(props.transition) : {}, renderNotification.value({})());
  }

});
//# sourceMappingURL=BNotification.js.map