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
  'onUpdate:sortType': FunctionN<[SortType], void>;
  'onUpdate:sortColumn': FunctionN<[BTableColumnInterface], void>;
  'onUpdate:isChecked'?: FunctionN<[boolean], void>;
}

export default function BTableHeader(props: BTableHeaderProps, { slots }: SetupContext) {
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
  if (props.isCheckable && props['onUpdate:isChecked']) {
    nodes.unshift(
      slots['header.checkbox']
        ? h(
            'th',
            slots['header.checkbox']({
              modelValue: props.isChecked,
              variant: props.checkboxVariant,
              isDisabled: props.isDisabled,
              'onUpdate:modelValue': props['onUpdate:isChecked']
            })
          )
        : h('th', { class: 'checkbox-cell' }, [
            h(BCheckbox, {
              modelValue: props.isChecked,
              variant: props.checkboxVariant ?? 'is-primary',
              isDisabled: props.isDisabled,
              'onUpdate:modelValue': props['onUpdate:isChecked']
            })
          ])
    );
  }
  return h('thead', [h('tr', nodes)]);
}
