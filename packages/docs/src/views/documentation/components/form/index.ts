import { RouteRecordRaw } from 'vue-router';
import { BuetifyRouteMeta } from '../../../../shared/types';
import { BuetifyMenuNavigationGroup, group } from '../../shared/BuetifyMenu';
import * as autocomplete from './autocomplete';
import * as checkbox from './checkbox';
import * as datepicker from './datepicker';
import * as field from './field';
import * as input from './input';
import * as numberInput from './numberInput';
import * as radio from './radio';
import * as select from './select';
import * as bSwitch from './switch';

export const meta: Record<string, BuetifyRouteMeta> = {
	[autocomplete.meta.fullPath]: autocomplete.meta,
	[checkbox.meta.fullPath]: checkbox.meta,
	[datepicker.meta.fullPath]: datepicker.meta,
	[field.meta.fullPath]: field.meta,
	[input.meta.fullPath]: input.meta,
	[numberInput.meta.fullPath]: numberInput.meta,
	[radio.meta.fullPath]: radio.meta,
	[select.meta.fullPath]: select.meta,
	[bSwitch.meta.fullPath]: bSwitch.meta
};

export const routes: RouteRecordRaw[] = [
	autocomplete.route,
	checkbox.route,
	datepicker.route,
	field.route,
	input.route,
	numberInput.route,
	radio.route,
	select.route,
	bSwitch.route
];

export const menu: BuetifyMenuNavigationGroup = group('Form Controls', [
	autocomplete.menu,
	checkbox.menu,
	datepicker.menu,
	field.menu,
	input.menu,
	numberInput.menu,
	radio.menu,
	select.menu,
	bSwitch.menu
]);
