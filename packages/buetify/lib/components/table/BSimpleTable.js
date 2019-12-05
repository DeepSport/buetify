import { DefaultThemePropsDefinition, useTheme } from '../../composables/theme';
import BScroll from '../scroll/BScroll';
import { defineComponent, h } from 'vue';
import BStyledTable from './BStyledTable';
export const BSimpleTablePropsDefinition = { ...DefaultThemePropsDefinition,
  isBordered: {
    type: Boolean,
    default: false
  },
  isSelectable: {
    type: Boolean,
    default: false
  },
  isStriped: {
    type: Boolean,
    default: false
  },
  isNarrow: {
    type: Boolean,
    default: false
  },
  isFullwidth: {
    type: Boolean,
    default: true
  },
  size: {
    type: String
  },
  isHoverable: {
    type: Boolean,
    default: false
  },
  isLoading: {
    type: Boolean,
    default: false
  },
  isScrollable: {
    type: Boolean,
    default: true
  },
  useMobileCards: {
    type: Boolean,
    default: false
  }
};
export default defineComponent({
  name: 'b-simple-table',
  inheritAttrs: false,
  props: BSimpleTablePropsDefinition,

  setup(props, {
    slots
  }) {
    const {
      themeClasses
    } = useTheme(props);

    function table() {
      return [h('div', {
        class: 'table-wrapper'
      }, [h(BStyledTable, {
        class: [props.size, {
          'is-bordered': props.isBordered,
          'is-striped': props.isStriped,
          'is-narrow': props.isNarrow,
          'is-fullwidth': props.isFullwidth,
          'is-hoverable': props.isHoverable || props.isSelectable,
          'has-mobile-cards': props.useMobileCards
        }, ...themeClasses.value]
      }, slots.default)])];
    }

    return () => {
      return h('div', {
        class: ['b-table', {
          'is-loading': props.isLoading
        }]
      }, props.isScrollable ? h(BScroll, {
        class: 'is-fullwidth'
      }, table) : table());
    };
  }

});
//# sourceMappingURL=BSimpleTable.js.map