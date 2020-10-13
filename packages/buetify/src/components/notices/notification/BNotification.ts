import '../sass/notices.sass';
import { constant, FunctionN } from 'fp-ts/lib/function';
import { IO } from 'fp-ts/lib/IO';
import { Message, useMessage, UseMessagePropsDefinition } from '../../../composables/message';
import {
  NoticeController,
  OpenNoticeOptions,
  RenderNoticeOptions,
  useNoticeController,
  UseNoticePropsDefinition
} from '../../../composables/noticeController';
import { formatTransition } from '../../../composables/transition';
import {
  Transition,
  VNode,
  h,
  PropType,
  defineComponent,
  ExtractPropTypes,
  shallowRef,
  withDirectives,
  SetupContext,
  vShow,
  Component
} from 'vue';
import { constEmptyArray } from '../../../utils/helpers';

export const BNotificationPropsDefinition = {
  ...UseMessagePropsDefinition,
  ...UseNoticePropsDefinition,
  isNotice: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  icon: {
    type: Object as PropType<Component>
  }
};

export type BNotificationProps = ExtractPropTypes<typeof BNotificationPropsDefinition>;

function generateCloseButton(
  props: BNotificationProps,
  messageController: Message,
  noticeController: NoticeController
): VNode {
  return h('button', {
    class: 'delete',
    onClick: props.isNotice ? noticeController.close : messageController.setOff
  });
}

function generateIcon(messageController: Message): VNode {
  return h('div', { class: 'media-left' }, [
    h(messageController.icon.value as any, { size: messageController.iconSize.value })
  ]);
}

function generateNoticeContent(context: SetupContext, message?: string): VNode {
  return h('div', { class: 'media-content' }, (context.slots.default && context.slots.default()) || h('p', message));
}

function generateNoticeBody(
  props: BNotificationProps,
  context: SetupContext,
  messageController: Message,
  noticeController: NoticeController,
  message?: string
): VNode {
  return h(
    'div',
    { class: 'media' },
    props.useIcon && messageController.icon.value
      ? [generateIcon(messageController), generateNoticeContent(context, message)]
      : [generateNoticeContent(context, message)]
  );
}

function getGenerateNotice(
  props: BNotificationProps,
  context: SetupContext,
  messageController: Message,
  noticeController: NoticeController
) {
  return (options: OpenNoticeOptions) => () => {
    const notice = h(
      'article',
      {
        class: ['notification', options.variant ?? props.variant, options.position ?? props.position]
      },
      props.isClosable
        ? [
            generateCloseButton(props, messageController, noticeController),
            generateNoticeBody(props, context, messageController, noticeController, options.message ?? props.message)
          ]
        : [generateNoticeBody(props, context, messageController, noticeController, options.message ?? props.message)]
    );
    return props.isNotice ? [notice] : [withDirectives(notice, [[vShow, messageController.isOn.value]])];
  };
}

export default defineComponent({
  name: 'b-notification',
  props: BNotificationPropsDefinition,
  setup(props, context) {
    const renderNotification = shallowRef(constant(constEmptyArray) as FunctionN<[RenderNoticeOptions], IO<VNode[]>>);
    const noticeController = useNoticeController(props, renderNotification);
    const messageController = useMessage(props);
    renderNotification.value = getGenerateNotice(props, context, messageController, noticeController);
    return () =>
      props.isNotice
        ? context.slots.trigger && context.slots.trigger({ open: noticeController.open, close: noticeController.close })
        : h(Transition, props.transition ? formatTransition(props.transition) : {}, renderNotification.value({}));
  }
});
