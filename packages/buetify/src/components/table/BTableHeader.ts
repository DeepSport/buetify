import { BCheckbox } from '../form/checkbox/BCheckbox';
import BTableColumn from './BTableColumn';
import { useInjectedVisibleColumns } from './composables/shared';
import { useInjectedCheckableTable } from './composables/useCheckableTable';
import { h, FunctionalComponent } from 'vue';

export interface BTableHeaderProps {
  isDisabled?: boolean;
}

const BTableHeader: FunctionalComponent<BTableHeaderProps> = (props, { slots }) =>{
  const { allRowsChecked, toggleAllRows, variant, isCheckable } = useInjectedCheckableTable();
  const columns = useInjectedVisibleColumns();
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

export default BTableHeader
