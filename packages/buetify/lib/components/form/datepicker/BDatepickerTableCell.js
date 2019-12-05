import "../../../../src/components/form/datepicker/datepicker.sass";
import { toggleListItem } from '../../../utils/helpers';
import { eqSerialDate, isSameDay } from './utils';
import { exists, getEq, some } from 'fp-ts/lib/Option';
import { pipe } from 'fp-ts/lib/pipeable';
import { defineComponent, shallowRef, h, watch, onMounted } from 'vue';

function generateEvents(events) {
  return h('div', {
    class: 'events'
  }, events.map((event, index) => h('div', {
    key: index,
    class: ['event', event.variant]
  })));
}

const toggleSerialDate = toggleListItem(eqSerialDate);
const eqOptionSerialDate = getEq(eqSerialDate);
export default defineComponent({
  name: 'b-datepicker-table-cell',
  props: {
    modelValue: {
      type: [Date, Array]
    },
    'onUpdate:modelValue': {
      type: Function,
      required: true
    },
    focusedDate: {
      type: Object,
      required: true
    },
    'onUpdate:focusedDate': {
      type: Function,
      required: true
    },
    indicators: {
      type: String,
      required: true
    },
    cell: {
      type: Object,
      required: true
    }
  },

  setup(props) {
    const buttonRef = shallowRef(null);

    function onClick(e) {
      e && e.preventDefault();
      const currentValue = props.modelValue;
      props['onUpdate:modelValue'](Array.isArray(currentValue) ? toggleSerialDate(props.cell.date, currentValue) : props.cell.date);
    }

    const onFocus = () => {
      props['onUpdate:focusedDate'](some(props.cell.date));
    };

    onMounted(() => watch(() => props.focusedDate, (newVal, oldVal) => {
      if ((oldVal && !eqOptionSerialDate.equals(newVal, oldVal) || oldVal === undefined) && buttonRef.value && pipe(newVal, exists(d => isSameDay(d, props.cell.date))) && document.activeElement !== buttonRef.value) {
        buttonRef.value.focus({
          preventScroll: true
        });
      }
    }, {
      immediate: true
    }));
    return () => {
      return h('td', [h('button', {
        ref: buttonRef,
        class: ['datepicker-cell', props.cell.classes, props.indicators],
        disabled: props.cell.isDisabled,
        tabindex: props.cell.isDisabled || props.cell.isSelected ? -1 : 0,
        'aria-label': props.cell.ariaLabel,
        onClick,
        onFocus,
        onMouseenter: onFocus
      }, [props.cell.date.getDate(), props.cell.hasEvents ? generateEvents(props.cell.events) : undefined])]);
    };
  }

});
//# sourceMappingURL=BDatepickerTableCell.js.map