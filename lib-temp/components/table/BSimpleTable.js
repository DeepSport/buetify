import './table.sass';
import { DEFAULT_THEME_COLOR_MAP, useTheme } from '../../composables/theme';
import { mergeClasses } from '../../utils/mergeClasses';
import BScroll from '../scroll/BScroll';
import { h } from 'vue';
export default function BSimpleTable(props, { attrs, slots }) {
    const { themeClasses } = useTheme({
        isThemeable: props.isThemeable ?? true,
        themeMap: props.themeMap ?? DEFAULT_THEME_COLOR_MAP
    });
    const table = h('div', { class: 'table-wrapper' }, [
        h('table', {
            staticClass: 'table',
            class: mergeClasses(props.tableClasses, themeClasses.value)
        }, slots.default())
    ]);
    return h('div', {
        class: mergeClasses(attrs.class, ['b-table', { 'is-loading': !!props.isLoading }])
    }, [props.isScrollable ? h(BScroll, { class: 'is-fullwidth' }, [table]) : table]);
}
//# sourceMappingURL=BSimpleTable.js.map