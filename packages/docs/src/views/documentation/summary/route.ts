import { defineAsyncComponent } from 'vue';
import {RouteRecordRaw} from 'vue-router';
import { meta } from './meta';
import Summary from './Summary.vue';

export const route: RouteRecordRaw = {
	component: defineAsyncComponent(() => import('./BuetifySummary.vue')),
	name: meta.fullPath,
	path: meta.subPath,
	meta
};
