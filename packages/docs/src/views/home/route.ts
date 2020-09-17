import { defineAsyncComponent } from 'vue';
import { RouteRecordRaw } from 'vue-router';

export const route: RouteRecordRaw = {
	path: '/',
	name: 'home',
	component: defineAsyncComponent(() => import('./Home.vue'))
};
