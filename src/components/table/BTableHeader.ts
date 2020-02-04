import { ColorVariant } from '../../types/ColorVariants';
import BCheckbox from '../form/checkbox/BCheckbox';
import BTableColumn from './BTableColumn';
import { BTableColumn as BTableColumnInterface, SortType } from './shared';
import Vue, { PropType, VNode } from 'vue';

export default Vue.extend({
  name: 'BTableHeader',
  functional: true,
  props: {
    columns: {
      type: Array as PropType<BTableColumnInterface[]>,
      required: true
    },
    isCheckable: {
      type: Boolean,
      required: true
    },
    isDisabled: {
      type: Boolean,
      default: false
    },
    isChecked: {
      type: Boolean,
      required: true
    },
    sortType: {
      type: String as PropType<SortType>,
      required: true
    },
    checkboxVariant: {
      type: String as PropType<ColorVariant>,
      default: 'is-primary'
    }
  },
  render(h, { props, slots, listeners, data }): VNode {
    const nodes = props.columns.map(column =>
      h(BTableColumn, {
        ...data,
        key: column.label,
        props: { column, sortType: props.sortType }
      })
    );
    if (props.isCheckable && listeners.toggle) {
      nodes.unshift(
        h('th', { staticClass: 'checkbox-cell' }, [
          h(BCheckbox, {
            props: {
              inputValue: props.isChecked,
              variant: props.checkboxVariant,
              isDisabled: props.isDisabled
            },
            on: { change: listeners.toggle }
          })
        ])
      );
    }
    return h('thead', [h('tr', nodes)]);
  }
});
