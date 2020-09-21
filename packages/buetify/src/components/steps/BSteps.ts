import './steps.sass';
import { getUseModelPropsDefinition, Model, useModel } from '../../composables/model';
import { DefaultThemePropsDefinition, useTheme } from '../../composables/theme';
import { constEmptyArray, isObject } from '../../utils/helpers';
import { ColorVariant } from '../../types/ColorVariants';
import { head } from 'fp-ts/lib/Array';
import { chain, getOrElse, none, Option, some } from 'fp-ts/lib/Option';
import { pipe } from 'fp-ts/lib/pipeable';
import {
  Transition,
  Ref,
  defineComponent,
  nextTick,
  VNode,
  PropType,
  onBeforeMount,
  h,
  ExtractPropTypes,
  provide,
  shallowRef,
  Slots,
  isVNode
} from 'vue';
import { BStepItemProps, STEP_ITEM_NAME, StepInjection, STEPS_SYMBOL } from './shared';

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
        model.set(index);
        activeLabel.value = some(step.props.label);
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
    return h(
      'li',
      {
        key: step.props.label,
        class: [
          {
            'is-active': index === model.modelValue.value
          }
        ]
      },
      [
        h(
          'a',
          { onClick: getOnStepItemClick(step, index, model, activeLabel, transition) },
          step.props.icon ? [h(step.props.icon), step.props.label] : step.props.label
        )
      ]
    );
  };
}

function generateNavItems(
  props: BStepsProps,
  tabs: BStepItemNode[],
  model: Model<number>,
  activeLabel: Ref<Option<string>>,
  transition: Ref<StepTransition>
) {
  return h('ul', tabs.map(getGenerateNavItem(props, model, activeLabel, transition)));
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
      class: ['tabs', props.size, ...(props.variant === '' ? themeClasses : [props.variant])]
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
  props: BStepItemProps;
}

function isStepItemNode(node: unknown): node is BStepItemNode {
  return (
    isObject(node) &&
    isObject((node as any).type) &&
    (node as any).type.name === STEP_ITEM_NAME &&
    ((node as any).props['is-visible'] === undefined ||
      (node as any).props['is-visible'] ||
      (node as any).props.isVisible === undefined ||
      (node as any).props.isVisible)
  );
}

function getSteps(slots: Slots): any[] {
  return pipe(
    slots.default ? slots.default() : [],
    head,
    chain(fragment =>
      fragment.children && Array.isArray(fragment.children) ? some(fragment.children.filter(isVNode)) : none
    ),
    getOrElse<VNode[]>(constEmptyArray)
  ).filter(isStepItemNode) as any;
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

    onBeforeMount(() => {
      if (model.modelValue.value === undefined) {
        model.set(0);
      }
    });

    return () => {
      const steps = getSteps(context.slots);
      return h('article', { class: 'b-steps' }, [
        generateNavHeader(props, steps, model, injection.activeLabel, transition, themeClasses.value),
        generateStepContent(props, steps, model, transition)
      ]);
    };
  }
});
