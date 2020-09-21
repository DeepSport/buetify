export interface ComponentApiDescription {
	title: string;
	props?: PropApiDescription[];
	slots?: SlotApiDescription[];
	events?: EventApiDescription[];
	methods?: MethodApiDescription[];
}

export interface PropApiDescription {
	name: string;
	description: string;
	type: PropType;
	values: string;
	required: string;
	default?: string;
}

export type PropType = 'Object' | 'Date' | 'String' | 'Number' | 'Array' | 'Boolean';

export interface SlotApiDescription {
	name: string;
	description: string;
	props: string;
}

export interface EventApiDescription {
	name: string;
	description: string;
	parameters: string;
}

export interface MethodApiDescription {
	name: string;
	description: string;
	parameters?: string;
}
