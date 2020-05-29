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
function useNoticeTransition(props) {
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
        const position = options.position ?? props.position;
        remove.value();
        remove.value = showNotice({
            placement: position.includes('top') ? 'top' : 'bottom',
            render: render.value(options),
            transition: options.transition ?? transition.value,
            shouldQueue: options.shouldQueue ?? props.shouldQueue,
            duration: options.duration ?? props.duration
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