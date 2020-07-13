import { constant, constVoid } from 'fp-ts/lib/function';
import { h, shallowRef } from 'vue';
import { alwaysEmptyArray } from '../../utils/helpers';
import { DEFAULT_USE_NOTICE_PROPS, useNoticeController, UseNoticePropsDefinition } from '../noticeController';
export const SnackbarPropsDefinition = Object.assign(Object.assign({}, UseNoticePropsDefinition), { actionText: {
        type: String,
        default: 'OK'
    }, onAction: {
        type: Function,
        default: constant(constVoid)
    } });
const DEFAULT_SNACKBAR_PROPS = Object.assign(Object.assign({}, DEFAULT_USE_NOTICE_PROPS), { actionText: SnackbarPropsDefinition.actionText.default, onAction: SnackbarPropsDefinition.onAction.default() });
function generateMessage(slots, message) {
    return h('p', { class: 'text' }, slots.message ? slots.message() : message);
}
function generateAction(props, slots, noticeController, options) {
    return h('div', {
        class: ['action', options.variant || props.variant, options.position || props.position]
    }, [
        h('button', {
            class: 'button',
            onClick: () => {
                props.onAction();
                noticeController.close();
            }
        }, slots.action ? slots.action() : props.actionText)
    ]);
}
function getGenerateSnackbar(props, slots, noticeController) {
    return (options) => () => {
        var _a;
        return [
            h('article', {
                class: ['snackbar', options.position || props.position],
                role: 'alert'
            }, [
                generateMessage(slots, (_a = options.message) !== null && _a !== void 0 ? _a : props.message),
                generateAction(props, slots, noticeController, options)
            ])
        ];
    };
}
export function useSnackbar(props = DEFAULT_SNACKBAR_PROPS, slots = {}) {
    const renderNotification = shallowRef(constant(alwaysEmptyArray));
    const controller = useNoticeController(props, renderNotification);
    renderNotification.value = getGenerateSnackbar(props, slots, controller);
    return controller;
}
//# sourceMappingURL=useSnackbar.js.map