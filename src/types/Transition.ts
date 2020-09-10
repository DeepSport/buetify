export type Transition = TransitionName | TransitionClasses;

export type TransitionName = string;

export interface TransitionClasses {
	css?: boolean;
	name?: TransitionName;
	'enter-from-class'?: string;
	'enter-active-class'?: string;
	'enter-to-class'?: string;
	'leave-from-class'?: string;
	'leave-active-class'?: string;
	'leave-to-class'?: string;
}

export type TransitionMode = 'in-out' | 'out-in';
