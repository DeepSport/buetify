import { BuetifyRouteMeta } from '../../shared/types';
import { meta as componentsMeta } from './components';
import { meta as summaryMeta } from './summary';

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
	[summaryMeta.fullPath]: summaryMeta,
	...componentsMeta,
};
