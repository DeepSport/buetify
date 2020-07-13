import './loading.sass';
import { usePopupController, UsePopupControllerPropsDefinition } from '../../composables/popupController';
import { useToggle } from '../../composables/toggle';
import { isEscEvent } from '../../utils/eventHelpers';
import { h, defineComponent, shallowRef, Transition, onMounted, onUnmounted } from 'vue';
import { alwaysEmptyArray } from '../../utils/helpers';
export const BLoadingPropsDefinition = Object.assign(Object.assign({}, UsePopupControllerPropsDefinition), { isFullscreen: {
        type: Boolean,
        default: false
    }, canCancel: {
        type: Boolean,
        default: false
    } });
function getGenerateModal(onClick) {
    return () => [
        h('div', { class: 'b-loading-overlay is-active is-fullscreen' }, [
            h('div', {
                class: 'loading-background',
                onClick
            }),
            h('div', { class: 'loading-icon' })
        ])
    ];
}
export default defineComponent({
    name: 'b-loading',
    props: BLoadingPropsDefinition,
    setup(props, { slots }) {
        if (props.isFullscreen) {
            const generateLoadingPopup = shallowRef(alwaysEmptyArray);
            const popup = usePopupController(props, generateLoadingPopup);
            function onClick() {
                if (props.canCancel && popup.isOpen.value) {
                    popup.close();
                }
            }
            function onKeyup(e) {
                if (isEscEvent(e)) {
                    onClick();
                }
            }
            onMounted(() => {
                if (typeof window !== 'undefined') {
                    document.addEventListener('keyup', onKeyup);
                }
            });
            onUnmounted(() => {
                if (typeof window !== 'undefined') {
                    document.removeEventListener('keyup', onKeyup);
                }
            });
            generateLoadingPopup.value = getGenerateModal(onClick);
            return () => (slots.trigger ? slots.trigger(popup) : []);
        }
        else {
            const toggle = useToggle(props, 'isActive');
            function onClick() {
                if (props.canCancel && toggle.isOn.value) {
                    toggle.setOff();
                }
            }
            const render = getGenerateModal(onClick);
            return () => h(Transition, { name: props.transition }, toggle.isOn.value && render());
        }
    }
});
//# sourceMappingURL=BLoading.js.map