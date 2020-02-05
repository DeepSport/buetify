export declare type Transition = TransitionName | TransitionClasses;
export declare type TransitionName = string;
export interface TransitionClasses {
    css?: boolean;
    name?: TransitionName;
    enterClass?: string;
    enterActiveClass?: string;
    enterToClass?: string;
    leaveClass?: string;
    leaveActiveClass?: string;
    leaveToClass?: string;
}
