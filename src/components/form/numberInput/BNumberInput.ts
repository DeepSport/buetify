import './b-numberinput.sass';
import { IO } from 'fp-ts/lib/IO';
import { getUseInputPropsDefinition } from '../../../composables/input/useInput';
import { Model, useModel } from '../../../composables/model';
import { constant, constVoid, FunctionN } from 'fp-ts/lib/function';
import { h, VNode, defineComponent, defineAsyncComponent, PropType, ExtractPropTypes, computed } from 'vue';
import BButton from '../../button/BButton';
import { BInput } from '../input/BInput';
import { InputIcons, NumberInputIcons, DEFAULT_INPUT_ICONS } from '../shared/types';

export type BNumberInputControlsPosition = 'compact' | '';

const DEFAULT_NUMBER_INPUT_ICONS: NumberInputIcons = {
  minus: defineAsyncComponent(() => import('../../icons/minus')),
  plus: defineAsyncComponent(() => import('../../icons/plus'))
};

const BNumberInputPropsDefinition = {
  ...getUseInputPropsDefinition<number>(),
  value: {
    type: Number as PropType<number>,
    default: 0
  },
  onInput: {
    type: Function as PropType<FunctionN<[number], void>>,
    default: constant(constVoid)
  },
  min: {
    type: Number as PropType<number>,
    default: Number.MIN_SAFE_INTEGER
  },
  max: {
    type: Number as PropType<number>,
    default: Number.MAX_SAFE_INTEGER
  },
  step: {
    type: Number as PropType<number>,
    default: 1
  },
  displayControls: {
    type: Boolean as PropType<boolean>,
    default: true
  },
  controlsRounded: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  controlsPosition: {
    type: String as PropType<BNumberInputControlsPosition>,
    default: '' as const
  },
  inputIcons: {
    type: Object as PropType<InputIcons>,
    default: constant(DEFAULT_INPUT_ICONS)
  },
  numberInputIcons: {
    type: Object as PropType<NumberInputIcons>,
    default: constant(DEFAULT_NUMBER_INPUT_ICONS)
  }
};

export type BNumberInputProps = ExtractPropTypes<typeof BNumberInputPropsDefinition>;

export function getNumberInputIcons(icons: Partial<NumberInputIcons>): NumberInputIcons {
  return { ...DEFAULT_NUMBER_INPUT_ICONS, ...icons };
}

function getFieldClasses(controlsPosition: BNumberInputControlsPosition) {
  const isCompact = controlsPosition === 'compact';
  return {
    'has-addons': isCompact,
    'is-grouped': !isCompact
  };
}

function generateControl(props: BNumberInputProps, data: BNumberInputData, isDecrement: boolean): VNode {
  return h(
    'p',
    {
      class: 'control'
    },
    [
      h(
        BButton,
        {
          variant: props.variant,
          size: props.size,
          isRounded: props.controlsRounded,
          isDisabled: isDecrement ? !data.canDecrement : !data.canIncrement,
          onClick: isDecrement ? data.onDecrement : data.onIncrement
        },
        [
          h(isDecrement ? props.numberInputIcons.minus : props.numberInputIcons.plus, {
            size: props.size
          })
        ]
      )
    ]
  );
}

function generateInput(props: BNumberInputProps, model: Model<number>, data: BNumberInputData): VNode {
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

interface BNumberInputData {
  canIncrement: boolean;
  onDecrement: IO<void>;
  onIncrement: IO<void>;
  canDecrement: boolean;
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
      const data: BNumberInputData = {
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
