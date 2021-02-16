import './divider.sass';
import { DEFAULT_THEME_COLOR_MAP, useTheme } from '../../../composables/theme';
import { h } from 'vue';
import { BDividerProps } from './BHorizontalDivider';

export default function BVerticalDivider(props: BDividerProps) {
  const { themeClasses } = useTheme({
    themeMap: props.themeMap ?? DEFAULT_THEME_COLOR_MAP,
    isThemeable: props.isThemeable ?? true
  });
  return h(props.tag ?? 'hr', {
    class: ['is-divider-vertical', ...themeClasses.value],
    'data-content': props.text || null
  });
}
