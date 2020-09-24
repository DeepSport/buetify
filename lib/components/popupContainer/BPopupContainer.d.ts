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
declare const BPopupContainer: (new () => import("vue").ComponentPublicInstance<{}, {}, {
    id: number;
    popups: Popup[];
}, {
    rootZIndex(): -1 | 1;
}, {
    showPopup(options: PopupOptions): IO<void>;
    addPopup(popup: Popup): void;
    removePopup(popup: Popup): void;
    generatePopup(popup: Popup, index: number): VNode;
}, Record<string, any>, import("vue").VNodeProps, import("vue").ComponentOptionsBase<{}, {}, {
    id: number;
    popups: Popup[];
}, {
    rootZIndex(): -1 | 1;
}, {
    showPopup(options: PopupOptions): IO<void>;
    addPopup(popup: Popup): void;
    removePopup(popup: Popup): void;
    generatePopup(popup: Popup, index: number): VNode;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string>>) & import("vue").ComponentOptionsBase<{}, {}, {
    id: number;
    popups: Popup[];
}, {
    rootZIndex(): -1 | 1;
}, {
    showPopup(options: PopupOptions): IO<void>;
    addPopup(popup: Popup): void;
    removePopup(popup: Popup): void;
    generatePopup(popup: Popup, index: number): VNode;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string> & {
    props?: undefined;
} & ThisType<import("vue").ComponentPublicInstance<{}, {}, {
    id: number;
    popups: Popup[];
}, {
    rootZIndex(): -1 | 1;
}, {
    showPopup(options: PopupOptions): IO<void>;
    addPopup(popup: Popup): void;
    removePopup(popup: Popup): void;
    generatePopup(popup: Popup, index: number): VNode;
}, Record<string, any>, Readonly<{}>, import("vue").ComponentOptionsBase<{}, {}, {
    id: number;
    popups: Popup[];
}, {
    rootZIndex(): -1 | 1;
}, {
    showPopup(options: PopupOptions): IO<void>;
    addPopup(popup: Popup): void;
    removePopup(popup: Popup): void;
    generatePopup(popup: Popup, index: number): VNode;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string>>>;
export declare type PopupContainer = InstanceType<typeof BPopupContainer>;
export default BPopupContainer;
