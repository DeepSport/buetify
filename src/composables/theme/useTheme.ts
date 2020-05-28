import { isSome } from 'fp-ts/lib/Option';
import { PropType, inject, ExtractPropTypes, computed } from 'vue';
import {constant} from 'fp-ts/lib/function';
import { DEFAULT_THEME_COLOR_MAP } from '../../mixins/themeInjection/ThemeInjectionMixin';
import {ThemeColorMap} from '../../types/ThemeColorMap';
import { DEFAULT_THEME_INJECTION, THEME_INJECTION_SYMBOL, ThemeInjection } from './provideTheme';

export function getUseThemePropsDefinition(themeMap: ThemeColorMap, defaultIsThemeable: boolean = true) {
	return {
		themeMap: {
			type: Object as PropType<ThemeColorMap>,
			required: false,
			default: constant(themeMap)
		},
		isThemeable: {
			type: Boolean as PropType<boolean>,
			required: false,
			default: defaultIsThemeable
		}
	};
}

export type ThemeProps = ExtractPropTypes<ReturnType< typeof getUseThemePropsDefinition>>

export type FunctionalThemeProps = Partial<ThemeProps>;

export const DefaultThemePropsDefinition = getUseThemePropsDefinition(DEFAULT_THEME_COLOR_MAP, true);

export function getThemeClasses(themeMap: ThemeColorMap, themeInjection: ThemeInjection): string[] {
	if (themeInjection.isThemeable && isSome(themeInjection.currentTheme.value)) {
		const classes = themeMap[themeInjection.currentTheme.value.value];
		return Array.isArray(classes) ? classes : [classes];
	} else {
		return [];
	}
}

export function useTheme(props?: ThemeProps) {
	const themeInjection = inject(THEME_INJECTION_SYMBOL, DEFAULT_THEME_INJECTION)
	const themeClasses = computed(() => props ? getThemeClasses(props.themeMap, themeInjection) : []);

	return {
		currentTheme: themeInjection.currentTheme,
		setTheme: themeInjection.setTheme,
		toggleTheme: () => {
			if (isSome(themeInjection.currentTheme.value)) {
				if (themeInjection.currentTheme.value.value === 'light') {
					themeInjection.setTheme('dark');
				} else {
					themeInjection.setTheme('light');
				}
			}
		},
		themeClasses
	};
}


