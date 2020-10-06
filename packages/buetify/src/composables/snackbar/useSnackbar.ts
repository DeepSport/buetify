import { constant, constVoid, FunctionN } from 'fp-ts/lib/function';
import { IO } from 'fp-ts/lib/IO';
import { ExtractPropTypes, h, PropType, shallowRef, VNode, Slots } from 'vue';
import { ColorVariant, PositionVariant } from '../../types';
import { constEmptyArray } from '../../utils/helpers';
import {
  DEFAULT_USE_NOTICE_PROPS,
  NoticeController, OpenNoticeOptions,
  RenderNoticeOptions,
  useNoticeController,
  UseNoticePropsDefinition
} from '../noticeController';

export const SnackbarPropsDefinition = {
  ...UseNoticePropsDefinition,
  position: {
    type: String as PropType<PositionVariant>,
    default: 'is-bottom-right' as const
  },
  actionText: {
    type: String as PropType<string>,
    default: 'OK'
  },
  onAction: {
    type: Function as PropType<IO<void>>,
    default: constant(constVoid)
  },
  variant: {
    type: String as PropType<ColorVariant>,
    default: 'is-success' as const
  }
};

export interface SnackbarProps extends ExtractPropTypes<typeof SnackbarPropsDefinition> {}

export interface RenderSnackbarOptions extends RenderNoticeOptions, OpenNoticeOptions {
  onAction?: IO<void>;
  actionText?: string;
}

export interface OpenSnackbarOptions extends RenderSnackbarOptions {}

const DEFAULT_SNACKBAR_PROPS: SnackbarProps = {
  ...DEFAULT_USE_NOTICE_PROPS,
  variant: SnackbarPropsDefinition.variant.default,
  position: SnackbarPropsDefinition.position.default,
  actionText: SnackbarPropsDefinition.actionText.default,
  onAction: SnackbarPropsDefinition.onAction.default()
};

function generateMessage(slots: Slots, message?: string): VNode {
  return message
    ? h('p', { class: 'text', innerHTML: message })
    : h('p', { class: 'text' }, slots.message && slots.message());
}

function generateAction(
  props: SnackbarProps,
  slots: Slots,
  noticeController: NoticeController,
  options: RenderSnackbarOptions
): VNode {
  return h(
    'div',
    {
      class: ['action', options.variant ?? props.variant, options.position ?? props.position]
    },
    [
      h(
        'button',
        {
          class: 'button',
          onClick: () => {
            if (options.onAction) {
              options.onAction();
            } else {
              props.onAction();
            }
            console.log('closing controller');
            noticeController.close();
          }
        },
        slots.action ? slots.action(noticeController) : options.actionText ?? props.actionText
      )
    ]
  );
}

function getGenerateSnackbar(props: SnackbarProps, slots: Slots, noticeController: NoticeController) {
  return (options: RenderSnackbarOptions) => () => {
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

export interface SnackbarController extends NoticeController {
  open: FunctionN<[OpenSnackbarOptions], void>;
}

export function useSnackbar(props: SnackbarProps = DEFAULT_SNACKBAR_PROPS, slots: Slots = {}): SnackbarController {
  const renderNotification = shallowRef(constant(constEmptyArray) as FunctionN<[RenderNoticeOptions], IO<VNode[]>>);
  const controller = useNoticeController(props, renderNotification);
  renderNotification.value = getGenerateSnackbar(props, slots, controller);
  return controller;
}
