import "../../../../src/components/layout/divider/divider.sass";
import { DEFAULT_THEME_COLOR_MAP, useTheme } from '../../../composables/theme';
import { mergeClasses } from '../../../utils/mergeClasses';
import { h } from 'vue';
export default function BVerticalDivider(props, {
  attrs
}) {
  var _a, _b, _c;

  const {
    themeClasses
  } = useTheme({
    themeMap: (_a = props.themeMap) !== null && _a !== void 0 ? _a : DEFAULT_THEME_COLOR_MAP,
    isThemeable: (_b = props.isThemeable) !== null && _b !== void 0 ? _b : true
  });
  attrs.class = mergeClasses(attrs.class, ['is-divider-vertical', ...themeClasses.value]);

  if (props.text) {
    attrs['data-content'] = props.text;
  }

  return h((_c = props.tag) !== null && _c !== void 0 ? _c : 'div', attrs);
}
//# sourceMappingURL=BVerticalDivider.js.map