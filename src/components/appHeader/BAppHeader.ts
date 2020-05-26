import './app-header.sass';
import { isSome } from 'fp-ts/lib/Option';
import {
  NavigationDrawerControllerInjection,
  useNavigationDrawerController
} from '../../composables/navigationDrawerController';
import { SetupContext, h, Slots } from 'vue';
import { Classes, mergeClasses } from '../../utils/mergeClasses';

function generateMainSlot(injection: NavigationDrawerControllerInjection, includeClickHandler: boolean, slots: Slots) {
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

function generateNavigationButton(injection: NavigationDrawerControllerInjection, slots: Slots) {
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
    slots.trigger ? slots.trigger({ isVisible: injection.isVisible.value }) : []
  );
}

export default function(_: any, { attrs, slots }: SetupContext) {
  const navigationDrawerController = useNavigationDrawerController();
  return h(
    'header',
    {
      ...attrs,
      class: mergeClasses(
        attrs.class as Classes,
        'b-app-header is-flex flex-direction-row justify-content-center align-items-center'
      )
    },
    [
      generateNavigationButton(navigationDrawerController, slots),
      generateMainSlot(navigationDrawerController, !navigationDrawerController.isVisible.value, slots)
    ]
  );
}
