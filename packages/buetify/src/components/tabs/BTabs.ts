import '../../sass/helpers/animations.sass';
import '../../sass/helpers/flex-helpers.sass';
import '../../sass/helpers/padding-margin-helpers.sass';
import './tabs.sass';
import { lookup } from 'fp-ts/lib/Array';
import { pipe } from 'fp-ts/lib/function';
import { map } from 'fp-ts/lib/Option';
import { getUseModelPropsDefinition, Model, useModel } from '../../composables/model';
import { useThemePropsDefinition, useTheme } from '../../composables/theme';
import { AllColorsVariant } from '../../types/ColorVariants';
import BScroll from '../scroll/BScroll';
import {
  shallowReactive,
  PropType,
  h,
  shallowRef,
  provide,
  ExtractPropTypes,
  Ref,
  nextTick,
  defineComponent,
  VNode,
  onBeforeMount,
  computed,
  TransitionGroup,
  cloneVNode,
  withDirectives,
  vShow,
  ComponentOptions, FunctionalComponent
} from 'vue';

import { BTabItemProps, TabInjection, TABS_SYMBOL } from './shared';

import { TabsThemeMap } from './theme';

export type TabsPosition = 'is-centered' | 'is-right' | '';

export type TabsType = 'is-boxed' | 'is-toggle' | 'is-toggle-rounded' | '';

export type TabsSize = 'is-small' | 'is-medium' | 'is-large' | '';

type TabTransition = 'slide-next' | 'slide-prev';

export const BTabsPropsDefinition = {
  ...getUseModelPropsDefinition<number>(),
  ...useThemePropsDefinition(TabsThemeMap),
  isExpanded: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  type: {
    type: String as PropType<TabsType>,
    default: '' as const
  },
  size: {
    type: String as PropType<TabsSize>,
    default: '' as const
  },
  position: {
    type: String as PropType<TabsPosition>,
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
  },
  isVertical: {
    type: Boolean as PropType<boolean>,
    default: false
  }
};

export type BTabsProps = ExtractPropTypes<typeof BTabsPropsDefinition>;

function useOnTabItemClick(tab: BTabItemProps, index: number, model: Model<number>, transition: Ref<TabTransition>) {
  return () => {
    const val = model.modelValue.value || 0;
    if (val !== index) {
      transition.value = index < val ? 'slide-next' : 'slide-prev';
      nextTick(() => {
        model.modelValue.value = index;
      });
    }
  };
}

function useGenerateNavItem(props: BTabsProps, model: Model<number>, transition: Ref<TabTransition>) {
  return function generateNavItem(tab: BTabItemProps, index: number): VNode {
    return withDirectives(
      h(
        'li',
        {
          key: tab.label,
          class: [
            {
              'is-active': index === model.modelValue.value,
              'is-disabled': tab.isDisabled
            }
          ]
        },
        [
          h(
            'a',
            { onClick: useOnTabItemClick(tab, index, model, transition) },
            tab.icon
              ? [
                  h(tab.icon as ComponentOptions, {
                    size: props.size
                  }),
                  tab.label
                ]
              : tab.label
          )
        ]
      ),
      [[vShow, tab.isVisible]]
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
  tabs: BTabItemProps[],
  model: Model<number>,
  transition: Ref<TabTransition>
) {
  return h('ul', tabs.map(useGenerateNavItem(props, model, transition)));
}

function generateNavHeaderContent(
  props: BTabsProps,
  tabs: BTabItemProps[],
  model: Model<number>,
  transition: Ref<TabTransition>,
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
        }
      ].concat(props.variant === '' ? themeClasses : [props.variant])
    },
    props.label
      ? [generateNavLabel(props), generateNavItems(props, tabs, model, transition)]
      : [generateNavItems(props, tabs, model, transition)]
  );
}

function generateNavHeader(
  props: BTabsProps,
  tabs: BTabItemProps[],
  model: Model<number>,
  transition: Ref<TabTransition>,
  themeClasses: string[]
): VNode {
  return props.isScrollable
    ? h(BScroll, { class: props.isVertical ? 'is-fullheight' : 'is-fullwidth' }, () => [
        generateNavHeaderContent(props, tabs, model, transition, themeClasses)
      ])
    : generateNavHeaderContent(props, tabs, model, transition, themeClasses);
}

const BStaticTabContent: FunctionalComponent = (_, { slots }) => {
  return h('div', { class: 'tab-content' }, slots.default && slots.default());
}

export default defineComponent({
  name: 'b-tabs',
  props: BTabsPropsDefinition,
  setup(props, context) {
    const { themeClasses } = useTheme(props);
    const model = useModel(props);
    const transition = shallowRef('slide-next' as 'slide-next' | 'slide-prev');
    const tabs = shallowReactive([] as BTabItemProps[]);
    const isTransitioning = shallowRef(false);
    const activeLabel = computed(() =>
      pipe(
        tabs,
        lookup(model.modelValue.value || 0),
        map(p => p.label)
      )
    );

    const injection: TabInjection = {
      activeLabel,
      tabs
    };

    provide(TABS_SYMBOL, injection);

    onBeforeMount(() => {
      if (model.modelValue.value === undefined) {
        model.modelValue.value = 0;
      }
    });

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
            'b-tabs',
            props.size || null,
            {
              'is-vertical': props.isVertical,
              [props.position]: props.position && props.isVertical
            }
          ]
        },
        [
          generateNavHeader(props, tabs, model, transition, themeClasses.value),
          props.isAnimated
            ? h(
                'div',
                {
                  class: ['tab-content', { 'is-transitioning': isTransitioning.value }]
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
                    context.slots.default().map((node, index) => cloneVNode(node, { key: tabs[index]?.label ?? index }))
                )
              )
            : h(BStaticTabContent, context.slots.default)
        ]
      );
    };
  }
});
