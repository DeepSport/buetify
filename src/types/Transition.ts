export type Transition = TransitionName | TransitionClasses;

export type TransitionName = string;

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
