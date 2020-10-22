import './divider.sass';
import { DEFAULT_THEME_COLOR_MAP, useTheme } from '../../../composables/theme';
import { ThemeColorMap } from '../../../types/ThemeColorMap';
import { h } from 'vue';

export interface BDividerProps {
  text?: string;
  tag?: string;
  themeMap?: ThemeColorMap;
  isThemeable?: boolean;
}

export default function BHorizontalDivider(props: BDividerProps) {
  const { themeClasses } = useTheme({
    themeMap: props.themeMap ?? DEFAULT_THEME_COLOR_MAP,
    isThemeable: props.isThemeable ?? true
  });

  return h(props.tag ?? 'hr', {
    class: ['is-divider', ...themeClasses.value],
    'data-content': props.text || null
  });
}
