import './b-numberinput.sass';
import { getUseInputPropsDefinition } from '../../../composables/input/useInput';
import { useModel } from '../../../composables/model';
import { constant, constVoid } from 'fp-ts/lib/function';
import { h, defineComponent, defineAsyncComponent, computed } from 'vue';
import BButton from '../../button/BButton';
import { BInput } from '../input/BInput';
import { DEFAULT_INPUT_ICONS } from '../shared/types';
const DEFAULT_NUMBER_INPUT_ICONS = {
    minus: defineAsyncComponent(() => import('../../icons/minus')),
    plus: defineAsyncComponent(() => import('../../icons/plus'))
};
const BNumberInputPropsDefinition = {
    ...getUseInputPropsDefinition(),
    value: {
        type: Number,
        default: 0
    },
    onInput: {
        type: Function,
        default: constant(constVoid)
    },
    min: {
        type: Number,
        default: Number.MIN_SAFE_INTEGER
    },
    max: {
        type: Number,
        default: Number.MAX_SAFE_INTEGER
    },
    step: {
        type: Number,
        default: 1
    },
    displayControls: {
        type: Boolean,
        default: true
    },
    controlsRounded: {
        type: Boolean,
        default: false
    },
    controlsPosition: {
        type: String,
        default: ''
    },
    inputIcons: {
        type: Object,
        default: constant(DEFAULT_INPUT_ICONS)
    },
    numberInputIcons: {
        type: Object,
        default: constant(DEFAULT_NUMBER_INPUT_ICONS)
    }
};
export function getNumberInputIcons(icons) {
    return { ...DEFAULT_NUMBER_INPUT_ICONS, ...icons };
}
function getFieldClasses(controlsPosition) {
    const isCompact = controlsPosition === 'compact';
    return {
        'has-addons': isCompact,
        'is-grouped': !isCompact
    };
}
function generateControl(props, data, isDecrement) {
    return h('p', {
        class: 'control'
    }, [
        h(BButton, {
            variant: props.variant,
            size: props.size,
            isRounded: props.controlsRounded,
            isDisabled: isDecrement ? !data.canDecrement : !data.canIncrement,
            onClick: isDecrement ? data.onDecrement : data.onIncrement
        }, [
            h(isDecrement ? props.numberInputIcons.minus : props.numberInputIcons.plus, {
                size: props.size
            })
        ])
    ]);
}
function generateInput(props, model, data) {
    return h(BInput, {
        props: {
            value: model.value.value,
            onInput: model.set,
            type: 'number',
            size: props.size,
            inputIcons: props.inputIcons,
            isReadonly: props.isReadonly,
            isLoading: props.isLoading,
            isRounded: props.isRounded,
            icon: props.icon,
            isExpanded: props.isExpanded,
            step: props.step,
            max: props.max,
            min: props.min
        }
    });
}
export default defineComponent({
    name: 'b-number-input',
    props: BNumberInputPropsDefinition,
    setup(props) {
        const model = useModel(props);
        const canDecrement = computed(() => (model.value.value || 0) - props.step > props.min);
        function onDecrement() {
            if (canDecrement.value) {
                model.value.value = (model.value.value || 0) - props.step;
            }
        }
        const canIncrement = computed(() => (model.value.value || 0) + props.step < props.max);
        function onIncrement() {
            if (canIncrement.value) {
                model.value.value = (model.value.value || 0) + props.step;
            }
        }
        return () => {
            const data = {
                canDecrement: canDecrement.value,
                canIncrement: canIncrement.value,
                onDecrement,
                onIncrement
            };
            const nodes = props.displayControls
                ? [generateControl(props, data, true), generateInput(props, model, data), generateControl(props, data, false)]
                : [generateInput(props, model, data)];
            return h('div', { class: ['b-number-input field', getFieldClasses(props.controlsPosition)] }, nodes);
        };
    }
});
//# sourceMappingURL=BNumberInput.js.map