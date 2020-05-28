import './divider.sass';
import { useTheme } from '../../../composables/theme';
import { Classes, mergeClasses } from '../../../utils/mergeClasses';
import { DEFAULT_THEME_COLOR_MAP } from '../../../mixins/themeInjection/ThemeInjectionMixin';
import { h, SetupContext } from 'vue';
import { BDividerProps } from './BHorizontalDivider';

export default function BVerticalDivider(props: BDividerProps, { attrs }: SetupContext) {
  const { themeClasses } = useTheme({
    themeMap: props.themeMap ?? DEFAULT_THEME_COLOR_MAP,
    isThemeable: props.isThemeable ?? true
  });
  attrs.class = mergeClasses(attrs.class as Classes, ['is-divider-vertical', ...themeClasses.value]);
  if (props.text) {
    attrs['data-content'] = props.text;
  }
  return h(props.tag ?? 'div', attrs);
}
