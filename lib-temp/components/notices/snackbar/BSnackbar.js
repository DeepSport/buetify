import '../sass/notices.scss';
import { useNoticeController, UseNoticePropsDefinition } from '../../../composables/noticeController';
import { constant, constVoid } from 'fp-ts/lib/function';
import { defineComponent, h, shallowRef } from 'vue';
import { alwaysEmptyArray } from '../../../utils/helpers';
export const BSnackbarPropsDefinition = {
    ...UseNoticePropsDefinition,
    actionText: {
        type: String,
        default: 'OK'
    },
    onAction: {
        type: Function,
        default: constant(constVoid)
    }
};
function generateMessage(context, message) {
    return h('p', { class: 'text' }, context.slots.message ? context.slots.message() : message);
}
function generateAction(props, context, noticeController, options) {
    return h('div', {
        class: ['action', options.variant || props.variant, options.position || props.position]
    }, [
        h('button', {
            class: 'button',
            onClick: () => {
                props.onAction();
                noticeController.close();
            }
        }, context.slots.action ? context.slots.action() : props.actionText)
    ]);
}
function getGenerateSnackbar(props, context, noticeController) {
    return (options) => () => {
        return [
            h('article', {
                class: ['snackbar', options.position || props.position],
                role: 'alert'
            }, [
                generateMessage(context, options.message ?? props.message),
                generateAction(props, context, noticeController, options)
            ])
        ];
    };
}
export default defineComponent({
    name: 'b-snackbar',
    props: BSnackbarPropsDefinition,
    setup(props, context) {
        const renderNotification = shallowRef(constant(alwaysEmptyArray));
        const noticeController = useNoticeController(props, renderNotification);
        renderNotification.value = getGenerateSnackbar(props, context, noticeController);
        return () => context.slots.default &&
            context.slots.default({
                open: noticeController.open,
                close: noticeController.close
            });
    }
});
//# sourceMappingURL=BSnackbar.js.map