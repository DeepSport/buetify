import './datepicker.sass';
import { FunctionN } from 'fp-ts/lib/function';
import { toggleListItem } from '../../../utils/helpers';
import { DateCell, DetailedDateEvent, EventIndicator } from './shared';
import { eqSerialDate, isSameDay } from './utils';
import { exists, getEq, Option, some } from 'fp-ts/lib/Option';
import { pipe } from 'fp-ts/lib/pipeable';
import { PropType, VNode, defineComponent, shallowRef, h, watch, onMounted } from 'vue';

function generateEvents(events: DetailedDateEvent[]): VNode {
  return h(
    'div',
    { class: 'events' },
    events.map((event, index) =>
      h('div', {
        key: index,
        class: ['event', event.variant]
      })
    )
  );
}

const toggleSerialDate = toggleListItem(eqSerialDate);

const eqOptionSerialDate = getEq(eqSerialDate);

export default defineComponent({
  name: 'b-datepicker-table-cell',
  props: {
    modelValue: {
      type: [Date, Array] as PropType<Date | Date[]>
    },
    'onUpdate:modelValue': {
      type: Function as PropType<FunctionN<[Date | Date[]], void>>,
      required: true
    },
    focusedDate: {
      type: Object as PropType<Option<Date>>,
      required: true
    },
    'onUpdate:focusedDate': {
      type: Function as PropType<FunctionN<[Option<Date>], void>>,
      required: true
    },
    indicators: {
      type: String as PropType<EventIndicator>,
      required: true
    },
    cell: {
      type: Object as PropType<DateCell>,
      required: true
    }
  },
  setup(props) {
    const buttonRef = shallowRef((null as unknown) as HTMLElement);

    function onClick(e?: MouseEvent) {
      e && e.preventDefault();
      const currentValue = props.modelValue;
      props['onUpdate:modelValue'](
        Array.isArray(currentValue) ? toggleSerialDate(props.cell.date, currentValue) : props.cell.date
      );
    }

    const onFocus = () => {
      props['onUpdate:focusedDate'](some(props.cell.date));
    };

    onMounted(() =>
      watch(
        () => props.focusedDate,
        (newVal, oldVal) => {
          if (
            ((oldVal && !eqOptionSerialDate.equals(newVal, oldVal)) || oldVal === undefined) &&
            buttonRef.value &&
            pipe(
              newVal,
              exists(d => isSameDay(d, props.cell.date))
            ) &&
            document.activeElement !== buttonRef.value
          ) {
            buttonRef.value.focus({ preventScroll: true });
          }
        },
        {
          immediate: true
        }
      )
    );

    return () => {
      return h('td', [
        h(
          'button',
          {
            ref: buttonRef,
            class: ['datepicker-cell', props.cell.classes, props.indicators],
            disabled: props.cell.isDisabled,
            tabindex: props.cell.isDisabled || props.cell.isSelected ? -1 : 0,
            'aria-label': props.cell.ariaLabel,
            onClick,
            onFocus,
            onMouseenter: onFocus
          },
          [props.cell.date.getDate(), props.cell.hasEvents ? generateEvents(props.cell.events) : undefined]
        )
      ]);
    };
  }
});
