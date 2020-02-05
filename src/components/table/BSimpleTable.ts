import './table.sass';
import BScroll from '../scroll/BScroll';
import { DEFAULT_THEME_COLOR_MAP } from '../../mixins/themeInjection/ThemeInjectionMixin';
import Vue, { VNode } from 'vue';
import {
  getThemeClassesFromContext,
  getThemeProps,
  THEME_INJECTION
} from '../../utils/getThemeableFunctionalComponent';
import { alwaysEmptyArray } from '../../utils/helpers';
import { mergeVNodeClasses } from '../../utils/mergeVNodeClasses';
import { mergeVNodeStaticClass } from '../../utils/mergeVNodeStaticClass';

export default Vue.extend({
  name: 'BSimpleTable',
  functional: true,
  props: {
    ...getThemeProps(DEFAULT_THEME_COLOR_MAP),
    tableClasses: {
      type: [Object, Array],
      required: false,
      default: alwaysEmptyArray
    },
    isLoading: {
      type: Boolean,
      required: false,
      default: false
    },
    isScrollable: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  inject: {
    ...THEME_INJECTION
  },
  render(h, { props, data, children, injections }): VNode {
    const table = h('div', { staticClass: 'table-wrapper' }, [
      h(
        'table',
        {
          staticClass: 'table',
          class: mergeVNodeClasses(props.tableClasses, getThemeClassesFromContext({ injections, props, data: {} }))
        },
        children
      )
    ]);
    return h(
      'div',
      {
        staticClass: mergeVNodeStaticClass('b-table', data.staticClass),
        class: mergeVNodeClasses(data.class, { 'is-loading': props.isLoading })
      },
      [props.isScrollable ? h(BScroll, { staticClass: 'width-100-percent' }, [table]) : table]
    );
  }
});
