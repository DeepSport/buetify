import './datepicker.sass';
import { DateCell, DetailedDateEvent, EventIndicator } from './shared';
import { Option } from 'fp-ts/lib/Option';
import Vue, { PropType, VNode } from 'vue';
interface options extends Vue {
    $refs: {
        button: HTMLButtonElement;
    };
}
declare const _default: import("vue/types/vue").OptionsVue<options & Vue, unknown, {
    onBlur(): void;
    onFocus(): void;
    onClick(e: MouseEvent): void;
    onKeydown(e: KeyboardEvent): void;
    generateCell(): VNode;
    generateButton(): VNode;
    generateEvents(events: DetailedDateEvent[]): VNode;
}, {
    isFocused: boolean;
}, {
    selectedDates: Date[];
    focusedDate: Option<Date>;
    indicators: EventIndicator;
    cell: DateCell;
}, {
    name: string;
    props: {
        selectedDates: {
            type: PropType<Date[]>;
            required: true;
        };
        focusedDate: {
            type: PropType<Option<Date>>;
            required: true;
        };
        indicators: {
            type: PropType<EventIndicator>;
            required: true;
        };
        cell: {
            type: PropType<DateCell>;
            required: true;
        };
    };
    computed: {
        isFocused(): boolean;
    };
    watch: {
        isFocused: {
            handler(val: boolean, oldVal: boolean): void;
            immediate: true;
        };
    };
    methods: {
        onBlur(): void;
        onFocus(): void;
        onClick(e: MouseEvent): void;
        onKeydown(e: KeyboardEvent): void;
        generateCell(): VNode;
        generateButton(): VNode;
        generateEvents(events: DetailedDateEvent[]): VNode;
    };
    render(): VNode;
}>;
export default _default;
