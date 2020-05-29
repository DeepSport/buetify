import './divider.sass';
import { DEFAULT_THEME_COLOR_MAP, useTheme } from '../../../composables/theme';
import { mergeClasses } from '../../../utils/mergeClasses';
import { h } from 'vue';
export default function BHorizontalDivider(props, { attrs }) {
    const { themeClasses } = useTheme({
        themeMap: props.themeMap ?? DEFAULT_THEME_COLOR_MAP,
        isThemeable: props.isThemeable ?? true
    });
    attrs.class = mergeClasses(attrs.class, ['is-divider', ...themeClasses.value]);
    if (props.text) {
        attrs['data-content'] = props.text;
    }
    return h(props.tag ?? 'div', attrs);
}
//# sourceMappingURL=BHorizontalDivider.js.map