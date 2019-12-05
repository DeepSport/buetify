import { constant, constVoid } from 'fp-ts/lib/function';
import { provide } from 'vue';
export const NOTICE_CONTROLLER_SYMBOL = Symbol('notice-controller');
export const DEFAULT_NOTICE_CONTROLLER_INJECTION = {
  showNotice: constant(constVoid)
};
export function provideNoticeController(showNotice) {
  const injection = {
    showNotice
  };
  provide(NOTICE_CONTROLLER_SYMBOL, injection);
  return injection;
}
//# sourceMappingURL=provideNoticeController.js.map