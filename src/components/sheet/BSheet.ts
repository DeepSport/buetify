import './sheet.sass';
import { h, SetupContext } from 'vue';
import { DEFAULT_THEME_COLOR_MAP, ThemeProps, useTheme } from '../../composables/theme';
import BButton from '../button/BButton';

export interface BSheetProps extends Partial<ThemeProps> {
	tag?: string;
	isLoading?: boolean;
}

const IsLoadingButton = h(BButton, {
	size: 'is-large',
	variant: 'is-link',
	isOutlined: true,
	isLoading: true,
	class: 'is-borderless is-fullwidth'
});

export default function BSheet(props: BSheetProps, { slots }: SetupContext) {
	const { themeClasses } = useTheme({
		isThemeable: props.isThemeable ?? true,
		themeMap: props.themeMap ?? DEFAULT_THEME_COLOR_MAP
	});
	return h(
		props.tag ?? 'main',
		{ class: ['b-sheet', ...themeClasses.value] },
		props.isLoading ? [IsLoadingButton] : slots.default!()
	);
}
