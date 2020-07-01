import './tabs.sass';
import { lookup } from 'fp-ts/lib/Array';
import { pipe } from 'fp-ts/lib/pipeable';
import { getUseModelPropsDefinition, Model, useModel } from '../../composables/model';
import { getUseThemePropsDefinition, useTheme } from '../../composables/theme';
import { AllColorsVariant } from '../../types/ColorVariants';
import BHorizontalDivider from '../layout/divider/BHorizontalDivider';
import BScroll from '../scroll/BScroll';
import {
  VNode,
  PropType,
  h,
  shallowRef,
  provide,
  ExtractPropTypes,
  Ref,
  nextTick,
  Directive,
  withDirectives,
  Transition,
  defineComponent,
  resolveDirective,
  computed,
  onBeforeMount
} from 'vue';
import { isSome, map } from 'fp-ts/lib/Option';
import { BTabItemData, TabInjection, TABS_SYMBOL } from './shared';
import { TabsThemeMap } from './theme';

export type TabPosition = 'is-centered' | 'is-right' | '';

export type TabType = 'is-boxed' | 'is-toggle' | 'is-toggle-rounded' | '';

export type TabSize = 'is-small' | 'is-medium' | 'is-large' | '';

type TabTransition = 'slide-next' | 'slide-prev';

export const BTabsPropsDefinition = {
  ...getUseModelPropsDefinition<number>(),
  ...getUseThemePropsDefinition(TabsThemeMap),
  isExpanded: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  type: {
    type: String as PropType<TabType>,
    default: '' as const
  },
  size: {
    type: String as PropType<TabSize>,
    default: '' as const
  },
  position: {
    type: String as PropType<TabPosition>,
    default: '' as const
  },
  label: {
    type: String as PropType<string>
  },
  variant: {
    type: String as PropType<AllColorsVariant>,
    default: '' as const
  },
  isAnimated: {
    type: Boolean as PropType<boolean>,
    default: true
  },
  isScrollable: {
    type: Boolean as PropType<boolean>,
    default: false
  }
};

export type BTabsProps = ExtractPropTypes<typeof BTabsPropsDefinition>;

function getOnTabItemClick(index: number, model: Model<number>, transition: Ref<TabTransition>) {
  return () => {
    const val = model.modelValue.value || 0;
    if (val !== index) {
      transition.value = index < val ? 'slide-next' : 'slide-prev';
      nextTick(() => {
        model.set(index);
      });
    }
  };
}

function getGenerateNavItem(props: BTabsProps, model: Model<number>, transition: Ref<TabTransition>, vShow: Directive) {
  return function generateNavItem(step: BTabItemData, index: number): VNode {
    return withDirectives(
      h(
        'li',
        {
          key: step.props.label,
          class: [
            {
              'is-active': index === model.modelValue.value,
              'is-disabled': step.props.isDisabled
            }
          ]
        },
        [
          h(
            'a',
            { onClick: getOnTabItemClick(index, model, transition) },
            step.props.icon
              ? [
                  h(step.props.icon, {
                    size: props.size
                  }),
                  step.props.label
                ]
              : step.props.label
          )
        ]
      ),
      [[vShow, step.props.isVisible]]
    );
  };
}

function generateNavLabel(props: BTabsProps): VNode {
  return h(
    'label',
    {
      class: ['label is-marginless align-self-center', props.size]
    },
    props.label
  );
}

function generateNavItems(
  props: BTabsProps,
  tabs: BTabItemData[],
  model: Model<number>,
  transition: Ref<TabTransition>,
  vShow: Directive
) {
  return h('ul', tabs.map(getGenerateNavItem(props, model, transition, vShow)));
}

function generateNavHeaderContent(
  props: BTabsProps,
  tabs: BTabItemData[],
  model: Model<number>,
  transition: Ref<TabTransition>,
  vShow: Directive,
  themeClasses: string[]
): VNode {
  return h(
    'nav',
    {
      class: [
        'tabs',
        props.type,
        props.size,
        props.position,
        {
          'is-fullwidth': !!props.isExpanded || !!props.isScrollable,
          'is-toggle-rounded is-toggle': props.type === 'is-toggle-rounded'
        },
        ...(props.variant === '' ? themeClasses : [props.variant])
      ]
    },
    props.label
      ? [generateNavLabel(props), generateNavItems(props, tabs, model, transition, vShow)]
      : [generateNavItems(props, tabs, model, transition, vShow)]
  );
}

function generateNavHeader(
  props: BTabsProps,
  tabs: BTabItemData[],
  model: Model<number>,
  transition: Ref<TabTransition>,
  vShow: Directive,
  themeClasses: string[]
): VNode {
  return props.isScrollable
    ? h(BScroll, { class: 'is-fullwidth' }, [
        generateNavHeaderContent(props, tabs, model, transition, vShow, themeClasses)
      ])
    : generateNavHeaderContent(props, tabs, model, transition, vShow, themeClasses);
}

function generateTabContent(
  props: BTabsProps,
  tabs: BTabItemData[],
  model: Model<number>,
  transition: Ref<TabTransition>
): VNode {
  return h(
    'section',
    {
      class: 'step-content',
      'aria-label': 'Step Content'
    },
    props.isAnimated
      ? [h(Transition, { name: transition.value }, tabs[model.modelValue.value || 0].render())]
      : tabs[model.modelValue.value || 0].render()
  );
}

const HorizontalDivider = h(BHorizontalDivider);

export default defineComponent({
  name: 'b-tabs',
  props: BTabsPropsDefinition,
  setup(props, context) {
    const { themeClasses } = useTheme(props);
    const vShow = resolveDirective('show') as Directive;
    const model = useModel(props);
    const transition = shallowRef('slide-next' as 'slide-next' | 'slide-prev');
    const currentStep = computed(() => lookup(model.modelValue.value || 0, injection.tabs.value));
    const injection: TabInjection = {
      tabs: shallowRef([] as BTabItemData[]),
      activeLabel: computed(() =>
        pipe(
          currentStep.value,
          map(n => n.props.label)
        )
      )
    };

    provide(TABS_SYMBOL, injection);

    onBeforeMount(() => {
      if (
        model.modelValue.value === undefined ||
        (isSome(currentStep.value) && !currentStep.value.value.props.isVisible)
      ) {
        model.set(
          Math.max(
            injection.tabs.value.findIndex(step => step.props.isVisible),
            0
          )
        );
      }
    });

    return () => {
      const tabs = injection.tabs.value;
      return h('article', { class: 'b-steps' }, [
        generateNavHeader(props, tabs, model, transition, vShow, themeClasses.value),
        HorizontalDivider,
        generateTabContent(props, tabs, model, transition)
      ]);
    };
  }
});
