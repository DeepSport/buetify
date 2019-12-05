import { constant, constVoid } from 'fp-ts/lib/function';
import { h, shallowRef } from 'vue';
import { constEmptyArray } from '../../utils/helpers';
import { DEFAULT_USE_NOTICE_PROPS, useNoticeController, UseNoticePropsDefinition } from '../noticeController';
export const SnackbarPropsDefinition = { ...UseNoticePropsDefinition,
  position: {
    type: String,
    default: 'is-bottom-right'
  },
  actionText: {
    type: String,
    default: 'OK'
  },
  onAction: {
    type: Function,
    default: constant(constVoid)
  },
  variant: {
    type: String,
    default: 'is-success'
  }
};
const DEFAULT_SNACKBAR_PROPS = { ...DEFAULT_USE_NOTICE_PROPS,
  variant: SnackbarPropsDefinition.variant.default,
  position: SnackbarPropsDefinition.position.default,
  actionText: SnackbarPropsDefinition.actionText.default,
  onAction: SnackbarPropsDefinition.onAction.default()
};

function generateMessage(slots, message) {
  return message ? h('p', {
    class: 'text',
    innerHTML: message
  }) : h('p', {
    class: 'text'
  }, slots.message && slots.message());
}

function generateAction(props, slots, noticeController, options) {
  return h('div', {
    class: ['action', options.variant ?? props.variant, options.position ?? props.position]
  }, [h('button', {
    class: 'button',
    onClick: () => {
      if (options.onAction) {
        options.onAction();
      } else {
        props.onAction();
      }

      noticeController.close();
    }
  }, slots.action ? slots.action(noticeController) : options.actionText ?? props.actionText)]);
}

function getGenerateSnackbar(props, slots, noticeController) {
  return options => () => {
    return [h('article', {
      class: ['snackbar', options.position || props.position],
      role: 'alert'
    }, [generateMessage(slots, options.message ?? props.message), generateAction(props, slots, noticeController, options)])];
  };
}

export function useSnackbar(props = DEFAULT_SNACKBAR_PROPS, slots = {}) {
  const renderNotification = shallowRef(constant(constEmptyArray));
  const controller = useNoticeController(props, renderNotification);
  renderNotification.value = getGenerateSnackbar(props, slots, controller);
  return controller;
}
//# sourceMappingURL=useSnackbar.js.map