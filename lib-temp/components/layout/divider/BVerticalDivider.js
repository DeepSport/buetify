import './divider.sass';
import { DEFAULT_THEME_COLOR_MAP, useTheme } from '../../../composables/theme';
import { mergeClasses } from '../../../utils/mergeClasses';
import { h } from 'vue';
export default function BVerticalDivider(props, { attrs }) {
    const { themeClasses } = useTheme({
        themeMap: props.themeMap ?? DEFAULT_THEME_COLOR_MAP,
        isThemeable: props.isThemeable ?? true
    });
    attrs.class = mergeClasses(attrs.class, ['is-divider-vertical', ...themeClasses.value]);
    if (props.text) {
        attrs['data-content'] = props.text;
    }
    return h(props.tag ?? 'div', attrs);
}
//# sourceMappingURL=BVerticalDivider.js.map