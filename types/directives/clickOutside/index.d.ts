import { VNodeDirective } from 'vue/types/vnode';
export interface ClickOutsideBindingArgs {
    closeConditional?: (e: Event) => boolean;
    include?: () => HTMLElement[];
}
interface ClickOutsideDirective extends VNodeDirective {
    value?: (e: Event) => void;
    args?: ClickOutsideBindingArgs;
}
export declare const ClickOutside: {
    inserted(el: HTMLElement, binding: ClickOutsideDirective): void;
    unbind(el: HTMLElement): void;
};
export default ClickOutside;
