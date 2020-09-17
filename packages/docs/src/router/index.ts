import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { route as documentationRoute } from '../views/documentation';
import Button from '../views/documentation/components/button/Button.vue';
import { route as homeRoute } from '../views/home/route';

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes: [homeRoute, documentationRoute]
});

export default router;
