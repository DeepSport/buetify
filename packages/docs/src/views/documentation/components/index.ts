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
import * as loading from './loading';
import * as notification from './notification';
import * as pagination from './pagination';
import * as snackbar from './snackbar';
import * as steps from './steps';
import * as table from './table';
import * as tabs from './tabs';
import * as tag from './tag';
import * as toast from './toast';
import * as tooltip from './tooltip';

export const meta: Record<string, BuetifyRouteMeta> = {
	[accordion.meta.fullPath]: accordion.meta,
	[button.meta.fullPath]: button.meta,
	[dialog.meta.fullPath]: dialog.meta,
	[dropdown.meta.fullPath]: dropdown.meta,
	...form.meta,
	[icon.meta.fullPath]: icon.meta,
	[loading.meta.fullPath]: loading.meta,
	[menu_.meta.fullPath]: menu_.meta,
	[message.meta.fullPath]: message.meta,
	[modal.meta.fullPath]: modal.meta,
	[notification.meta.fullPath]: notification.meta,
	[pagination.meta.fullPath]: pagination.meta,
	[snackbar.meta.fullPath]: snackbar.meta,
	[steps.meta.fullPath]: steps.meta,
	[table.meta.fullPath]: steps.meta,
	[tabs.meta.fullPath]: tabs.meta,
	[tag.meta.fullPath]: tag.meta,
	[toast.meta.fullPath]: tag.meta,
	[tooltip.meta.fullPath]: tooltip.meta
};

export const routes: RouteRecordRaw[] = [
	accordion.route,
	button.route,
	dialog.route,
	dropdown.route,
	...form.routes,
	icon.route,
	loading.route,
	menu_.route,
	message.route,
	modal.route,
	notification.route,
	pagination.route,
	snackbar.route,
	steps.route,
	table.route,
	tabs.route,
	tag.route,
	toast.route,
	tooltip.route
];

export const menu: BuetifyMenuNavigationGroup = group('UI Components', [
	accordion.menu,
	button.menu,
	dialog.menu,
	dropdown.menu,
	form.menu,
	icon.menu,
	loading.menu,
	menu_.menu,
	message.menu,
	modal.menu,
	notification.menu,
	pagination.menu,
	snackbar.menu,
	steps.menu,
	table.menu,
	tabs.menu,
	tag.menu,
	toast.menu,
	tooltip.menu
]);
