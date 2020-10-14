import { defineAsyncComponent } from 'vue';
import { RouteRecordRaw } from 'vue-router';
import { BuetifyRouteMeta } from '../../shared/types';
import * as installation from './installation';
import * as components from './components';
import * as summary from './summary';
import { BuetifyMenu } from './shared/BuetifyMenu';

export const menu: BuetifyMenu = [installation.menu, components.menu];

export const meta: Record<string, BuetifyRouteMeta> = {
	'/': {
		title: 'Home',
		fullPath: '/',
		subPath: '',
		menu: '',
		breadcrumbs: ['/']
	},
	'/documentation': {
		title: 'Documentation',
		subtitle: 'Info on how to get Buetify up and running',
		fullPath: '/documentation',
		subPath: 'documentation',
		menu: 'documentation',
		since: '0.1.0',
		breadcrumbs: ['/', '/documentation']
	},
	[summary.meta.fullPath]: summary.meta,
	...installation.meta,
	...components.meta
};

export const route: RouteRecordRaw = {
	path: '/documentation',
	component: defineAsyncComponent(() => import('./Documentation.vue')),
	children: [
		{ path: '', redirect: { name: summary.meta.fullPath } },
		summary.route,
		...installation.routes,
		...components.routes
	]
};
