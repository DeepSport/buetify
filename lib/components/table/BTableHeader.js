import { BCheckbox } from '../form/checkbox/BCheckbox';
import BTableColumn from './BTableColumn';
import { h } from 'vue';
export default function BTableHeader(props, {
  attrs,
  slots
}) {
  var _a;

  const nodes = props.columns.map(column => h(BTableColumn, Object.assign(Object.assign({}, attrs), {
    slots,
    key: column.label,
    column,
    sortType: props.sortType,
    onNewSortType: props.onNewSortType,
    onNewSortColumn: props.onNewSortColumn
  })));

  if (props.isCheckable && props.onInput) {
    nodes.unshift(slots['header.checkbox'] ? h('th', slots['header.checkbox']({
      isChecked: props.isChecked,
      variant: props.checkboxVariant,
      isDisabled: props.isDisabled,
      onInput: props.onInput
    })) : h('th', {
      class: 'checkbox-cell'
    }, [h(BCheckbox, {
      value: props.isChecked,
      variant: (_a = props.checkboxVariant) !== null && _a !== void 0 ? _a : 'is-primary',
      isDisabled: props.isDisabled,
      onInput: props.onInput
    })]));
  }

  return h('thead', [h('tr', nodes)]);
}
//# sourceMappingURL=BTableHeader.js.map