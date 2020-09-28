import {RouteRecordRaw} from 'vue-router';
import {BuetifyRouteMeta} from '../../../../shared/types';
import {BuetifyMenuNavigationGroup, group} from '../../shared/BuetifyMenu';
import * as autocomplete from './autocomplete';
import * as checkbox from './checkbox';
import * as datepicker from './datepicker';

export const meta: Record<string, BuetifyRouteMeta> = {
	[autocomplete.meta.fullPath]: autocomplete.meta,
	[checkbox.meta.fullPath]: checkbox.meta,
	[datepicker.meta.fullPath]: datepicker.meta
};

export const routes: RouteRecordRaw[] = [autocomplete.route, checkbox.route, datepicker.route];

export const menu: BuetifyMenuNavigationGroup = group('Form Controls', [
	autocomplete.menu,
	checkbox.menu,
	datepicker.menu
]);
