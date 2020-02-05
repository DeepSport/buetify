import { VNodeDirective, VNode } from 'vue/types/vnode';
export interface TouchStoredHandlers {
    touchstart: (e: TouchEvent) => void;
    touchend: (e: TouchEvent) => void;
    touchmove: (e: TouchEvent) => void;
}
interface TouchHandlers {
    start?: (wrapperEvent: TouchEvent & TouchWrapper) => void;
    end?: (wrapperEvent: TouchEvent & TouchWrapper) => void;
    move?: (wrapperEvent: TouchEvent & TouchWrapper) => void;
    left?: (wrapper: TouchWrapper) => void;
    right?: (wrapper: TouchWrapper) => void;
    up?: (wrapper: TouchWrapper) => void;
    down?: (wrapper: TouchWrapper) => void;
}
export interface TouchWrapper extends TouchHandlers {
    touchstartX: number;
    touchstartY: number;
    touchmoveX: number;
    touchmoveY: number;
    touchendX: number;
    touchendY: number;
    offsetX: number;
    offsetY: number;
}
interface TouchVNodeDirective extends VNodeDirective {
    value?: TouchHandlers & {
        parent?: boolean;
        options?: AddEventListenerOptions;
    };
}
declare function inserted(el: HTMLElement, binding: TouchVNodeDirective, vnode: VNode): void;
declare function unbind(el: HTMLElement, binding: TouchVNodeDirective, vnode: VNode): void;
export declare const Touch: {
    inserted: typeof inserted;
    unbind: typeof unbind;
};
export default Touch;
