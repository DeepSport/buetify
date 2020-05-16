export type Transition = TransitionName | TransitionClasses;

export type TransitionName = string;

export interface TransitionClasses {
  css?: boolean;
  name?: TransitionName;
  enterFromClass?: string;
  enterActiveClass?: string;
  enterToClass?: string;
  leaveFromClass?: string;
  leaveActiveClass?: string;
  leaveToClass?: string;
}

export type TransitionMode = 'in-out' | 'out-in';
