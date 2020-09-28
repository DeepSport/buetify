import { RouteRecordRaw } from 'vue-router';
import { BuetifyRouteMeta } from '../../../shared/types';
import { BuetifyMenuNavigationGroup, group } from '../shared/BuetifyMenu';
import * as accordion from './accordion';
import * as button from './button';
import * as dialog from './dialog';
import * as dropdown from './dropdown';
import * as form from './form';

export const meta: Record<string, BuetifyRouteMeta> = {
	[accordion.meta.fullPath]: accordion.meta,
	[button.meta.fullPath]: button.meta,
	[dialog.meta.fullPath]: dialog.meta,
	[dropdown.meta.fullPath]: dropdown.meta,
	...form.meta,
};

export const routes: RouteRecordRaw[] = [accordion.route, button.route, dialog.route, dropdown.route, ...form.routes];

export const menu: BuetifyMenuNavigationGroup = group('UI Components', [
	accordion.menu,
	button.menu,
	dialog.menu,
	dropdown.menu,
	form.menu
]);
