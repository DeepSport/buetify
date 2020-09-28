
export type BuetifyMenu = BuetifyMenuNavigationItem[]

export type BuetifyMenuNavigationItem = BuetifyMenuNavigationGroup | BuetifyMenuNavigationLink

export interface BuetifyMenuNavigationGroup {
	readonly _tag: 'group';
	readonly label: string;
	readonly items: BuetifyMenuNavigationItem[]
}

export function group(label: string, items: BuetifyMenuNavigationItem[]): BuetifyMenuNavigationGroup {
	return {
		_tag: 'group',
		label,
		items
	};
}

export interface BuetifyMenuNavigationLink {
	readonly _tag: 'item'
	readonly label: string;
	readonly fullPath: string;
}

export function link(label: string, fullPath: string): BuetifyMenuNavigationLink {
	return {
		_tag: 'item',
		label,
		fullPath
	}
}
