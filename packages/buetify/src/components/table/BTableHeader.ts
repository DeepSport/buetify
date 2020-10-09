import { BCheckbox } from '../form/checkbox/BCheckbox';
import BTableColumn from './BTableColumn';
import {useInjectedVisibleColumns} from './composables/shared';
import { useInjectedCheckableTable } from './composables/useCheckableTable';
import { SetupContext, h } from 'vue';

export interface BTableHeaderProps {
  isDisabled?: boolean;
}

export default function BTableHeader(props: BTableHeaderProps, { slots }: SetupContext) {
  const { allRowsChecked, toggleAllRows, variant, isCheckable } = useInjectedCheckableTable();
  const columns = useInjectedVisibleColumns()
  const nodes = columns.value.map(column =>
    h(
      BTableColumn,
      {
        key: column.label,
        column
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
