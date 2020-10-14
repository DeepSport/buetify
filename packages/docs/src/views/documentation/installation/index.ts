import { RouteRecordRaw } from 'vue-router';
import { BuetifyRouteMeta } from '../../../shared/types';
import { group } from '../shared/BuetifyMenu';
import * as start from './start';

export const meta: Record<string, BuetifyRouteMeta> = {
	[start.meta.fullPath]: start.meta
};

export const routes: RouteRecordRaw[] = [start.route];

export const menu = group('Installation', [start.menu]);
