import "../../../../src/sass/helpers/animations.sass";
import "../../../../src/components/notices/sass/notices.sass";
import { constant } from 'fp-ts/lib/function';
import { useMessage, UseMessagePropsDefinition } from '../../../composables/message';
import { useNoticeController, UseNoticePropsDefinition } from '../../../composables/noticeController';
import { formatTransition } from '../../../composables/transition';
import { Transition, h, defineComponent, shallowRef, withDirectives, vShow } from 'vue';
import { constEmptyArray } from '../../../utils/helpers';
export const BNotificationPropsDefinition = { ...UseMessagePropsDefinition,
  ...UseNoticePropsDefinition,
  isNotice: {
    type: Boolean,
    default: false
  },
  icon: {
    type: Object
  }
};

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
  }, context.slots.default && context.slots.default() || h('p', message));
}

function generateNoticeBody(props, context, messageController, noticeController, message) {
  return h('div', {
    class: 'media'
  }, props.useIcon && messageController.icon.value ? [generateIcon(messageController), generateNoticeContent(context, message)] : [generateNoticeContent(context, message)]);
}

function getGenerateNotice(props, context, messageController, noticeController) {
  return options => () => {
    const notice = h('article', {
      class: ['notification', options.variant ?? props.variant, options.position ?? props.position]
    }, props.isClosable ? [generateCloseButton(props, messageController, noticeController), generateNoticeBody(props, context, messageController, noticeController, options.message ?? props.message)] : [generateNoticeBody(props, context, messageController, noticeController, options.message ?? props.message)]);
    return props.isNotice ? [notice] : [withDirectives(notice, [[vShow, messageController.isOn.value]])];
  };
}

export default defineComponent({
  name: 'b-notification',
  props: BNotificationPropsDefinition,

  setup(props, context) {
    const renderNotification = shallowRef(constant(constEmptyArray));
    const noticeController = useNoticeController(props, renderNotification);
    const messageController = useMessage(props);
    renderNotification.value = getGenerateNotice(props, context, messageController, noticeController);
    return () => props.isNotice ? context.slots.trigger && context.slots.trigger({
      open: noticeController.open,
      close: noticeController.close
    }) : h(Transition, props.transition ? formatTransition(props.transition) : {}, renderNotification.value({}));
  }

});
//# sourceMappingURL=BNotification.js.map