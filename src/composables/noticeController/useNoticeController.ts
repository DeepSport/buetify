import { inject } from 'vue';
import { DEFAULT_NOTICE_CONTROLLER_INJECTION, NOTICE_CONTROLLER_SYMBOL } from './provideNoticeController';

export function useNoticeController() {
  return inject(NOTICE_CONTROLLER_SYMBOL, DEFAULT_NOTICE_CONTROLLER_INJECTION);
}
