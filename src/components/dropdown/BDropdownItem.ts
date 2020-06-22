import './dropdown.sass';
import { ThemeProps, useTheme } from '../../composables/theme';
import { Classes, mergeClasses } from '../../utils/mergeClasses';
import { SetupContext, h } from 'vue';
import { DropdownThemeMap } from './theme';

interface BDropdownItemProps extends Partial<ThemeProps> {
  isActive?: boolean;
  tag?: string;
  isClickable?: boolean;
}

export default function BDropdownItem(props: BDropdownItemProps, { slots, attrs }: SetupContext) {
  const { themeClasses } = useTheme({
    isThemeable: props.isThemeable ?? true,
    themeMap: props.themeMap ?? DropdownThemeMap
  });
  attrs.class = mergeClasses(attrs.class as Classes, [
    'dropdown-item',
    ...themeClasses.value,
    { 'is-active': !!props.isActive }
  ]);
  return h(
    props.tag ?? 'li',
    {
      role: 'menuitem',
      tabindex: 0
    },
    slots.default ? slots.default() : undefined
  );
}
