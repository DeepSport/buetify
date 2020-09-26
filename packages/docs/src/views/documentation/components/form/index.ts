import {RouteRecordRaw} from 'vue-router';
import {BuetifyRouteMeta} from '../../../../shared/types';
import {BuetifyMenuNavigationGroup, group} from '../../shared/BuetifyMenu';
import * as autocomplete from './autocomplete';
import * as checkbox from './checkbox';

export const meta: Record<string, BuetifyRouteMeta> = {
	[autocomplete.meta.fullPath]: autocomplete.meta,
	[checkbox.meta.fullPath]: checkbox.meta
};

export const routes: RouteRecordRaw[] = [autocomplete.route, checkbox.route];

export const menu: BuetifyMenuNavigationGroup = group('Form', [
	autocomplete.menu,
	checkbox.menu
]);
