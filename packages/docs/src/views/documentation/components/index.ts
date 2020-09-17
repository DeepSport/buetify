import {RouteRecordRaw} from 'vue-router';
import {BuetifyRouteMeta} from '../../../shared/types';
import * as button from './button';


export const meta: Record<string, BuetifyRouteMeta> = {
	[button.meta.fullPath]: button.meta,
}

export const routes: RouteRecordRaw[] = [
	button.route
]
