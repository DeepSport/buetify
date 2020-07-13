import { constVoid } from 'fp-ts/lib/function';
import { inject, shallowRef, onUnmounted, computed } from 'vue';
import { formatTransition } from '../transition';
import { DEFAULT_NOTICE_CONTROLLER_INJECTION, NOTICE_CONTROLLER_SYMBOL } from './provideNoticeController';
export const UseNoticePropsDefinition = {
    transition: {
        type: [Object, String],
        required: false
    },
    position: {
        type: String,
        default: 'is-bottom'
    },
    duration: {
        type: Number,
        default: 2000
    },
    message: {
        type: String
    },
    shouldQueue: {
        type: Boolean,
        default: true
    },
    variant: {
        type: String,
        default: 'is-primary'
    },
    isIndefinite: {
        type: Boolean,
        default: false
    }
};
export const DEFAULT_USE_NOTICE_PROPS = {
    position: UseNoticePropsDefinition.position.default,
    duration: UseNoticePropsDefinition.duration.default,
    shouldQueue: UseNoticePropsDefinition.shouldQueue.default,
    variant: UseNoticePropsDefinition.variant.default,
    isIndefinite: UseNoticePropsDefinition.isIndefinite.default
};
function useNoticeTransition(props = DEFAULT_USE_NOTICE_PROPS) {
    return computed(() => {
        if (!!props.transition) {
            return formatTransition(props.transition);
        }
        else {
            switch (props.position) {
                case 'is-top-right':
                case 'is-top':
                case 'is-top-left':
                    return {
                        'enter-active-class': 'fadeInDown',
                        'leave-active-class': 'fadeOut'
                    };
                case 'is-bottom-right':
                case 'is-bottom':
                case 'is-bottom-left':
                    return {
                        'enter-active-class': 'fadeInUp',
                        'leave-active-class': 'fadeOut'
                    };
            }
        }
    });
}
export function useNoticeController(props, render) {
    const remove = shallowRef(constVoid);
    const { showNotice } = inject(NOTICE_CONTROLLER_SYMBOL, DEFAULT_NOTICE_CONTROLLER_INJECTION);
    const transition = useNoticeTransition(props);
    onUnmounted(() => {
        remove.value();
    });
    function open(options) {
        var _a, _b, _c, _d;
        const position = (_a = options.position) !== null && _a !== void 0 ? _a : props.position;
        remove.value();
        remove.value = showNotice({
            placement: position.includes('top') ? 'top' : 'bottom',
            render: render.value(options),
            transition: (_b = options.transition) !== null && _b !== void 0 ? _b : transition.value,
            shouldQueue: (_c = options.shouldQueue) !== null && _c !== void 0 ? _c : props.shouldQueue,
            duration: (_d = options.duration) !== null && _d !== void 0 ? _d : props.duration
        });
    }
    return {
        open: open,
        close: () => {
            remove.value();
            remove.value = constVoid;
        }
    };
}
//# sourceMappingURL=useNoticeController.js.map