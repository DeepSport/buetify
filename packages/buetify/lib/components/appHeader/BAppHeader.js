import "../../../src/components/appHeader/app-header.sass";
import "../../../src/sass/helpers/flex-helpers.sass";
import { isSome } from 'fp-ts/lib/Option';
import { h } from 'vue';
import BNavbarBurger from '../navbar/BNavbarBurger';
import { useSidebarController } from '../sidebar/composables';

function generateMainSlot(injection, includeClickHandler, slots) {
  return h('div', {
    class: 'main-slot',
    ...(includeClickHandler && isSome(injection.listeners.value) ? {
      onClick: injection.listeners.value.value.onClick
    } : {})
  }, slots.default());
}

function generateNavigationButton(injection, slots) {
  const listeners = isSome(injection.listeners.value) ? injection.listeners.value.value : {};
  const attrs = isSome(injection.attrs.value) ? injection.attrs.value.value : {};
  return h('button', {
    class: 'navigation-icon is-hidden-desktop',
    ...listeners,
    ...attrs,
    'aria-label': 'Toggle navigation pane'
  }, slots.trigger ? slots.trigger({
    isVisible: injection.isVisible.value
  }) : h(BNavbarBurger, {
    tag: 'span',
    isActive: injection.isVisible.value
  }));
}

export default function (props, {
  slots
}) {
  const sidebarController = useSidebarController();
  const isInvisible = !sidebarController.isVisible.value;
  return h(props.tag ?? 'header', {
    class: 'b-app-header is-flex flex-direction-row justify-content-center align-items-center has-navigation'
  }, [generateNavigationButton(sidebarController, slots), generateMainSlot(sidebarController, isInvisible, slots)]);
}
//# sourceMappingURL=BAppHeader.js.map