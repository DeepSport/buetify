import { RouteRecordRaw } from 'vue-router';
import { BuetifyRouteMeta } from '../../../shared/types';
import { group } from '../shared/BuetifyMenu';
import * as start from './start';
import * as usage from './usage';
export const meta: Record<string, BuetifyRouteMeta> = {
	[start.meta.fullPath]: start.meta,
	[usage.meta.fullPath]: usage.meta
};

export const routes: RouteRecordRaw[] = [start.route, usage.route];

export const menu = group('Installation', [start.menu, usage.menu]);
