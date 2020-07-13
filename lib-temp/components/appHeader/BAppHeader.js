import './app-header.sass';
import { isSome } from 'fp-ts/lib/Option';
import { useNavigationDrawerController } from '../../composables/navigationDrawerController';
import { h } from 'vue';
import { mergeClasses } from '../../utils/mergeClasses';
function generateMainSlot(injection, includeClickHandler, slots) {
    return h('div', Object.assign({ class: 'main-slot' }, (includeClickHandler && isSome(injection.listeners.value)
        ? { onClick: injection.listeners.value.value.onClick }
        : {})), slots.default());
}
function generateNavigationButton(injection, slots) {
    const listeners = isSome(injection.listeners.value) ? injection.listeners.value.value : {};
    const attrs = isSome(injection.listeners.value) ? injection.listeners.value.value : {};
    return h('button', Object.assign(Object.assign(Object.assign({ class: 'navigation-icon is-hidden-desktop' }, listeners), attrs), { 'aria-label': 'Toggle navigation pane' }), slots.trigger ? slots.trigger({ isVisible: injection.isVisible.value }) : []);
}
export default function (_, { attrs, slots }) {
    const navigationDrawerController = useNavigationDrawerController();
    return h('header', Object.assign(Object.assign({}, attrs), { class: mergeClasses(attrs.class, 'b-app-header is-flex flex-direction-row justify-content-center align-items-center') }), [
        generateNavigationButton(navigationDrawerController, slots),
        generateMainSlot(navigationDrawerController, !navigationDrawerController.isVisible.value, slots)
    ]);
}
//# sourceMappingURL=BAppHeader.js.map