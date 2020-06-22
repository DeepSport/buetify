import './steps.sass';
import { getUseModelPropsDefinition, Model, useModel } from '../../composables/model';
import { DefaultThemePropsDefinition } from '../../composables/theme';
import BHorizontalDivider from '../layout/divider/BHorizontalDivider';
import { ColorVariant } from '../../types/ColorVariants';
import { lookup } from 'fp-ts/lib/Array';
import { isSome, map } from 'fp-ts/lib/Option';
import { pipe } from 'fp-ts/lib/pipeable';
import {
  Transition,
  withDirectives,
  resolveDirective,
  Directive,
  Ref,
  defineComponent,
  nextTick,
  VNode,
  PropType,
  onBeforeMount,
  h,
  ExtractPropTypes,
  provide,
  computed,
  shallowRef
} from 'vue';
import { BStepItemData, StepInjection, STEPS_SYMBOL } from './shared';

export type StepsSize = 'is-small' | 'is-medium' | 'is-large' | '';

type StepTransition = 'slide-next' | 'slide-prev';

export const BStepsPropsDefinition = {
  ...getUseModelPropsDefinition<number>(),
  ...DefaultThemePropsDefinition,
  variant: {
    type: String as PropType<ColorVariant>,
    default: 'is-link' as const
  },
  size: {
    type: String as PropType<StepsSize>,
    default: '' as const
  },
  isAnimated: {
    type: Boolean as PropType<boolean>,
    default: true
  }
};

export type BStepsProps = ExtractPropTypes<typeof BStepsPropsDefinition>;

function getOnStepClick(index: number, model: Model<number>, transition: Ref<StepTransition>) {
  return () => {
    const val = model.value.value || 0;
    if (val !== index) {
      transition.value = index < val ? 'slide-next' : 'slide-prev';
      nextTick(() => {
        model.set(index);
      });
    }
  };
}

function generateNavItemStepDetails(step: BStepItemData): VNode {
  return h('div', { class: 'step-details' }, [h('span', { class: 'step-title' }, step.props.label)]);
}

function generateNavItemStepMarker(props: BStepsProps, step: BStepItemData): VNode {
  return h('div', { class: 'step-marker' }, step.props.icon ? [h(step.props.icon, { size: props.size })] : []);
}

function generateNavItemContent(
  props: BStepsProps,
  step: BStepItemData,
  index: number,
  model: Model<number>,
  transition: Ref<StepTransition>
): VNode {
  return h(
    'a',
    {
      class: ['step-link', { 'is-clickable': step.props.isClickable }],
      onClick: step.props.isClickable ? getOnStepClick(index, model, transition) : undefined
    },
    [generateNavItemStepMarker(props, step), generateNavItemStepDetails(step)]
  );
}

function getGenerateNavItem(
  props: BStepsProps,
  model: Model<number>,
  transition: Ref<StepTransition>,
  vShow: Directive
) {
  return function generateNavItem(step: BStepItemData, index: number): VNode {
    return withDirectives(
      h(
        'li',
        {
          key: step.props.label,
          class: [
            'step-item',
            step.props.variant || props.variant,
            {
              'is-active': index === model.value.value,
              'is-completed': step.props.isCompleted || (model.value.value as number) > index
            }
          ]
        },
        [generateNavItemContent(props, step, index, model, transition)]
      ),
      [[vShow, step.props.isVisible]]
    );
  };
}

function generateNavHeader(
  props: BStepsProps,
  steps: BStepItemData[],
  model: Model<number>,
  transition: Ref<StepTransition>,
  vShow: Directive
): VNode {
  return h('nav', { class: ['steps', props.variant, props.size] }, [
    h('ul', { class: 'step-items' }, steps.map(getGenerateNavItem(props, model, transition, vShow)))
  ]);
}

function generateStepContent(
  props: BStepsProps,
  steps: BStepItemData[],
  model: Model<number>,
  transition: Ref<StepTransition>
): VNode {
  return h(
    'section',
    {
      class: 'step-content',
      'aria-label': 'Step Content'
    },
    props.isAnimated
      ? [h(Transition, { name: transition.value }, steps[model.value.value || 0].render())]
      : steps[model.value.value || 0].render()
  );
}

const HorizontalDivider = h(BHorizontalDivider);

export default defineComponent({
  name: 'b-steps',
  props: BStepsPropsDefinition,
  setup(props, context) {
    const vShow = resolveDirective('show') as Directive;
    const model = useModel(props);
    const transition = shallowRef('slide-next' as 'slide-next' | 'slide-prev');
    const currentStep = computed(() => lookup(model.value.value || 0, injection.steps.value));
    const injection: StepInjection = {
      steps: shallowRef([] as BStepItemData[]),
      activeLabel: computed(() =>
        pipe(
          currentStep.value,
          map(n => n.props.label)
        )
      )
    };

    provide(STEPS_SYMBOL, injection);

    onBeforeMount(() => {
      if (model.value.value === undefined || (isSome(currentStep.value) && !currentStep.value.value.props.isVisible)) {
        model.set(
          Math.max(
            injection.steps.value.findIndex(step => step.props.isVisible),
            0
          )
        );
      }
    });

    return () => {
      const steps = injection.steps.value;
      return h('article', { class: 'b-steps' }, [
        generateNavHeader(props, steps, model, transition, vShow),
        HorizontalDivider,
        generateStepContent(props, steps, model, transition)
      ]);
    };
  }
});
