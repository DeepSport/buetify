import './datepicker.sass';
import BDatepickerTableCell from './BDatepickerTableCell';
import { DateCell, DateEvent, DetailedDateEvent } from './shared';
import { elemSerialDate, isDate, isOnOrAfterDate, isOnOrBeforeDate, isSameDay } from './utils';
import { constEmptyArray, constNone } from '../../../utils/helpers';
import { isNonEmpty } from 'fp-ts/lib/Array';
import { constTrue, FunctionN, identity } from 'fp-ts/lib/function';
import { fold, Option } from 'fp-ts/lib/Option';
import { pipe } from 'fp-ts/lib/pipeable';
import { defineComponent, PropType, VNode, computed, Ref, ExtractPropTypes, h } from 'vue';

export const BDatepickerTableRowPropsDefinition = {
	modelValue: {
		type: [Date, Array] as PropType<Date | Date[]>,
		required: true as const
	},
	'onUpdate:modelValue': {
		type: Function as PropType<FunctionN<[Date | Date[]], void>>,
		required: true as const
	},
	focusedDate: {
		type: Object as PropType<Option<Date>>,
		required: true as const
	},
	'onUpdate:focusedDate': {
		type: Function as PropType<FunctionN<[Option<Date>], any>>,
		required: true as const
	},
	showWeekNumber: {
		type: Boolean as PropType<boolean>,
		default: false as const
	},
	weekNumber: {
		type: Number as PropType<number>,
		required: true as const
	},
	week: {
		type: Array as PropType<Date[]>,
		required: true as const
	},
	month: {
		type: Number as PropType<number>,
		required: true as const
	},
	minDate: {
		type: Object as PropType<Option<Date>>,
		required: true as const
	},
	maxDate: {
		type: Object as PropType<Option<Date>>,
		required: true as const
	},
	isDisabled: {
		type: Boolean as PropType<boolean>,
		default: false as const
	},
	unselectableDates: {
		type: Array as PropType<Date[]>,
		default: constEmptyArray
	},
	unselectableDaysOfWeek: {
		type: Array as PropType<number[]>,
		default: constEmptyArray
	},
	selectableDates: {
		type: Object as PropType<Option<Date[]>>,
		default: constNone
	},
	events: {
		type: Array as PropType<DateEvent[]>,
		default: constEmptyArray
	},
	indicators: {
		type: String as PropType<'dots' | 'bars'>,
		required: true as const
	}
};

export type BDatePickerTableRowProps = ExtractPropTypes<typeof BDatepickerTableRowPropsDefinition>;

function getIsAfterMinDate(props: BDatePickerTableRowProps) {
	return function isAfterMinDate(date: Date): boolean {
		return pipe(
			props.minDate,
			fold(constTrue, d => isOnOrAfterDate(date, d))
		);
	};
}

function getIsBeforeMaxDate(props: BDatePickerTableRowProps) {
	return function isBeforeMaxDate(date: Date): boolean {
		return pipe(
			props.maxDate,
			fold(constTrue, d => isOnOrBeforeDate(date, d))
		);
	};
}

function getIsWithinMonth(props: BDatePickerTableRowProps) {
	return function isWithinMonth(date: Date): boolean {
		return date.getMonth() === props.month;
	};
}

function getIsEnabled(props: BDatePickerTableRowProps) {
	return function isEnabled(date: Date): boolean {
		return (
			!elemSerialDate(date, props.unselectableDates) &&
			pipe(
				props.selectableDates,
				fold(constTrue, dates => elemSerialDate(date, dates))
			)
		);
	};
}

function getIsOnSelectableDayOfWeek(props: BDatePickerTableRowProps) {
	return function isOnSelectableDayOfWeek(date: Date): boolean {
		return !props.unselectableDaysOfWeek.includes(date.getDay());
	};
}

function getDatePredicates(props: BDatePickerTableRowProps) {
	const isAfterMinDate = getIsAfterMinDate(props);
	const isBeforeMaxDate = getIsBeforeMaxDate(props);
	const isWithinMonth = getIsWithinMonth(props);
	const isEnabled = getIsEnabled(props);
	const isOnSelectableDayOfWeek = getIsOnSelectableDayOfWeek(props);
	function isSelectedDate(date: Date): boolean {
		return Array.isArray(props.modelValue)
			? props.modelValue.some(d => isSameDay(d, date))
			: isSameDay(props.modelValue, date);
	}
	function isSelectableDate(date: Date): boolean {
		return [
			isAfterMinDate(date),
			isBeforeMaxDate(date),
			isWithinMonth(date),
			isEnabled(date),
			isOnSelectableDayOfWeek(date)
		].every(identity);
	}
	return {
		isAfterMinDate,
		isBeforeMaxDate,
		isWithinMonth,
		isEnabled,
		isOnSelectableDayOfWeek,
		isSelectableDate,
		isSelectedDate
	};
}

type DatePredicates = ReturnType<typeof getDatePredicates>;

function getDateClassesGenerator(props: BDatePickerTableRowProps, predicates: DatePredicates) {
	const today = new Date();
	return function getDateClasses(date: Date | undefined | null, hasEvents = false) {
		if (isDate(date)) {
			const isSelectable = predicates.isSelectableDate(date);
			return {
				'is-selected': predicates.isSelectedDate(date),
				'is-today': isSameDay(date, today),
				'is-selectable': isSelectable && !props.isDisabled,
				'is-unselectable': !isSelectable || props.isDisabled,
				'has-event': hasEvents
			};
		} else {
			return {};
		}
	};
}

function generateWeekNumber(weekNumber: number): VNode {
	return h('td', [`${weekNumber}`]);
}

function getGenerateCell(props: BDatePickerTableRowProps) {
	return function generateCell(cell: DateCell): VNode {
		return h(BDatepickerTableCell, {
			key: cell.date.toLocaleDateString(),
			cell,
			modelValue: props.modelValue,
			'onUpdate:modelValue': props['onUpdate:modelValue'],
			focusedDate: props.focusedDate,
			'onUpdate:focusedDate': props['onUpdate:focusedDate'],
			indicators: props.indicators,
		});
	};
}

export default defineComponent({
	name: 'b-datepicker-table-row',
	props: BDatepickerTableRowPropsDefinition,
	setup(props) {
		const formattedEvents: Ref<DetailedDateEvent[]> = computed(() =>
			props.events.map(event => (isDate(event) ? { date: event, variant: 'is-primary' } : event))
		);
		const predicates = getDatePredicates(props);
		const getDateClasses = getDateClassesGenerator(props, predicates);
		const cells = computed(() =>
			props.week.map(date => {
				const events = formattedEvents.value.filter(event => isSameDay(date, event.date));
				const hasEvents = isNonEmpty(events);
				return {
					date,
					events,
					hasEvents,
					isSelected: predicates.isSelectedDate(date),
					isDisabled: props.isDisabled || !predicates.isSelectableDate(date),
					number: date.getDate(),
					ariaLabel: date.toLocaleDateString(),
					classes: getDateClasses(date, hasEvents)
				};
			})
		);
		const generateCell = getGenerateCell(props);
		return () => {
			return h(
				'tr',
				{ class: 'datepicker-row' },
				props.showWeekNumber
					? [generateWeekNumber(props.weekNumber), ...cells.value.map(generateCell)]
					: cells.value.map(generateCell)
			);
		};
	}
});
