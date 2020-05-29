import './dropdown.sass';
import { useTheme } from '../../composables/theme';
import { mergeClasses } from '../../utils/mergeClasses';
import { h } from 'vue';
import { DropdownThemeMap } from './theme';
export default function BDropdownItem(props, { attrs, slots }) {
    const { themeClasses } = useTheme({
        isThemeable: props.isThemeable ?? true,
        themeMap: props.themeMap ?? DropdownThemeMap
    });
    attrs.class = mergeClasses(attrs.class, [
        'dropdown-item dropdown-link',
        ...themeClasses.value,
        { 'is-active': !!props.isActive }
    ]);
    return h(props.tag ?? 'li', {
        role: 'menuitem'
    }, [h('a', attrs, slots.default ? slots.default() : undefined)]);
}
//# sourceMappingURL=BDropdownLink.js.map