import './tabs.sass';
import { getUseModelPropsDefinition, Model, useModel } from '../../composables/model';
import { useThemePropsDefinition, useTheme } from '../../composables/theme';
import { AllColorsVariant } from '../../types/ColorVariants';
import { isFragment, isObject } from '../../utils/helpers';
import BScroll from '../scroll/BScroll';
import {
  PropType,
  h,
  shallowRef,
  provide,
  ExtractPropTypes,
  Ref,
  nextTick,
  Transition,
  defineComponent,
  VNode,
  Slots,
  onBeforeMount
} from 'vue';
import { none, Option, some } from 'fp-ts/lib/Option';
import { BTabItemData, BTabItemProps, TAB_ITEM_NAME, TabInjection, TABS_SYMBOL } from './shared';
import { TabsThemeMap } from './theme';

export type TabPosition = 'is-centered' | 'is-right' | '';

export type TabType = 'is-boxed' | 'is-toggle' | 'is-toggle-rounded' | '';

export type TabSize = 'is-small' | 'is-medium' | 'is-large' | '';

type TabTransition = 'slide-next' | 'slide-prev';

export const BTabsPropsDefinition = {
  ...getUseModelPropsDefinition<number>(),
  ...useThemePropsDefinition(TabsThemeMap),
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

function useOnTabItemClick(
  tab: BTabItemData,
  index: number,
  model: Model<number>,
  activeLabel: Ref<Option<string>>,
  transition: Ref<TabTransition>
) {
  return () => {
    const val = model.modelValue.value || 0;
    if (val !== index) {
      transition.value = index < val ? 'slide-next' : 'slide-prev';
      nextTick(() => {
        model.modelValue.value = index;
        activeLabel.value = some(tab.props.label);
      });
    }
  };
}

function useGenerateNavItem(
  props: BTabsProps,
  model: Model<number>,
  activeLabel: Ref<Option<string>>,
  transition: Ref<TabTransition>
) {
  return function generateNavItem(step: BTabItemData, index: number): VNode {
    return h(
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
          { onClick: useOnTabItemClick(step, index, model, activeLabel, transition) },
          step.props.icon
            ? [
                h(step.props.icon as any, {
                  size: props.size
                }),
                step.props.label
              ]
            : step.props.label
        )
      ]
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
  activeLabel: Ref<Option<string>>,
  transition: Ref<TabTransition>
) {
  return h('ul', tabs.map(useGenerateNavItem(props, model, activeLabel, transition)));
}

function generateNavHeaderContent(
  props: BTabsProps,
  tabs: BTabItemData[],
  model: Model<number>,
  activeLabel: Ref<Option<string>>,
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
      ? [generateNavLabel(props), generateNavItems(props, tabs, model, activeLabel, transition)]
      : [generateNavItems(props, tabs, model, activeLabel, transition)]
  );
}

function generateNavHeader(
  props: BTabsProps,
  tabs: BTabItemNode[],
  model: Model<number>,
  activeLabel: Ref<Option<string>>,
  transition: Ref<TabTransition>,
  themeClasses: string[]
): VNode {
  return props.isScrollable
    ? h(BScroll, { class: 'is-fullwidth' }, () => [
        generateNavHeaderContent(props, tabs, model, activeLabel, transition, themeClasses)
      ])
    : generateNavHeaderContent(props, tabs, model, activeLabel, transition, themeClasses);
}

function generateTabContent(
  props: BTabsProps,
  tabs: BTabItemNode[],
  model: Model<number>,
  transition: Ref<TabTransition>
): VNode {
  return props.isAnimated
    ? h(Transition, { name: transition.value }, () => tabs[model.modelValue.value || 0])
    : tabs[model.modelValue.value || 0];
}

interface BTabItemNode extends VNode {
  type: {
    name: typeof TAB_ITEM_NAME;
  };
  props: BTabItemProps;
}

function isBTabItemNode(node: unknown): node is BTabItemNode {
  return (
    isObject(node) &&
    isObject((node as any).type) &&
    (node as any).type.name === TAB_ITEM_NAME &&
    ((node as any).props['is-visible'] === undefined ||
      (node as any).props['is-visible'] ||
      (node as any).props.isVisible === undefined ||
      (node as any).props.isVisible)
  );
}

function getTabs(slots: Slots): any[] {
  return (
      ((slots.default && slots.default()) ||
    []).flatMap(node => (isFragment(node) ? node.children : [node])).filter(isBTabItemNode)
  );
}

export default defineComponent({
  name: 'b-tabs',
  props: BTabsPropsDefinition,
  setup(props, context) {
    const { themeClasses } = useTheme(props);
    const model = useModel(props);
    const transition = shallowRef('slide-next' as 'slide-next' | 'slide-prev');
    const injection: TabInjection = {
      activeLabel: shallowRef(none)
    };

    provide(TABS_SYMBOL, injection);

    onBeforeMount(() => {
      if (model.modelValue.value === undefined) {
        model.modelValue.value = 0
      }
    });

    return () => {
      const tabs = getTabs(context.slots);
      return h('article', { class: 'b-tabs' }, [
        generateNavHeader(props, tabs, model, injection.activeLabel, transition, themeClasses.value),
        generateTabContent(props, tabs, model, transition)
      ]);
    };
  }
});
