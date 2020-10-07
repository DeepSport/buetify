import './table.sass';
import { DefaultThemePropsDefinition, ThemeProps, useTheme } from '../../composables/theme';
import { SizeVariant } from '../../types';
import { Classes } from '../../utils/mergeClasses';
import BScroll from '../scroll/BScroll';
import { defineComponent, h, PropType } from 'vue';

export interface BSimpleTableProps extends Partial<ThemeProps> {
  isLoading?: boolean;
  isScrollable?: boolean;
  tableClasses?: Classes;
}

export const BSimpleTablePropsDefinition = {
  ...DefaultThemePropsDefinition,
  isBordered: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  isSelectable: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  isStriped: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  isNarrow: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  isFullwidth: {
    type: Boolean as PropType<boolean>,
    default: true
  },
  size: {
    type: String as PropType<SizeVariant>,
    default: '' as const
  },
  isHoverable: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  isLoading: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  isScrollable: {
    type: Boolean as PropType<boolean>,
    default: true
  },
  useMobileCards: {
    type: Boolean as PropType<boolean>,
    default: true
  }
};

export default defineComponent({
  name: 'b-simple-table',
  inheritAttrs: false,
  props: BSimpleTablePropsDefinition,
  setup(props, { slots }) {
    const { themeClasses } = useTheme(props);

    function table() {
      return [
        h('div', { class: 'table-wrapper' }, [
          h(
            'table',
            {
              class: [
                'table',
                props.size,
                {
                  'is-bordered': props.isBordered,
                  'is-striped': props.isStriped,
                  'is-narrow': props.isNarrow,
                  'is-fullwidth': props.isFullwidth,
                  'is-hoverable': props.isHoverable || props.isSelectable,
                  'has-mobile-cards': props.useMobileCards
                },
                ...themeClasses.value
              ]
            },
            slots.default && slots.default()
          )
        ])
      ];
    }
    return () => {
      return h(
        'div',
        {
          class: ['b-table', { 'is-loading': props.isLoading }]
        },
        props.isScrollable ? h(BScroll, { class: 'is-fullwidth' }, table) : table()
      );
    };
  }
});
