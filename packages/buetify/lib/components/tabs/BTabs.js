import "../../../src/sass/helpers/animations.sass";
import "../../../src/sass/helpers/flex-helpers.sass";
import "../../../src/sass/helpers/padding-margin-helpers.sass";
import "../../../src/components/tabs/tabs.sass";
import { lookup } from 'fp-ts/Array';
import { pipe } from 'fp-ts/function';
import { map } from 'fp-ts/Option';
import { getUseModelPropsDefinition, useModel } from '../../composables/model';
import { useThemePropsDefinition, useTheme } from '../../composables/theme';
import BScroll from '../scroll/BScroll';
import { shallowReactive, h, shallowRef, provide, nextTick, defineComponent, onBeforeMount, computed, TransitionGroup, cloneVNode, withDirectives, vShow } from 'vue';
import { TABS_SYMBOL } from './shared';
import { TabsThemeMap } from './theme';
export const BTabsPropsDefinition = { ...getUseModelPropsDefinition(),
  ...useThemePropsDefinition(TabsThemeMap),
  isExpanded: {
    type: Boolean,
    default: false
  },
  type: {
    type: String,
    default: ''
  },
  size: {
    type: String,
    default: ''
  },
  position: {
    type: String,
    default: ''
  },
  label: {
    type: String
  },
  variant: {
    type: String,
    default: ''
  },
  isAnimated: {
    type: Boolean,
    default: true
  },
  isScrollable: {
    type: Boolean,
    default: false
  },
  isVertical: {
    type: Boolean,
    default: false
  }
};

function useOnTabItemClick(tab, index, model, transition) {
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

function useGenerateNavItem(props, model, transition) {
  return function generateNavItem(tab, index) {
    return withDirectives(h('li', {
      key: tab.label,
      class: [{
        'is-active': index === model.modelValue.value,
        'is-disabled': tab.isDisabled
      }]
    }, [h('a', {
      onClick: useOnTabItemClick(tab, index, model, transition)
    }, tab.icon ? [h(tab.icon, {
      size: props.size
    }), tab.label] : tab.label)]), [[vShow, tab.isVisible]]);
  };
}

function generateNavLabel(props) {
  return h('label', {
    class: ['label is-marginless align-self-center', props.size]
  }, props.label);
}

function generateNavItems(props, tabs, model, transition) {
  return h('ul', tabs.map(useGenerateNavItem(props, model, transition)));
}

function generateNavHeaderContent(props, tabs, model, transition, themeClasses) {
  return h('nav', {
    class: ['tabs', props.type, props.size, props.position, {
      'is-fullwidth': !!props.isExpanded || !!props.isScrollable,
      'is-toggle-rounded is-toggle': props.type === 'is-toggle-rounded'
    }].concat(props.variant === '' ? themeClasses : [props.variant])
  }, props.label ? [generateNavLabel(props), generateNavItems(props, tabs, model, transition)] : [generateNavItems(props, tabs, model, transition)]);
}

function generateNavHeader(props, tabs, model, transition, themeClasses) {
  return props.isScrollable ? h(BScroll, {
    class: props.isVertical ? 'is-fullheight' : 'is-fullwidth'
  }, () => [generateNavHeaderContent(props, tabs, model, transition, themeClasses)]) : generateNavHeaderContent(props, tabs, model, transition, themeClasses);
}

function BStaticTabContent(_, {
  slots
}) {
  return h('div', {
    class: 'tab-content'
  }, slots.default && slots.default());
}

export default defineComponent({
  name: 'b-tabs',
  props: BTabsPropsDefinition,

  setup(props, context) {
    const {
      themeClasses
    } = useTheme(props);
    const model = useModel(props);
    const transition = shallowRef('slide-next');
    const tabs = shallowReactive([]);
    const isTransitioning = shallowRef(false);
    const activeLabel = computed(() => pipe(tabs, lookup(model.modelValue.value || 0), map(p => p.label)));
    const injection = {
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
      return h('article', {
        class: ['b-tabs', props.size || null, {
          'is-vertical': props.isVertical,
          [props.position]: props.position && props.isVertical
        }]
      }, [generateNavHeader(props, tabs, model, transition, themeClasses.value), props.isAnimated ? h('div', {
        class: ['tab-content', {
          'is-transitioning': isTransitioning.value
        }]
      }, h(TransitionGroup, {
        onBeforeEnter,
        onAfterLeave,
        name: transition.value
      }, () => context.slots.default && context.slots.default().map((node, index) => cloneVNode(node, {
        key: tabs[index]?.label ?? index
      })))) : h(BStaticTabContent, context.slots.default)]);
    };
  }

});
//# sourceMappingURL=BTabs.js.map