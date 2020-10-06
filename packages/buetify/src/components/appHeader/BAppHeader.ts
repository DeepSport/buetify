import './app-header.sass';
import { isSome } from 'fp-ts/lib/Option';
import { SetupContext, h, Slots } from 'vue';
import BNavbarBurger from '../navbar/BNavbarBurger';
import {SidebarController, useSidebarController} from '../sidebar/composables';

function generateMainSlot(injection: SidebarController, includeClickHandler: boolean, slots: Slots) {
  return h(
    'div',
    {
      class: 'main-slot',
      ...(includeClickHandler && isSome(injection.listeners.value)
        ? { onClick: injection.listeners.value.value.onClick }
        : {})
    },
    slots.default!()
  );
}

function generateNavigationButton(injection: SidebarController, slots: Slots) {
  const listeners = isSome(injection.listeners.value) ? injection.listeners.value.value : {};
  const attrs = isSome(injection.listeners.value) ? injection.listeners.value.value : {};
  return h(
    'button',
    {
      class: 'navigation-icon is-hidden-desktop',
      ...listeners,
      ...attrs,
      'aria-label': 'Toggle navigation pane'
    },
    slots.trigger
      ? slots.trigger!({ isVisible: injection.isVisible.value })
      : h(BNavbarBurger, { isActive: !injection.isVisible.value })
  );
}

export default function(_: any, { attrs, slots }: SetupContext) {
  const sidebarController = useSidebarController();
  const isInvisible = !sidebarController.isVisible.value;
  return h(
    'header',
    {
      ...attrs,
      class: [
        'b-app-header is-flex flex-direction-row justify-content-center align-items-center',
        {
          'has-navigation': isInvisible
        }
      ]
    },
    [
      generateNavigationButton(sidebarController, slots),
      generateMainSlot(sidebarController, isInvisible, slots)
    ]
  );
}
