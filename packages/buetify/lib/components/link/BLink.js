import "../../../src/components/link/link.sass";
import { useTheme } from '../../composables/theme';
import { h } from 'vue';
import { LinkThemeMap } from './theme';
export default function BLink(props, {
  attrs,
  slots
}) {
  const {
    themeClasses
  } = useTheme({
    isThemeable: props.isThemeable ?? true,
    themeMap: props.themeMap ?? LinkThemeMap
  });
  return h(props.tag ?? 'a', {
    class: ['b-link', ...themeClasses.value, {
      'is-disabled': props.isDisabled
    }],
    onClick: props.isDisabled ? undefined : attrs.onClick
  }, slots.default && slots.default());
}
//# sourceMappingURL=BLink.js.map