import './b-numberinput.sass';
import { IO } from 'fp-ts/lib/IO';
import { getUseInputPropsDefinition } from '../../../composables/input/useInput';
import { constant, FunctionN } from 'fp-ts/lib/function';
import {
  h,
  VNode,
  defineComponent,
  defineAsyncComponent,
  PropType,
  ExtractPropTypes,
  computed,
  SetupContext,
  toRef,
  Ref
} from 'vue';
import { useProxy } from '../../../composables/proxy';
import { isNumber, isString } from '../../../utils/helpers';
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
    default: false,
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

function getFieldClasses(controlsPosition: BNumberInputControlsPosition, isExpanded: boolean) {
  const isCompact = controlsPosition === 'compact';
  return {
    'is-expanded': isExpanded,
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
          variant: props.variant || 'is-primary',
          size: props.size,
          isRounded: props.controlsRounded,
          isDisabled: isDecrement ? !data.canDecrement.value : !data.canIncrement.value,
          onClick: isDecrement ? data.onDecrement : data.onIncrement
        },
        () =>
          h((isDecrement ? props.numberInputIcons.minus : props.numberInputIcons.plus) as any, {
            size: props.size
          })
      )
    ]
  );
}

function generateInput(props: BNumberInputProps, data: BNumberInputData, context: SetupContext): VNode {
  return h(BInput, {
    ...context.attrs,
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

interface BNumberInputData {
  set: FunctionN<[unknown], void>;
  number: Ref<number | undefined>;
  canIncrement: Ref<boolean>;
  onDecrement: IO<void>;
  onIncrement: IO<void>;
  canDecrement: Ref<boolean>;
}

export default defineComponent({
  name: 'b-number-input',
  props: BNumberInputPropsDefinition,
  setup(props, context) {
    const { value: number } = useProxy<number | undefined>(
      toRef(props, 'modelValue'),
      toRef(props, 'onUpdate:modelValue') as Ref<FunctionN<[number | undefined], void>>
    );

    const defaultMin = computed(() => props.min === Number.MIN_SAFE_INTEGER ? 0 : props.min);

    const defaultMax = computed(() => props.max === Number.MAX_SAFE_INTEGER ? 0 : props.max)

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

    function set(val: unknown) {
      if (isString(val)) {
        const x = Number.parseFloat(val);
        if (Number.isNaN(x)) return;
        number.value = x;
      }
      if (isNumber(val)) {
        number.value = val;
      }
    }

    const data: BNumberInputData = {
      set,
      number,
      canDecrement,
      canIncrement,
      onDecrement,
      onIncrement
    };

    return () => {
      const nodes = props.displayControls
        ? [generateControl(props, data, true), generateInput(props, data, context), generateControl(props, data, false)]
        : [generateInput(props, data, context)];
      return h('div', { class: ['b-number-input field', getFieldClasses(props.controlsPosition, props.isExpanded)] }, nodes);
    };
  }
});
