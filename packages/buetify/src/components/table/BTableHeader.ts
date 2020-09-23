import { FunctionN } from 'fp-ts/lib/function';
import { BCheckbox } from '../form/checkbox/BCheckbox';
import BTableColumn from './BTableColumn';
import { useInjectedCheckableTable } from './composables/useCheckableTable';
import { BTableColumn as BTableColumnInterface, SortType } from './shared';
import { SetupContext, h } from 'vue';

export interface BTableHeaderProps {
  columns: BTableColumnInterface[];
  isDisabled?: boolean;
  sortType: SortType;
  'onUpdate:sortType': FunctionN<[SortType], void>;
  'onUpdate:sortColumn': FunctionN<[BTableColumnInterface], void>;
}

export default function BTableHeader(props: BTableHeaderProps, { slots }: SetupContext) {
  const { allRowsChecked, toggleAllRows, variant, isCheckable } = useInjectedCheckableTable();
  const nodes = props.columns.map(column =>
    h(
      BTableColumn,
      {
        key: column.label,
        column,
        sortType: props.sortType,
        'onUpdate:sortType': props['onUpdate:sortType'],
        'onUpdate:sortColumn': props['onUpdate:sortColumn']
      },
      slots
    )
  );
  if (isCheckable.value) {
    nodes.unshift(
      slots['header.checkbox']
        ? h(
            'th',
            slots['header.checkbox']({
              modelValue: allRowsChecked.value,
              variant: variant.value,
              isDisabled: props.isDisabled,
              'onUpdate:modelValue': toggleAllRows
            })
          )
        : h('th', { class: 'checkbox-cell' }, [
            h(BCheckbox, {
              modelValue: allRowsChecked.value,
              variant: variant.value,
              isDisabled: props.isDisabled,
              'onUpdate:modelValue': toggleAllRows
            })
          ])
    );
  }
  return h('thead', [h('tr', nodes)]);
}
