import './sheet.sass';
import { h, defineComponent } from 'vue';
import { DefaultThemePropsDefinition, ThemeProps, useTheme } from '../../composables/theme';
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

export default defineComponent({
	name: 'b-sheet',
	props: {
		...DefaultThemePropsDefinition,
		tag: {
			type: String,
			default: 'main'
		},
		isLoading: {
			type: Boolean,
			default: false
		}
	},
	setup(props, { slots }) {
		const { themeClasses } = useTheme(props);

		return 	() => h(
			props.tag,
			{ class: ['b-sheet', ...themeClasses.value] },
			props.isLoading ? slots.loading ? slots.loading() : IsLoadingButton : slots.default && slots.default()
		);


	}
})
