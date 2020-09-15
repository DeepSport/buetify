import { constant, constVoid } from 'fp-ts/lib/function';
import { IO } from 'fp-ts/lib/IO';
import { provide, VNode } from 'vue';
import { Transition } from '../../types/Transition';
import { Remove } from '../shared';

export const POPUP_CONTROLLER_SYMBOL = Symbol('popup-controller');

export interface ShowPopupOptions {
  render: IO<VNode[]>;
  transition?: Transition;
}

export interface PopupControllerInjection {
  showPopup: (options: ShowPopupOptions) => Remove;
}

export const DEFAULT_POPUP_CONTROLLER_INJECTION: PopupControllerInjection = {
  showPopup: constant(constVoid)
};

export function providePopupController(showPopup: (options: ShowPopupOptions) => Remove) {
  const injection: PopupControllerInjection = {
    showPopup
  };

  provide(POPUP_CONTROLLER_SYMBOL, injection);
  return injection;
}
