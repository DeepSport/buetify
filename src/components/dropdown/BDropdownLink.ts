import './dropdown.sass';
import { ThemeProps, useTheme } from '../../composables/theme';
import { Classes, mergeClasses } from '../../utils/mergeClasses';
import { SetupContext, h } from 'vue';
import { DropdownThemeMap } from './theme';

interface BDropdownItemProps extends Partial<ThemeProps> {
  isActive?: boolean;
  href?: string;
  tag?: string;
}

export default function BDropdownItem(props: BDropdownItemProps, { attrs, slots }: SetupContext) {
  const { themeClasses } = useTheme({
    isThemeable: props.isThemeable ?? true,
    themeMap: props.themeMap ?? DropdownThemeMap
  });
  attrs.class = mergeClasses(attrs.class as Classes, [
    'dropdown-item dropdown-link',
    ...themeClasses.value,
    { 'is-active': !!props.isActive }
  ]);
  return h(
    props.tag ?? 'li',
    {
      role: 'menuitem'
    },
    [h('a', attrs, slots.default ? slots.default() : undefined)]
  );
}
