import './datepicker.sass';
import { FunctionN } from 'fp-ts/lib/function';
import { DateCell, EventIndicator } from './shared';
import { Option } from 'fp-ts/lib/Option';
import { PropType, VNode } from 'vue';
declare const _default: import("vue").DefineComponent<{
    modelValue: {
        type: PropType<Date | Date[]>;
    };
    'onUpdate:modelValue': {
        type: PropType<FunctionN<[Date | Date[]], void>>;
        required: true;
    };
    focusedDate: {
        type: PropType<Option<Date>>;
        required: true;
    };
    'onUpdate:focusedDate': {
        type: PropType<FunctionN<[Option<Date>], void>>;
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
}, () => VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    "onUpdate:modelValue": FunctionN<[Date | Date[]], void>;
    focusedDate: Option<Date>;
    "onUpdate:focusedDate": FunctionN<[Option<Date>], void>;
    indicators: EventIndicator;
    cell: DateCell;
} & {
    modelValue?: Date | Date[] | undefined;
}>, {}>;
export default _default;
