import "../../../../src/components/layout/divider/divider.sass";
import { DEFAULT_THEME_COLOR_MAP, useTheme } from '../../../composables/theme';
import { h } from 'vue';
export default function BHorizontalDivider(props, {
  attrs
}) {
  const {
    themeClasses
  } = useTheme({
    themeMap: props.themeMap ?? DEFAULT_THEME_COLOR_MAP,
    isThemeable: props.isThemeable ?? true
  });
  return h(props.tag ?? 'div', {
    class: ['is-divider', ...themeClasses.value],
    'data-content': props.text || null
  });
}
//# sourceMappingURL=BHorizontalDivider.js.map