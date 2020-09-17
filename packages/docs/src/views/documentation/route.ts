import { defineAsyncComponent } from 'vue';
import { RouteRecordRaw } from 'vue-router';
import { routes } from './components';
import { meta as summaryMeta, route as summaryRoute } from './summary';

export const route: RouteRecordRaw = {
	path: '/documentation',
	component: defineAsyncComponent(() => import('./Documentation.vue')),
	children: [{ path: '', redirect: { name: summaryMeta.fullPath } }, summaryRoute, ...routes]
};
