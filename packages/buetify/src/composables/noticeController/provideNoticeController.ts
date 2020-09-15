import { constant, constVoid } from 'fp-ts/lib/function';
import { IO } from 'fp-ts/lib/IO';
import { provide, VNode } from 'vue';
import { NoticePlacement } from '../../types/NoticePlacement';
import { Transition } from '../../types/Transition';
import { Remove } from '../shared';

export const NOTICE_CONTROLLER_SYMBOL = Symbol('notice-controller');

export interface ShowNoticeOptions {
  render: IO<VNode[]>;
  placement: NoticePlacement;
  duration: number;
  shouldQueue: boolean;
  transition?: Transition;
}

export interface NoticeControllerInjection {
  showNotice: (options: ShowNoticeOptions) => Remove;
}

export const DEFAULT_NOTICE_CONTROLLER_INJECTION: NoticeControllerInjection = {
  showNotice: constant(constVoid)
};

export function provideNoticeController(showNotice: (options: ShowNoticeOptions) => Remove) {
  const injection: NoticeControllerInjection = {
    showNotice
  };

  provide(NOTICE_CONTROLLER_SYMBOL, injection);
  return injection;
}
