import { constant, constVoid, FunctionN } from 'fp-ts/lib/function';
import { IO } from 'fp-ts/lib/IO';
import { ExtractPropTypes, h, PropType, shallowRef, VNode, Slots } from 'vue';
import { alwaysEmptyArray } from '../../utils/helpers';
import {
  DEFAULT_USE_NOTICE_PROPS,
  NoticeController,
  RenderNoticeOptions,
  useNoticeController,
  UseNoticePropsDefinition
} from '../noticeController';

export const SnackbarPropsDefinition = {
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

export interface SnackbarProps extends ExtractPropTypes<typeof SnackbarPropsDefinition> {};

const DEFAULT_SNACKBAR_PROPS: SnackbarProps = {
  ...DEFAULT_USE_NOTICE_PROPS,
  actionText: SnackbarPropsDefinition.actionText.default,
  onAction: SnackbarPropsDefinition.onAction.default()
}

function generateMessage(slots: Slots, message?: string): VNode {
  return h('p', { class: 'text' }, slots.message ? slots.message() : message);
}

function generateAction(
  props: SnackbarProps,
  slots: Slots,
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
        slots.action ? slots.action() : props.actionText
      )
    ]
  );
}

function getGenerateSnackbar(props: SnackbarProps, slots: Slots, noticeController: NoticeController) {
  return (options: RenderNoticeOptions) => () => {
    return [
      h(
        'article',
        {
          class: ['snackbar', options.position || props.position],
          role: 'alert'
        },
        [
          generateMessage(slots, options.message ?? props.message),
          generateAction(props, slots, noticeController, options)
        ]
      )
    ];
  };
}

export function useSnackbar(props: SnackbarProps = DEFAULT_SNACKBAR_PROPS, slots: Slots = {}) {
  const renderNotification = shallowRef(constant(alwaysEmptyArray) as FunctionN<[RenderNoticeOptions], IO<VNode[]>>);
  const controller = useNoticeController(props, renderNotification);
  renderNotification.value = getGenerateSnackbar(props, slots, controller);
  return controller;
}
