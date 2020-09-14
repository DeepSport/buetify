import './table.sass';
import { DEFAULT_THEME_COLOR_MAP, ThemeProps, useTheme } from '../../composables/theme';
import { Classes } from '../../utils/mergeClasses';
import BScroll from '../scroll/BScroll';
import { h, SetupContext } from 'vue';

export interface BSimpleTableProps extends Partial<ThemeProps> {
  isLoading?: boolean;
  isScrollable?: boolean;
  tableClasses?: Classes;
}

export default function BSimpleTable(props: BSimpleTableProps, { attrs, slots }: SetupContext) {
  const { themeClasses } = useTheme({
    isThemeable: props.isThemeable ?? true,
    themeMap: props.themeMap ?? DEFAULT_THEME_COLOR_MAP
  });
  function table() {
    return [
      h('div', { class: 'table-wrapper' }, [
        h(
          'table',
          {
            class: [props.tableClasses, 'table', ...themeClasses.value]
          },
          slots.default!()
        )
      ])
    ];
  }
  return h(
    'div',
    {
      class: ['b-table', { 'is-loading': props.isLoading }]
    },
    props.isScrollable ? h(BScroll, { class: 'is-fullwidth' }, table) : table()
  );
}
