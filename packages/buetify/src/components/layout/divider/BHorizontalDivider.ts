import './divider.sass';
import { DEFAULT_THEME_COLOR_MAP, useTheme } from '../../../composables/theme';
import { ThemeColorMap } from '../../../types/ThemeColorMap';
import { SetupContext, h } from 'vue';

export interface BDividerProps {
  text?: string;
  tag?: string;
  themeMap?: ThemeColorMap;
  isThemeable?: boolean;
}

export default function BHorizontalDivider(props: BDividerProps, { attrs }: SetupContext) {
  const { themeClasses } = useTheme({
    themeMap: props.themeMap ?? DEFAULT_THEME_COLOR_MAP,
    isThemeable: props.isThemeable ?? true
  });

  return h(props.tag ?? 'div', {
    class: ['is-divider', ...themeClasses.value],
    'data-content': props.text || null
  });
}
