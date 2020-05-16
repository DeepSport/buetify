import {getItem, setItem} from 'fp-ts-local-storage';
import {constant, constVoid} from 'fp-ts/lib/function';
import {getOrElse, none, Option, some} from 'fp-ts/lib/Option';
import { provide, shallowRef, Ref, watch } from 'vue';
import {Param} from '../../types/Param';
import {toRef} from '../../utils/toRef';

export type Theme = 'dark' | 'light';

export interface ThemeInjection {
	isThemeable: Ref<boolean>;
	currentTheme: Ref<Option<Theme>>; // allows for easier defaults in injected component
	setTheme: (theme: Theme) => void;
}

export const DEFAULT_THEME_INJECTION: ThemeInjection = {
	currentTheme: shallowRef(none),
	isThemeable: shallowRef(false),
	setTheme: constVoid
};

export const THEME_SYMBOL = Symbol('theme');

let persistentTheme = getOrElse<Theme>(constant<Theme>('dark'))(getItem('theme')() as Option<Theme>);

export function provideTheme(initialIsThemeable: Param<boolean>) {
	const _initialIsThemeable = toRef(initialIsThemeable);
	const isThemeable = shallowRef(_initialIsThemeable.value);
	watch(_initialIsThemeable, newValue => { isThemeable.value = newValue })
	const currentTheme = shallowRef(some(persistentTheme));
	function setTheme(newTheme: Theme) {
		currentTheme.value = some(newTheme);
		setItem('theme', newTheme)();
	}
	const injection: ThemeInjection = {
		isThemeable,
		currentTheme,
		setTheme
	}
	provide(THEME_SYMBOL, injection)
	return {
		setTheme,
		currentTheme,
		isThemeable
	}
}
