import "../../../../src/components/form/numberInput/number-input.sass";
import { getUseInputPropsDefinition } from '../../../composables/input/useInput';
import { constant } from 'fp-ts/lib/function';
import { h, defineComponent, defineAsyncComponent, computed, toRef } from 'vue';
import { useProxy } from '../../../composables/proxy';
import { isNumber, isString } from '../../../utils/helpers';
import BButton from '../../button/BButton';
import { BInput } from '../input/BInput';
import { DEFAULT_INPUT_ICONS } from '../shared/types';
const DEFAULT_NUMBER_INPUT_ICONS = {
  minus: defineAsyncComponent(() => import('../../icons/minus')),
  plus: defineAsyncComponent(() => import('../../icons/plus'))
};
const BNumberInputPropsDefinition = { ...getUseInputPropsDefinition(),
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
  return { ...DEFAULT_NUMBER_INPUT_ICONS,
    ...icons
  };
}

function getFieldClasses(controlsPosition, isExpanded) {
  const isCompact = controlsPosition === 'compact';
  return {
    'is-expanded': isExpanded,
    'has-addons': isCompact,
    'is-grouped': !isCompact
  };
}

function generateControl(props, data, isDecrement) {
  return h('p', {
    class: 'control'
  }, [h(BButton, {
    variant: props.variant || 'is-primary',
    size: props.size,
    isRounded: props.controlsRounded,
    isDisabled: isDecrement ? !data.canDecrement.value : !data.canIncrement.value,
    onClick: isDecrement ? data.onDecrement : data.onIncrement
  }, () => h(isDecrement ? props.numberInputIcons.minus : props.numberInputIcons.plus, {
    size: props.size
  }))]);
}

function generateInput(props, data, context) {
  return h(BInput, { ...context.attrs,
    modelValue: data.number.value,
    'onUpdate:modelValue': data.set,
    type: 'number',
    size: props.size,
    placeholder: props.placeholder ? `${props.placeholder}` : '',
    isDisabled: props.isDisabled,
    inputIcons: props.inputIcons,
    isReadonly: props.isReadonly,
    isLoading: props.isLoading,
    isRounded: props.isRounded,
    icon: props.icon,
    isExpanded: props.isExpanded,
    step: props.step,
    max: props.max,
    min: props.min
  });
}

export default defineComponent({
  name: 'b-number-input',
  props: BNumberInputPropsDefinition,

  setup(props, context) {
    const {
      value: number
    } = useProxy(toRef(props, 'modelValue'), toRef(props, 'onUpdate:modelValue'));
    const defaultMin = computed(() => props.min === Number.MIN_SAFE_INTEGER ? 0 : props.min);
    const defaultMax = computed(() => props.max === Number.MAX_SAFE_INTEGER ? 0 : props.max);
    const canDecrement = computed(() => (number.value ?? defaultMax.value) - props.step >= props.min);

    function onDecrement() {
      if (canDecrement.value) {
        number.value = (number.value ?? 0) - props.step;
      }
    }

    const canIncrement = computed(() => (props.modelValue ?? defaultMin.value) + props.step <= props.max);

    function onIncrement() {
      if (canIncrement.value) {
        number.value = (number.value ?? 0) + props.step;
      }
    }

    function set(val) {
      if (isString(val)) {
        const x = Number.parseFloat(val);
        if (Number.isNaN(x)) return;
        number.value = x;
      }

      if (isNumber(val)) {
        number.value = val;
      }
    }

    const data = {
      set,
      number,
      canDecrement,
      canIncrement,
      onDecrement,
      onIncrement
    };
    return () => {
      const nodes = props.displayControls ? [generateControl(props, data, true), generateInput(props, data, context), generateControl(props, data, false)] : [generateInput(props, data, context)];
      return h('div', {
        class: ['b-number-input field', getFieldClasses(props.controlsPosition, props.isExpanded)]
      }, nodes);
    };
  }

});
//# sourceMappingURL=BNumberInput.js.map