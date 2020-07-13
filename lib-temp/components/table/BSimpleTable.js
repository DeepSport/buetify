import './table.sass';
import { DEFAULT_THEME_COLOR_MAP, useTheme } from '../../composables/theme';
import { mergeClasses } from '../../utils/mergeClasses';
import BScroll from '../scroll/BScroll';
import { h } from 'vue';
export default function BSimpleTable(props, { attrs, slots }) {
    var _a, _b;
    const { themeClasses } = useTheme({
        isThemeable: (_a = props.isThemeable) !== null && _a !== void 0 ? _a : true,
        themeMap: (_b = props.themeMap) !== null && _b !== void 0 ? _b : DEFAULT_THEME_COLOR_MAP
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