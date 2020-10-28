import './steps.sass';
import { lookup } from 'fp-ts/lib/Array';
import { pipe } from 'fp-ts/lib/function';
import { getUseModelPropsDefinition, Model, useModel } from '../../composables/model';
import { DefaultThemePropsDefinition, useTheme } from '../../composables/theme';
import { ColorVariant } from '../../types/ColorVariants';
import { map } from 'fp-ts/lib/Option';
import {
  computed,
  cloneVNode,
  TransitionGroup,
  Ref,
  defineComponent,
  nextTick,
  VNode,
  PropType,
  h,
  ExtractPropTypes,
  provide,
  shallowRef,
  withDirectives,
  vShow,
  shallowReactive,
  SetupContext,
  ComponentOptions
} from 'vue';
import { BStepItemProps, StepInjection, STEPS_SYMBOL } from './shared';

export type StepsSize = 'is-small' | 'is-medium' | 'is-large' | '';

type StepTransition = 'slide-next' | 'slide-prev';

export type StepsPosition = 'is-right' | '';

export type StepLabelPosition = 'is-right' | 'is-left' | '';

export type StepsMobileMode = 'minimal' | 'compact' | '';

export const BStepsPropsDefinition = {
  ...getUseModelPropsDefinition<number>(),
  ...DefaultThemePropsDefinition,
  position: {
    type: String as PropType<StepsPosition>,
    default: '' as const
  },
  labelPosition: {
    type: String as PropType<StepLabelPosition>,
    default: ''
  },
  variant: {
    type: String as PropType<ColorVariant>,
    default: '' as const
  },
  size: {
    type: String as PropType<StepsSize>,
    default: '' as const
  },
  isAnimated: {
    type: Boolean as PropType<boolean>,
    default: true
  },
  mobileMode: {
    type: String as PropType<StepsMobileMode>,
    default: 'minimal' as const
  },
  isRounded: {
    type: Boolean,
    default: true
  },
  isVertical: {
    type: Boolean,
    default: false
  }
};

export type BStepsProps = ExtractPropTypes<typeof BStepsPropsDefinition>;

function getOnStepItemClick(index: number, model: Model<number>, transition: Ref<StepTransition>) {
  return () => {
    const val = model.modelValue.value || 0;
    if (val !== index) {
      transition.value = index < val ? 'slide-next' : 'slide-prev';
      nextTick().then(() => {
        model.modelValue.value = index;
      });
    }
  };
}

function getGenerateNavItem(
  props: BStepsProps,
  model: Model<number>,
  injection: StepInjection,
  transition: Ref<StepTransition>
) {
  return function generateNavItem(step: BStepItemProps, index: number): VNode {
    const currentIndex = model.modelValue.value || 0;
    const isClickable = step.isClickable ?? index < currentIndex;
    return withDirectives(
      h(
        'li',
        {
          key: step.label,
          class: [
            step.variant || props.variant,
            'step-item',
            {
              'is-previous': index < currentIndex,
              'is-active': index === currentIndex
            }
          ]
        },
        [
          h(
            'a',
            {
              class: [
                'step-link',
                {
                  'is-clickable': isClickable
                }
              ],
              onClick: isClickable ? getOnStepItemClick(index, model, transition) : undefined
            },
            [
              h(
                'div',
                { class: 'step-marker' },
                step.icon ? h(step.icon as ComponentOptions, { size: props.size }) : step.step ?? `${index + 1}`
              ), //eslint-disable-line
              h('div', { class: 'step-details' }, [h('span', { class: 'step-title' }, step.label)])
            ]
          )
        ]
      ),
      [[vShow, injection.steps[index]?.isVisible ?? true]]
    );
  };
}

function generateNavHeader(
  props: BStepsProps,
  model: Model<number>,
  injection: StepInjection,
  transition: Ref<StepTransition>,
  themeClasses: string[]
): VNode {
  return h(
    'nav',
    {
      class: [
        'steps',
        props.size,
        props.variant || null,
        {
          'is-rounded': props.isRounded,
          'is-animated': props.isAnimated,
          'has-label-right': props.labelPosition === 'is-right',
          'has-label-left': props.labelPosition === 'is-left',
          'mobile-minimalist': props.mobileMode === 'minimal',
          'mobile-compact': props.mobileMode === 'compact'
        },
        ...themeClasses
      ]
    },
    h('ul', { class: ['step-items'] }, injection.steps.map(getGenerateNavItem(props, model, injection, transition)))
  );
}

function BStaticStepContent(_: unknown, { slots }: SetupContext) {
  return h('div', { class: 'step-content' }, slots.default && slots.default());
}

export default defineComponent({
  name: 'b-steps',
  props: BStepsPropsDefinition,
  setup(props, context) {
    const { themeClasses } = useTheme(props);
    const model = useModel(props);
    const transition = shallowRef('slide-next' as 'slide-next' | 'slide-prev');
    const steps = shallowReactive([] as BStepItemProps[]);
    const isTransitioning = shallowRef(false);
    const activeLabel = computed(() =>
      pipe(
        steps,
        lookup(model.modelValue.value || 0),
        map(p => p.label)
      )
    );
    const injection: StepInjection = {
      activeLabel,
      steps
    };

    provide(STEPS_SYMBOL, injection);

    function onBeforeEnter() {
      isTransitioning.value = true;
    }

    function onAfterLeave() {
      isTransitioning.value = false;
    }

    return () => {
      return h(
        'article',
        {
          class: [
            'b-steps',
            props.size || null,
            {
              'is-vertical': props.isVertical,
              [props.position]: props.position && props.isVertical
            }
          ]
        },
        [
          generateNavHeader(props, model, injection, transition, themeClasses.value),
          props.isAnimated
            ? h(
                'div',
                {
                  class: ['step-content', { 'is-transitioning': isTransitioning.value }]
                },
                h(
                  TransitionGroup,
                  {
                    onBeforeEnter,
                    onAfterLeave,
                    name: transition.value
                  },
                  () =>
                    context.slots.default &&
                    context.slots
                      .default()
                      .map((node, index) => cloneVNode(node, { key: steps[index]?.label ?? index }))
                )
              )
            : h(BStaticStepContent, () => context.slots.default && context.slots.default())
        ]
      );
    };
  }
});
