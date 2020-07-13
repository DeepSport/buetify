import { constVoid, not } from 'fp-ts/lib/function';
import { provide, shallowRef, computed, watch, toRef } from 'vue';
import { isEmptyString, isString } from '../../utils/helpers';
import { useLabelId, UseLabelIdPropsDefinition } from '../labelId';
export const PROVIDE_FIELD_DATA_INJECTION_SYMBOL = Symbol('use-field-data');
export const ProvideFieldDataPropsDefinition = Object.assign(Object.assign({}, UseLabelIdPropsDefinition), { variant: {
        type: [String, Object],
        required: false
    }, message: {
        type: [String, Array, Object],
        required: false
    }, isExpanded: {
        type: Boolean,
        default: false
    } });
export function formatMessage(message) {
    if (isString(message)) {
        return message;
    }
    else {
        const messages = [];
        if (Array.isArray(message)) {
            message.forEach(m => {
                if (isString(m)) {
                    messages.push(m);
                }
                else {
                    for (const key in m) {
                        if (m[key]) {
                            messages.push(key);
                        }
                    }
                }
            });
        }
        else {
            for (const key in message) {
                if (message[key]) {
                    messages.push(key);
                }
            }
        }
        return messages.filter(not(isEmptyString)).join(' <br> ');
    }
}
export const DEFAULT_FIELD_DATA_INJECTION = {
    attrs: {
        label: shallowRef(''),
        isFullwidth: shallowRef(false),
        isExpanded: shallowRef(false),
        message: shallowRef(''),
        messageVariant: shallowRef(),
        id: shallowRef(),
        labelId: shallowRef()
    },
    setters: {
        onNewMessage: constVoid,
        onNewVariant: constVoid
    }
};
export function provideFieldData(props) {
    const label = useLabelId(props, 'field');
    const variant = shallowRef(props.variant);
    watch(toRef(props, 'variant'), newVariant => {
        variant.value = newVariant;
    });
    const message = shallowRef(props.message);
    watch(toRef(props, 'message'), newMessage => {
        message.value = newMessage;
    });
    const formattedMessage = computed(() => formatMessage(message.value));
    const isExpanded = toRef(props, 'isExpanded');
    const attrs = {
        label: toRef(props, 'label'),
        isFullwidth: isExpanded,
        isExpanded: isExpanded,
        message: formattedMessage,
        messageVariant: variant,
        id: label.id,
        labelId: label.labelId
    };
    const setters = {
        onNewMessage: (newMessage) => {
            message.value = newMessage;
        },
        onNewVariant: (newVariant) => {
            variant.value = newVariant;
        }
    };
    const injection = {
        attrs,
        setters
    };
    provide(PROVIDE_FIELD_DATA_INJECTION_SYMBOL, injection);
    return injection;
}
//# sourceMappingURL=provideFieldData.js.map