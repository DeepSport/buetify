import './divider.sass';
import { useTheme } from '../../../composables/theme';
import { ThemeColorMap } from '../../../types/ThemeColorMap';
import { Classes, mergeClasses } from '../../../utils/mergeClasses';
import { DEFAULT_THEME_COLOR_MAP } from '../../../mixins/themeInjection/ThemeInjectionMixin';
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
  attrs.class = mergeClasses(attrs.class as Classes, ['is-divider', ...themeClasses.value]);
  if (props.text) {
    attrs['data-content'] = props.text;
  }
  return h(props.tag ?? 'div', attrs);
}
