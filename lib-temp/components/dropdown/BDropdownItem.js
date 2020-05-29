import './dropdown.sass';
import { useTheme } from '../../composables/theme';
import { mergeClasses } from '../../utils/mergeClasses';
import { h } from 'vue';
import { DropdownThemeMap } from './theme';
export default function BDropdownItem(props, { slots, attrs }) {
    const { themeClasses } = useTheme({
        isThemeable: props.isThemeable ?? true,
        themeMap: props.themeMap ?? DropdownThemeMap
    });
    attrs.class = mergeClasses(attrs.class, [
        'dropdown-item',
        ...themeClasses.value,
        { 'is-active': !!props.isActive }
    ]);
    return h(props.tag ?? 'li', {
        role: 'menuitem',
        tabindex: 0
    }, slots.default ? slots.default() : undefined);
}
//# sourceMappingURL=BDropdownItem.js.map