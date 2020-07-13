import './fullscreen-modal.sass';
import { usePopupController, UsePopupControllerPropsDefinition } from '../../composables/popupController';
import { alwaysEmptyArray } from '../../utils/helpers';
import BOverlay from '../overlay/BOverlay';
import BSheet from '../sheet/BSheet';
import { defineComponent, shallowRef, h } from 'vue';
function generateTitle(slots) {
    return h('div', { class: 'main-slot' }, slots.title());
}
function generateCloseButton(popupController, slots) {
    return h('button', Object.assign({ class: 'navigation-icon has-text-link-hover', 'aria-label': 'Close' }, popupController.listeners), slots.close());
}
function generateHeader(popupController, slots) {
    return h('header', {
        class: 'b-app-header is-flex flex-direction-row justify-content-center align-items-center'
    }, slots.header ? slots.header(popupController) : [generateCloseButton(popupController, slots), generateTitle(slots)]);
}
function generateContent(popupController, slots) {
    const nodes = slots.default();
    if (slots.header || slots.title) {
        nodes.unshift(generateHeader(popupController, slots));
    }
    return h(BSheet, { class: 'is-fullheight', tag: 'article' }, nodes);
}
function generateModal(popupController, slots) {
    return h(BOverlay, {
        isFullscreen: true,
        isActive: true
    }, [generateContent(popupController, slots)]);
}
export default defineComponent({
    name: 'b-fullscreen-modal',
    props: UsePopupControllerPropsDefinition,
    setup(props, { slots, attrs }) {
        const render = shallowRef(alwaysEmptyArray);
        const popupController = usePopupController(props, render);
        render.value = () => {
            return [generateModal(popupController, slots)];
        };
        return () => (slots.trigger ? slots.trigger(popupController) : []);
    }
});
//# sourceMappingURL=BFullscreenModal.js.map