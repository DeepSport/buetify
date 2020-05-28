import { FunctionN } from 'fp-ts/lib/function';
import { SetupContext, h } from 'vue';
import { Classes, mergeClasses } from '../../utils/mergeClasses';
import VerticalExpansionIcon from '../icons/verticalExpansion/VerticalExpansionIcon';
import BTooltip from '../tooltip/BTooltip';
import { isString } from '../../utils/helpers';
import { BTableColumn, SortType } from './shared';

export interface BTableColumnProps {
  column: BTableColumn;
  sortType: SortType;
  onNewSortType: FunctionN<[SortType], void>;
  onNewSortColumn: FunctionN<[BTableColumn], void>;
}

export default function BTableColumn(props: BTableColumnProps, { attrs, slots }: SetupContext) {
  attrs.class = mergeClasses(attrs.class as Classes, {
    'is-sortable': props.column.isSortable,
    'is-sticky-left': !!props.column.isSticky
  });
  attrs.style = props.column.width !== undefined ? { 'min-width': formatWidth(props.column.width) } : undefined;

  const slot = slots[`header.${props.column.label}`] || slots.header;
  const children = [];
  if (slot) {
    children.push(slot(props.column));
  } else {
    children.push(
      isString(props.column.detail)
        ? h(BTooltip, { label: props.column.detail, position: 'is-left' }, () => props.column.label)
        : props.column.label
    );
  }

  if (props.column.isSortColumn) {
    children.push(h(VerticalExpansionIcon, { isExpanded: props.sortType === 'Ascending' }));
  }
  return h(
    'th',
    props.column.isSortable
      ? {
          ...attrs,
          onClick: getColumnListener(props)
        }
      : attrs,
    [h('div', { class: ['th-wrap', props.column.position] }, children)]
  );
}

function formatWidth(width: string | number, suffix: 'rem' | 'em' | 'px' = 'px'): string {
  return isString(width) ? width : `${width}${suffix}`;
}

function getColumnListener(props: BTableColumnProps): FunctionN<[MouseEvent], void> {
  return props.column.isSortColumn ? getNewSortTypeListener(props) : () => props.onNewSortColumn(props.column);
}

function getNewSortTypeListener(props: BTableColumnProps): FunctionN<[MouseEvent], void> {
  return (e: MouseEvent) => {
    e.stopPropagation();
    props.onNewSortType(props.sortType === 'Ascending' ? 'Descending' : 'Ascending');
  };
}
