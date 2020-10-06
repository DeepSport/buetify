import './steps.sass';
import { getUseModelPropsDefinition, Model, useModel } from '../../composables/model';
import { DefaultThemePropsDefinition, useTheme } from '../../composables/theme';
import { isFragment, isObject } from '../../utils/helpers';
import { ColorVariant } from '../../types/ColorVariants';
import { none, Option, some } from 'fp-ts/lib/Option';
import {
  Transition,
  Ref,
  defineComponent,
  nextTick,
  VNode,
  PropType,
  h,
  ExtractPropTypes,
  provide,
  shallowRef,
  ComponentInternalInstance,
  Slots,
  withDirectives,
  vShow
} from 'vue';
import { BStepItemProps, STEP_ITEM_NAME, StepInjection, STEPS_SYMBOL } from './shared';

export type StepsSize = 'is-small' | 'is-medium' | 'is-large' | '';

type StepTransition = 'slide-next' | 'slide-prev';

export type StepPosition = 'is-right' | '';

export type StepLabelPosition = 'is-right' | 'is-left' | '';

export type StepMobileMode = 'minimal' | 'compact' | '';

export const BStepsPropsDefinition = {
  ...getUseModelPropsDefinition<number>(),
  ...DefaultThemePropsDefinition,
  position: {
    type: String as PropType<StepPosition>,
    default: '' as const
  },
  labelPosition: {
    type: String as PropType<StepLabelPosition>,
    default: ''
  },
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
  },
  mobileMode: {
    type: String as PropType<StepMobileMode>,
    default: '' as const
  },
  isRounded: {
    type: Boolean,
    default: false
  },
  isVertical: {
    type: Boolean,
    default: false
  }
};

export type BStepsProps = ExtractPropTypes<typeof BStepsPropsDefinition>;

function getOnStepItemClick(
  step: BStepItemNode,
  index: number,
  model: Model<number>,
  activeLabel: Ref<Option<string>>,
  transition: Ref<StepTransition>
) {
  return () => {
    const val = model.modelValue.value || 0;
    if (val !== index) {
      transition.value = index < val ? 'slide-next' : 'slide-prev';
      nextTick(() => {
        const label = step.component?.props.label ?? (step.props?.label as string);
        model.modelValue.value = index;
        activeLabel.value = some(label);
      });
    }
  };
}

function getGenerateNavItem(
  props: BStepsProps,
  model: Model<number>,
  activeLabel: Ref<Option<string>>,
  transition: Ref<StepTransition>
) {
  return function generateNavItem(step: BStepItemNode, index: number): VNode {
    const label = step.component?.props.label;
    const icon = step.component?.props.icon;
    const isClickable = !!step.component?.props.isClickable;
    console.log(isClickable);
    return withDirectives(
      h(
        'li',
        {
          key: label ?? index,
          class: [
            'step-item',
            {
              'is-active': index === model.modelValue.value
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
              onClick: isClickable ? getOnStepItemClick(step, index, model, activeLabel, transition) : undefined
            },
            [
              h('div', { class: 'step-marker' }, icon ? h(icon as any, { size: props.size }) : `${index + 1}`), //eslint-disable-line
              h('div', { class: 'step-details' }, [h('span', { class: 'step-title' }, label)])
            ]
          )
        ]
      ),
      [[vShow, step.component?.props.isVisible ?? true]]
    );
  };
}

function generateNavItems(
  props: BStepsProps,
  steps: BStepItemNode[],
  model: Model<number>,
  activeLabel: Ref<Option<string>>,
  transition: Ref<StepTransition>
) {
  return h('ul', { class: ['step-items'] }, steps.map(getGenerateNavItem(props, model, activeLabel, transition)));
}

function generateNavHeaderContent(
  props: BStepsProps,
  steps: BStepItemNode[],
  model: Model<number>,
  activeLabel: Ref<Option<string>>,
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
    generateNavItems(props, steps, model, activeLabel, transition)
  );
}

function generateNavHeader(
  props: BStepsProps,
  steps: BStepItemNode[],
  model: Model<number>,
  activeLabel: Ref<Option<string>>,
  transition: Ref<StepTransition>,
  themeClasses: string[]
): VNode {
  return generateNavHeaderContent(props, steps, model, activeLabel, transition, themeClasses);
}

function generateStepContent(
  props: BStepsProps,
  steps: BStepItemNode[],
  model: Model<number>,
  transition: Ref<StepTransition>
): VNode {
  return props.isAnimated
    ? h(Transition, { name: transition.value }, () => steps[model.modelValue.value || 0])
    : steps[model.modelValue.value || 0];
}

interface BStepItemNode extends VNode {
  type: {
    name: typeof STEP_ITEM_NAME;
  };
  component: null | (ComponentInternalInstance & { props: BStepItemProps });
}

function isStepItemNode(node: unknown): node is BStepItemNode {
  return isObject(node) && isObject((node as any).type) && (node as any).type.name === STEP_ITEM_NAME;
}

function getSteps(slots: Slots): any[] {
  return ((slots.default && slots.default()) || [])
    .flatMap(node => (isFragment(node) ? node.children : [node]))
    .filter(isStepItemNode);
}

export default defineComponent({
  name: 'b-steps',
  props: BStepsPropsDefinition,
  setup(props, context) {
    const { themeClasses } = useTheme(props);
    const model = useModel(props);
    const transition = shallowRef('slide-next' as 'slide-next' | 'slide-prev');
    const injection: StepInjection = {
      activeLabel: shallowRef(none)
    };

    provide(STEPS_SYMBOL, injection);

    return () => {
      const steps = getSteps(context.slots);
      return h(
        'article',
        {
          class: [
            'b-steps',
            {
              'is-vertical': props.isVertical,
              [props.position]: props.position && props.isVertical
            }
          ]
        },
        [
          generateNavHeader(props, steps, model, injection.activeLabel, transition, themeClasses.value),
          generateStepContent(props, steps, model, transition)
        ]
      );
    };
  }
});
