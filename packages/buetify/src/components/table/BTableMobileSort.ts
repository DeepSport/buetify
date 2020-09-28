import './table.sass';
import { FunctionN } from 'fp-ts/lib/function';
import { BSelect } from '../form/select/BSelect';
import VerticalExpansionIcon from '../icons/verticalExpansion/VerticalExpansionIcon';
import { BTableColumn, SortType } from './shared';
import { findFirst } from 'fp-ts/lib/Array';
import { isSome, map, Option, toNullable } from 'fp-ts/lib/Option';
import { pipe } from 'fp-ts/lib/pipeable';
import { VNode, h } from 'vue';

export interface BTableMobileSortProps {
  sortColumn: Option<BTableColumn>;
  'onUpdate:sortColumn': FunctionN<[BTableColumn], void>;
  sortType: SortType;
  'onUpdate:sortType': FunctionN<[SortType], void>;
  columns: BTableColumn[];
  placeholder?: string;
}

function generateSortDirectionButton(props: BTableMobileSortProps): VNode {
  return h('div', { class: 'control' }, [
    h(
      'button',
      {
        class: 'button is-primary',
        onClick: () => {
          props['onUpdate:sortType'](props.sortType === 'Ascending' ? 'Descending' : 'Ascending');
        }
      },
      [
        h(VerticalExpansionIcon, {
          isExpanded: props.sortType === 'Descending',
          size: 'is-small'
        })
      ]
    )
  ]);
}

function generateBSelect(props: BTableMobileSortProps): VNode {
  const sortableColumns = props.columns.filter(c => c.isSortable);
  return h(BSelect, {
    placeholder: props.placeholder,
    items: sortableColumns,
    itemKey: 'label',
    itemValue: 'label',
    itemText: 'label',
    modelValue: pipe(
      props.sortColumn,
      map(column => column.label),
      toNullable
    ),
    isExpanded: true,
    'onUpdate:modelValue': (label: string) => {
      const newSortColumn = pipe(
        sortableColumns,
        findFirst(column => column.label === label)
      );

      if (isSome(newSortColumn)) {
        props['onUpdate:sortColumn'](newSortColumn.value);
      }
    }
  });
}

export default function BTableMobileSort(props: BTableMobileSortProps) {
  return h(
    'section',
    {
      class: 'field table-mobile-sort',
      'aria-label': 'Table Sort Controls'
    },
    [h('div', { class: 'field has-addons' }, [generateBSelect(props), generateSortDirectionButton(props)])]
  );
}
