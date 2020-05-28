import '../sass/notices.scss';
import {
  NoticeController,
  RenderNoticeOptions,
  useNoticeController,
  UseNoticePropsDefinition
} from '../../../composables/noticeController';
import { constant, constVoid, FunctionN } from 'fp-ts/lib/function';
import { IO } from 'fp-ts/lib/IO';
import { VNode, defineComponent, PropType, ExtractPropTypes, SetupContext, h, shallowRef } from 'vue';
import { alwaysEmptyArray } from '../../../utils/helpers';

export const BSnackbarPropsDefinition = {
  ...UseNoticePropsDefinition,
  actionText: {
    type: String as PropType<string>,
    default: 'OK'
  },
  onAction: {
    type: Function as PropType<IO<void>>,
    default: constant(constVoid)
  }
};

export type BSnackbarProps = ExtractPropTypes<typeof BSnackbarPropsDefinition>;

function generateMessage(context: SetupContext, message?: string): VNode {
  return h('p', { class: 'text' }, context.slots.message ? context.slots.message() : message);
}

function generateAction(
  props: BSnackbarProps,
  context: SetupContext,
  noticeController: NoticeController,
  options: RenderNoticeOptions
): VNode {
  return h(
    'div',
    {
      class: ['action', options.variant || props.variant, options.position || props.position]
    },
    [
      h(
        'button',
        {
          class: 'button',
          onClick: () => {
            props.onAction();
            noticeController.close();
          }
        },
        context.slots.action ? context.slots.action() : props.actionText
      )
    ]
  );
}

function getGenerateSnackbar(props: BSnackbarProps, context: SetupContext, noticeController: NoticeController) {
  return (options: RenderNoticeOptions) => () => {
    return [
      h(
        'article',
        {
          class: ['snackbar', options.position || props.position],
          role: 'alert'
        },
        [
          generateMessage(context, options.message ?? props.message),
          generateAction(props, context, noticeController, options)
        ]
      )
    ];
  };
}

export default defineComponent({
  name: 'b-snackbar',
  props: BSnackbarPropsDefinition,
  setup(props, context) {
    const renderNotification = shallowRef(constant(alwaysEmptyArray) as FunctionN<[RenderNoticeOptions], IO<VNode[]>>);
    const noticeController = useNoticeController(props, renderNotification);
    renderNotification.value = getGenerateSnackbar(props, context, noticeController);
    return () =>
      context.slots.default &&
      context.slots.default({
        open: noticeController.open,
        close: noticeController.close
      });
  }
});
