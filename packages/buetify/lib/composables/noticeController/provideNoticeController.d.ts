import { IO } from 'fp-ts/lib/IO';
import { VNode } from 'vue';
import { NoticePlacement } from '../../types/NoticePlacement';
import { Transition } from '../../types/Transition';
import { Remove } from '../shared';
export declare const NOTICE_CONTROLLER_SYMBOL: unique symbol;
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
export declare const DEFAULT_NOTICE_CONTROLLER_INJECTION: NoticeControllerInjection;
export declare function provideNoticeController(showNotice: (options: ShowNoticeOptions) => Remove): NoticeControllerInjection;
