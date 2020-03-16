import { constVoid } from 'fp-ts/lib/function';
import Vue, { PropType, VNode } from 'vue';
import VerticalExpansionIcon from '../icons/verticalExpansion/VerticalExpansionIcon';
import BTooltip from '../tooltip/BTooltip';
import { isString } from '../../utils/helpers';
import { mergeVNodeAttrs } from '../../utils/mergeVNodeAttrs';
import { mergeVNodeClasses } from '../../utils/mergeVNodeClasses';
import { BTableColumn, SortType } from './shared';

export default Vue.extend({
  name: 'BTableColumn',
  functional: true,
  props: {
    column: {
      type: Object as PropType<BTableColumn>,
      required: true
    },
    sortType: {
      type: String as PropType<SortType>,
      required: true
    }
  },
  render(h, { props, data }): VNode {
    data.class = mergeVNodeClasses(data.class, {
      'is-sortable': props.column.isSortable,
      'is-sticky-left': !!props.column.isSticky
    });
    data.style = props.column.width !== undefined ? { 'min-width': formatWidth(props.column.width) } : undefined;
    data.attrs = mergeVNodeAttrs(data.attrs, {
      'data-label': props.column.label
    });

    const scopedSlot = data.scopedSlots && (data.scopedSlots[props.column.label] || data.scopedSlots.header);

    const children = [];

    if (scopedSlot) {
      children.push(scopedSlot({ column: props.column }));
    } else {
      children.push(
        isString(props.column.detail)
          ? h(BTooltip, { props: { label: props.column.detail, position: 'is-left' } }, props.column.label)
          : props.column.label
      );
    }

    if (props.column.isSortColumn) {
      children.push(
        h(VerticalExpansionIcon, {
          props: { isExpanded: props.sortType === 'Ascending' }
        })
      );
    }
    return h(
      'th',
      props.column.isSortable
        ? {
            ...data,
            on: {
              ...data.on,
              click: generateColumnListener(data.on, props.sortType, props.column)
            }
          }
        : data,
      [h('div', { staticClass: 'th-wrap', class: props.column.position }, children)]
    );
  }
});

function formatWidth(width: string | number, suffix: 'rem' | 'em' | 'px' = 'px'): string {
  return isString(width) ? width : `${width}${suffix}`;
}

function generateColumnListener(
  listeners: { [key: string]: Function | Function[] } | undefined,
  sortType: SortType,
  column: BTableColumn
): Function {
  return column.isSortColumn
    ? generateNewSortTypeListener(listeners && listeners['new-sort-type'], sortType)
    : generateNewSortColumnListener(listeners && listeners['new-sort-column'], column);
}

function generateNewSortTypeListener(currentListener: Function | Function[] | undefined, sortType: SortType): Function {
  if (currentListener === undefined) {
    return constVoid;
  } else if (Array.isArray(currentListener)) {
    return (e: MouseEvent) => {
      e.stopPropagation();
      currentListener.forEach(fn => fn(sortType === 'Ascending' ? 'Descending' : 'Ascending'));
    };
  } else {
    return (e: MouseEvent) => {
      e.stopPropagation();
      currentListener(sortType === 'Ascending' ? 'Descending' : 'Ascending');
    };
  }
}

function generateNewSortColumnListener(
  currentListener: Function | Function[] | undefined,
  column: BTableColumn
): Function {
  if (currentListener === undefined) {
    return constVoid;
  } else if (Array.isArray(currentListener)) {
    return () => {
      currentListener.forEach(fn => fn(column));
    };
  } else {
    return () => currentListener(column);
  }
}
