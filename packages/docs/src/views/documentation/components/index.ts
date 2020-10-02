import { RouteRecordRaw } from 'vue-router';
import { BuetifyRouteMeta } from '../../../shared/types';
import { BuetifyMenuNavigationGroup, group } from '../shared/BuetifyMenu';
import * as accordion from './accordion';
import * as button from './button';
import * as dialog from './dialog';
import * as dropdown from './dropdown';
import * as form from './form';
import * as icon from './icon';
import * as menu_ from './menu';
import * as message from './message';
import * as modal from './modal';

export const meta: Record<string, BuetifyRouteMeta> = {
	[accordion.meta.fullPath]: accordion.meta,
	[button.meta.fullPath]: button.meta,
	[dialog.meta.fullPath]: dialog.meta,
	[dropdown.meta.fullPath]: dropdown.meta,
	...form.meta,
	[icon.meta.fullPath]: icon.meta,
	[menu_.meta.fullPath]: menu_.meta,
	[message.meta.fullPath]: message.meta,
	[modal.meta.fullPath]: modal.meta
};

export const routes: RouteRecordRaw[] = [
	accordion.route,
	button.route,
	dialog.route,
	dropdown.route,
	...form.routes,
	icon.route,
	menu_.route,
	message.route,
	modal.route
];

export const menu: BuetifyMenuNavigationGroup = group('UI Components', [
	accordion.menu,
	button.menu,
	dialog.menu,
	dropdown.menu,
	form.menu,
	icon.menu,
	menu_.menu,
	message.menu,
	modal.menu
]);
