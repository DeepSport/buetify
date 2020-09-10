import { shallowReactive } from 'vue';
import { ThemeColorMap } from '../../types/ThemeColorMap';

export const ButtonTheme: ThemeColorMap = shallowReactive({
	dark: 'is-primary',
	light: 'is-primary'
});
