import { FunctionN } from 'fp-ts/lib/function';
import { ColorVariant } from '../../types/ColorVariants';
import { BCheckbox } from '../form/checkbox/BCheckbox';
import BTableColumn from './BTableColumn';
import { BTableColumn as BTableColumnInterface, SortType } from './shared';
import { SetupContext, h } from 'vue';

export interface BTableHeaderProps {
  columns: BTableColumnInterface[];
  isCheckable: boolean;
  isDisabled?: boolean;
  isChecked: boolean;
  sortType: SortType;
  checkboxVariant?: ColorVariant;
  onNewSortType: FunctionN<[SortType], void>;
  onNewSortColumn: FunctionN<[BTableColumnInterface], void>;
  onInput?: FunctionN<[boolean], void>;
}

export default function BTableHeader(props: BTableHeaderProps, { attrs, slots }: SetupContext) {
  const nodes = props.columns.map(column =>
    h(BTableColumn, {
      ...attrs,
      slots,
      key: column.label,
      column,
      sortType: props.sortType,
      onNewSortType: props.onNewSortType,
      onNewSortColumn: props.onNewSortColumn
    })
  );
  if (props.isCheckable && props.onInput) {
    nodes.unshift(
      slots['header.checkbox']
        ? h(
            'th',
            slots['header.checkbox']!({
              isChecked: props.isChecked,
              variant: props.checkboxVariant,
              isDisabled: props.isDisabled,
              onInput: props.onInput
            })
          )
        : h('th', { class: 'checkbox-cell' }, [
            h(BCheckbox, {
              value: props.isChecked,
              variant: props.checkboxVariant ?? 'is-primary',
              isDisabled: props.isDisabled,
              onInput: props.onInput
            })
          ])
    );
  }
  return h('thead', [h('tr', nodes)]);
}
