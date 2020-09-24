import './datepicker.sass';
import { FunctionN } from 'fp-ts/lib/function';
import { DateCell, EventIndicator } from './shared';
import { Option } from 'fp-ts/lib/Option';
import { PropType, VNode } from 'vue';
declare const _default: (new () => import("vue").ComponentPublicInstance<{
    cell: DateCell;
    onFocus: FunctionN<[Option<Date>], void>;
    selectedDates: Date[];
    focusedDate: Option<Date>;
    indicators: EventIndicator;
    onSelect: FunctionN<[Date], void>;
} & {}, () => VNode<import("vue").RendererNode, import("vue").RendererElement>, {}, {}, {}, Record<string, any>, import("vue").VNodeProps, import("vue").ComponentOptionsBase<{
    cell: DateCell;
    onFocus: FunctionN<[Option<Date>], void>;
    selectedDates: Date[];
    focusedDate: Option<Date>;
    indicators: EventIndicator;
    onSelect: FunctionN<[Date], void>;
} & {}, () => VNode<import("vue").RendererNode, import("vue").RendererElement>, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string>>) & import("vue").ComponentOptionsBase<Readonly<{
    cell: DateCell;
    onFocus: FunctionN<[Option<Date>], void>;
    selectedDates: Date[];
    focusedDate: Option<Date>;
    indicators: EventIndicator;
    onSelect: FunctionN<[Date], void>;
} & {}>, () => VNode<import("vue").RendererNode, import("vue").RendererElement>, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string> & {
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
        onSelect: {
            type: PropType<FunctionN<[Date], void>>;
            required: true;
        };
        onFocus: {
            type: PropType<FunctionN<[Option<Date>], void>>;
            required: true;
        };
    };
} & ThisType<import("vue").ComponentPublicInstance<Readonly<{
    cell: DateCell;
    onFocus: FunctionN<[Option<Date>], void>;
    selectedDates: Date[];
    focusedDate: Option<Date>;
    indicators: EventIndicator;
    onSelect: FunctionN<[Date], void>;
} & {}>, () => VNode<import("vue").RendererNode, import("vue").RendererElement>, {}, {}, {}, Record<string, any>, Readonly<{
    cell: DateCell;
    onFocus: FunctionN<[Option<Date>], void>;
    selectedDates: Date[];
    focusedDate: Option<Date>;
    indicators: EventIndicator;
    onSelect: FunctionN<[Date], void>;
} & {}>, import("vue").ComponentOptionsBase<Readonly<{
    cell: DateCell;
    onFocus: FunctionN<[Option<Date>], void>;
    selectedDates: Date[];
    focusedDate: Option<Date>;
    indicators: EventIndicator;
    onSelect: FunctionN<[Date], void>;
} & {}>, () => VNode<import("vue").RendererNode, import("vue").RendererElement>, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string>>>;
export default _default;
