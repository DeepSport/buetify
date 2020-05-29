import './dialog.sass';
import { usePopupController, UsePopupControllerPropsDefinition } from '../../composables/popupController';
import { alwaysEmptyArray } from '../../utils/helpers';
import BDialogContent from './BDialogContent';
import BDialogOverlay from './BDialogOverlay';
import { defineComponent, shallowRef, h } from 'vue';
export default defineComponent({
    name: 'b-dialog',
    props: UsePopupControllerPropsDefinition,
    setup(props, { attrs, slots }) {
        const generateDialog = shallowRef(alwaysEmptyArray);
        const popup = usePopupController(props, generateDialog);
        generateDialog.value = () => {
            return [
                h(BDialogOverlay, {
                    isActive: true,
                    onClose: popup.close,
                    slots: {
                        $stable: true,
                        default: () => h(BDialogContent, {
                            ...attrs,
                            slots: {
                                $stable: true,
                                header: () => slots.header && slots.header(popup),
                                default: () => slots.default && slots.default(popup),
                                footer: () => slots.footer && slots.footer(popup)
                            }
                        })
                    }
                })
            ];
        };
        return () => (slots.trigger ? slots.trigger(popup) : []);
    }
});
//# sourceMappingURL=BDialog.js.map