import { defineAsyncComponent } from 'vue';
import { RouteRecordRaw } from 'vue-router';
import { meta } from './meta';

export const route: RouteRecordRaw = {
	component: defineAsyncComponent(() => import('./SwitchDocumentation.vue')),
	name: meta.fullPath,
	path: meta.subPath,
	meta
};
