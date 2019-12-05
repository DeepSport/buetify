import { constant, constVoid } from 'fp-ts/lib/function';
import { provide } from 'vue';
export const POPUP_CONTROLLER_SYMBOL = Symbol('popup-controller');
export const DEFAULT_POPUP_CONTROLLER_INJECTION = {
  showPopup: constant(constVoid)
};
export function providePopupController(showPopup) {
  const injection = {
    showPopup
  };
  provide(POPUP_CONTROLLER_SYMBOL, injection);
  return injection;
}
//# sourceMappingURL=providePopupController.js.map