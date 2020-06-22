import { defineAsyncComponent, h, SetupContext } from 'vue';
import { useTheme } from '../../composables/theme';
import BTooltip from '../tooltip/BTooltip';

const AdjustIcon = defineAsyncComponent(() => import('../icons/adjust/AdjustIcon'));

export default function BThemeToggle(_: any, { slots }: SetupContext) {
  const { toggleTheme } = useTheme();
  return h(BTooltip, {
    tag: 'button',
    label: 'Toggle color theme',
    onClick: toggleTheme,
    slots: {
      default: () => {
        slots.default ? slots.default() : h(AdjustIcon);
      }
    }
  });
}
