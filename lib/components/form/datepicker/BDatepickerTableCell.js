import "../../../../src/components/form/datepicker/datepicker.sass";
import { useFocus } from '../../../composables/focus';
import { addDays, isSameDay } from './utils';
import { isArrowDownEvent, isArrowLeftEvent, isArrowRightEvent, isArrowUpEvent, isEnterEvent, isSpaceEvent } from '../../../utils/eventHelpers';
import { exists, none, some } from 'fp-ts/lib/Option';
import { pipe } from 'fp-ts/lib/pipeable';
import { computed, defineComponent, reactive, shallowRef, h, nextTick } from 'vue';

function generateEvents(events) {
  return h('div', {
    class: 'events'
  }, events.map((event, index) => h('div', {
    key: index,
    class: ['event', event.variant]
  })));
}

export default defineComponent({
  name: 'b-datepicker-table-cell',
  props: {
    selectedDates: {
      type: Array,
      required: true
    },
    focusedDate: {
      type: Object,
      required: true
    },
    indicators: {
      type: String,
      required: true
    },
    cell: {
      type: Object,
      required: true
    },
    onSelect: {
      type: Function,
      required: true
    },
    onFocus: {
      type: Function,
      required: true
    }
  },

  setup(props) {
    const buttonRef = shallowRef(null);
    const focus = useFocus(reactive({
      isFocused: computed(() => pipe(props.focusedDate, exists(date => isSameDay(date, props.cell.date)))),
      focusOnMount: false
    }), buttonRef);

    function onClick(e) {
      e.preventDefault();
      props.onSelect(props.cell.date);
    }

    function onKeydown(e) {
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
      return h('td', [h('button', {
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
      }, props.cell.hasEvents ? generateEvents(props.cell.events) : undefined)]);
    };
  }

});
//# sourceMappingURL=BDatepickerTableCell.js.map