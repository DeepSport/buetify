import { PropType, inject } from 'vue';
import {constant} from 'fp-ts/lib/function';
import {Param} from '../../types/Param';
import {ThemeColorMap} from '../../types/ThemeColorMap';
import {DEFAULT_THEME_INJECTION, THEME_SYMBOL} from './provideTheme';

export function useTheme(themeMap: ThemeColorMap, instanceIsThemeable: Param<boolean> = false) {
	const _instanceIsThemeable = toRef(instanceIsThemeable);
	const themeInjection = inject(THEME_SYMBOL, DEFAULT_THEME_INJECTION)

}

export function getThemeProps(themeMap: ThemeColorMap, defaultIsThemeable: boolean = true) {
	return {
		themeMap: {
			type: Object as PropType<ThemeColorMap>,
			required: false,
			default: constant(themeMap)
		},
		isThemeable: {
			type: Boolean,
			required: false,
			default: defaultIsThemeable
		}
	};
}
