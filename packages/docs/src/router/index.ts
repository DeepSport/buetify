import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import * as documentation from '../views/documentation';
import * as home from '../views/home';
import * as notFound from '../views/404';

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes: [home.route, documentation.route, notFound.route]
});

router.afterEach(to => {
	const pageTitle = to.meta?.title as string | undefined;
	window.document.title = pageTitle ? `${pageTitle} | Buetify` : 'Buetify';
});

export default router;
