import './table.sass';
import {DEFAULT_THEME_COLOR_MAP, ThemeProps, useTheme} from '../../composables/theme';
import { Classes, mergeClasses } from '../../utils/mergeClasses';
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
  const table = h('div', { class: 'table-wrapper' }, [
    h(
      'table',
      {
        staticClass: 'table',
        class: mergeClasses(props.tableClasses, themeClasses.value)
      },
      slots.default!()
    )
  ]);
  return h(
    'div',
    {
      class: mergeClasses(attrs.class as Classes, ['b-table', { 'is-loading': !!props.isLoading }])
    },
    [props.isScrollable ? h(BScroll, { class: 'is-fullwidth' }, [table]) : table]
  );
}
