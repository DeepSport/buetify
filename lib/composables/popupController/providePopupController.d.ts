import { IO } from 'fp-ts/lib/IO';
import { VNode } from 'vue';
import { Transition } from '../../types/Transition';
import { Remove } from '../shared';
export declare const POPUP_CONTROLLER_SYMBOL: unique symbol;
export interface ShowPopupOptions {
    render: IO<VNode[]>;
    transition?: Transition;
}
export interface PopupControllerInjection {
    showPopup: (options: ShowPopupOptions) => Remove;
}
export declare const DEFAULT_POPUP_CONTROLLER_INJECTION: PopupControllerInjection;
export declare function providePopupController(showPopup: (options: ShowPopupOptions) => Remove): PopupControllerInjection;
