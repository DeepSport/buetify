import { constant } from 'fp-ts/lib/function';
import { useNoticeController, UseNoticePropsDefinition } from '../../../composables/noticeController';
import { defineComponent, shallowRef, h } from 'vue';
import { alwaysEmptyArray } from '../../../utils/helpers';
export default defineComponent({
    name: 'b-toast',
    props: UseNoticePropsDefinition,
    setup(props, { slots }) {
        const renderNotification = shallowRef(constant(alwaysEmptyArray));
        const noticeController = useNoticeController(props, renderNotification);
        renderNotification.value = options => () => {
            return [
                h('div', {
                    class: ['toast', options.variant ?? props.variant, options.position ?? props.position],
                    role: 'alert'
                }, options.message ?? (slots.message && slots.message()) ?? props.message)
            ];
        };
        return () => slots.default &&
            slots.default({
                open: noticeController.open,
                clsoe: noticeController.close
            });
    }
});
//# sourceMappingURL=BToast.js.map