import './datepicker.sass';
import { FunctionN } from 'fp-ts/lib/function';
import { useFocus } from '../../../composables/focus';
import { DateCell, DetailedDateEvent, EventIndicator } from './shared';
import { addDays, isSameDay } from './utils';
import {
  isArrowDownEvent,
  isArrowLeftEvent,
  isArrowRightEvent,
  isArrowUpEvent,
  isEnterEvent,
  isSpaceEvent
} from '../../../utils/eventHelpers';
import { exists, none, Option, some } from 'fp-ts/lib/Option';
import { pipe } from 'fp-ts/lib/pipeable';
import { PropType, VNode, computed, defineComponent, reactive, shallowRef, h, nextTick } from 'vue';

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

export default defineComponent({
  name: 'b-datepicker-table-cell',
  props: {
    selectedDates: {
      type: Array as PropType<Date[]>,
      required: true
    },
    focusedDate: {
      type: Object as PropType<Option<Date>>,
      required: true
    },
    indicators: {
      type: String as PropType<EventIndicator>,
      required: true
    },
    cell: {
      type: Object as PropType<DateCell>,
      required: true
    },
    onSelect: {
      type: Function as PropType<FunctionN<[Date], void>>,
      required: true
    },
    onFocus: {
      type: Function as PropType<FunctionN<[Option<Date>], void>>,
      required: true
    }
  },
  setup(props) {
    const buttonRef = shallowRef((null as unknown) as HTMLElement);
    const focus = useFocus(
      reactive({
        isFocused: computed(() =>
          pipe(
            props.focusedDate,
            exists(date => isSameDay(date, props.cell.date))
          )
        ),
        focusOnMount: false
      }),
      buttonRef
    );

    function onClick(e: MouseEvent) {
      e.preventDefault();
      props.onSelect(props.cell.date);
    }

    function onKeydown(e: KeyboardEvent) {
      if (isEnterEvent(e) || isSpaceEvent(e)) {
        e.preventDefault();
        props.onSelect(props.cell.date);
      } else if (isArrowUpEvent(e)) {
        e.preventDefault();
        props.onFocus(some(addDays(props.cell.date, -7)));
      } else if (isArrowRightEvent(e)) {
        e.preventDefault();
        props.onFocus(some(addDays(props.cell.date, 1)));
      } else if (isArrowDownEvent(e)) {
        e.preventDefault();
        props.onFocus(some(addDays(props.cell.date, 7)));
      } else if (isArrowLeftEvent(e)) {
        e.preventDefault();
        props.onFocus(some(addDays(props.cell.date, -1)));
      }
    }
    return () => {
      return h('td', [
        h(
          'button',
          {
            ref: buttonRef,
            staticClass: 'datepicker-cell',
            class: [props.cell.classes, props.indicators, 'datepicker-cell'],
            disabled: props.cell.isDisabled,
            tabindex: props.cell.isDisabled || props.cell.isSelected ? -1 : 0,
            'aria-label': props.cell.ariaLabel,
            onClick,
            onKeydown,
            onFocus: () => props.onSelect(props.cell.date),
            onBlur: () => {
              nextTick(() => {
                if (focus.isFocused.value) {
                  props.onFocus(none);
                }
              });
            }
          },
          props.cell.hasEvents ? generateEvents(props.cell.events) : undefined
        )
      ]);
    };
  }
});
