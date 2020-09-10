import { h, defineComponent } from 'vue';
import { useTheme } from '../../composables/theme';
import AdjustIcon from '../icons/adjust/AdjustIcon';
import BTooltip from '../tooltip/BTooltip';

export default defineComponent({
	name: 'b-theme-toggle',
	setup(_, {slots}) {
		const { toggleTheme } = useTheme()
		return () => h('button', { 'aria-label': 'toggle color theme', onClick: toggleTheme }, [
			h(
				BTooltip,
				{
					label: 'Toggle color theme'
				},
				() => slots.default ? slots.default() : h(AdjustIcon)
			)
		])
	}
})
