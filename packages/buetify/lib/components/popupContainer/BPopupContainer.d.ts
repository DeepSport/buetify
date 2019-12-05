import { Eq } from 'fp-ts/lib/Eq';
import { IO } from 'fp-ts/lib/IO';
import { VNode } from 'vue';
import { Transition, TransitionClasses } from '../../types/Transition';
export interface PopupOptions {
    transition: Transition;
    render: IO<VNode[]>;
}
export interface Popup extends PopupOptions {
    transition: TransitionClasses;
    id: number;
}
export declare const eqPopup: Eq<Popup>;
export declare const removePopup: (a: Popup, as: Popup[]) => Popup[];
declare const BPopupContainer: import("vue").DefineComponent<{}, {
    showPopup: (options: PopupOptions) => IO<void>;
    popups: {
        transition: {
            css?: boolean | undefined;
            name?: string | undefined;
            'enter-from-class'?: string | undefined;
            'enter-active-class'?: string | undefined;
            'enter-to-class'?: string | undefined;
            'leave-from-class'?: string | undefined;
            'leave-active-class'?: string | undefined;
            'leave-to-class'?: string | undefined;
        };
        id: number;
        render: IO<VNode[]>;
    }[];
    rootZ: import("vue").ComputedRef<1 | -1>;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, import("vue").EmitsOptions, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{} & {}>, {}>;
export declare type PopupContainer = InstanceType<typeof BPopupContainer>;
export default BPopupContainer;
