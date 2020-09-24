import { Directive } from 'vue';
interface HTMLElement {
    _clickOutside?: EventListenerOrEventListenerObject;
}
export interface ClickOutsideBindingArgs {
    closeConditional?: (e: Event) => boolean;
    include?: () => HTMLElement[];
}
export interface ClickOutsideDirective {
    value?: (e: Event) => void;
    args?: ClickOutsideBindingArgs;
}
export declare const ClickOutside: Directive;
export default ClickOutside;
