import { defineAsyncComponent } from 'vue';
import { RouteRecordRaw } from 'vue-router';

export const route: RouteRecordRaw = {
	path: '/:pathMatch(.*)*',
	name: 'NotFound',
	component: defineAsyncComponent(() => import('./404.vue'))
};
