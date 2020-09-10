import { shallowReactive } from 'vue';
import { ThemeColorMap } from '../../types/ThemeColorMap';

export const DialogTheme: ThemeColorMap = shallowReactive({
	dark: 'is-grey-dark',
	light: ''
});
