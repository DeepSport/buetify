import "../../../src/components/steps/steps.sass";
import { lookup } from 'fp-ts/Array';
import { pipe } from 'fp-ts/function';
import { getUseModelPropsDefinition, useModel } from '../../composables/model';
import { DefaultThemePropsDefinition, useTheme } from '../../composables/theme';
import { map } from 'fp-ts/lib/Option';
import { computed, cloneVNode, TransitionGroup, defineComponent, nextTick, h, provide, shallowRef, withDirectives, vShow, shallowReactive } from 'vue';
import { STEPS_SYMBOL } from './shared';
export const BStepsPropsDefinition = { ...getUseModelPropsDefinition(),
  ...DefaultThemePropsDefinition,
  position: {
    type: String,
    default: ''
  },
  labelPosition: {
    type: String,
    default: ''
  },
  variant: {
    type: String,
    default: ''
  },
  size: {
    type: String,
    default: ''
  },
  isAnimated: {
    type: Boolean,
    default: true
  },
  mobileMode: {
    type: String,
    default: 'minimal'
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

function getOnStepItemClick(index, model, transition) {
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

function getGenerateNavItem(props, model, injection, transition) {
  return function generateNavItem(step, index) {
    const currentIndex = model.modelValue.value || 0;
    const isClickable = step.isClickable ?? index < currentIndex;
    return withDirectives(h('li', {
      key: step.label,
      class: [step.variant || props.variant, 'step-item', {
        'is-previous': index < currentIndex,
        'is-active': index === model.modelValue.value
      }]
    }, [h('a', {
      class: ['step-link', {
        'is-clickable': isClickable
      }],
      onClick: isClickable ? getOnStepItemClick(index, model, transition) : undefined
    }, [h('div', {
      class: 'step-marker'
    }, step.icon ? h(step.icon, {
      size: props.size
    }) : step.step ?? `${index + 1}`), h('div', {
      class: 'step-details'
    }, [h('span', {
      class: 'step-title'
    }, step.label)])])]), [[vShow, injection.steps[index]?.isVisible ?? true]]);
  };
}

function generateNavHeader(props, model, injection, transition, themeClasses) {
  return h('nav', {
    class: ['steps', props.size, props.variant || null, {
      'is-rounded': props.isRounded,
      'is-animated': props.isAnimated,
      'has-label-right': props.labelPosition === 'is-right',
      'has-label-left': props.labelPosition === 'is-left',
      'mobile-minimalist': props.mobileMode === 'minimal',
      'mobile-compact': props.mobileMode === 'compact'
    }, ...themeClasses]
  }, h('ul', {
    class: ['step-items']
  }, injection.steps.map(getGenerateNavItem(props, model, injection, transition))));
}

function BStaticStepContent(_, {
  slots
}) {
  return h('div', {
    class: 'step-content'
  }, slots.default && slots.default());
}

export default defineComponent({
  name: 'b-steps',
  props: BStepsPropsDefinition,

  setup(props, context) {
    const {
      themeClasses
    } = useTheme(props);
    const model = useModel(props);
    const transition = shallowRef('slide-next');
    const steps = shallowReactive([]);
    const isTransitioning = shallowRef(false);
    const activeLabel = computed(() => pipe(steps, lookup(model.modelValue.value || 0), map(p => p.label)));
    const injection = {
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
      return h('article', {
        class: ['b-steps', props.size || null, {
          'is-vertical': props.isVertical,
          [props.position]: props.position && props.isVertical
        }]
      }, [generateNavHeader(props, model, injection, transition, themeClasses.value), props.isAnimated ? h('div', {
        class: ['step-content', {
          'is-transitioning': isTransitioning.value
        }]
      }, h(TransitionGroup, {
        onBeforeEnter,
        onAfterLeave,
        name: transition.value
      }, () => context.slots.default && context.slots.default().map((node, index) => cloneVNode(node, {
        key: steps[index]?.label ?? index
      })))) : h(BStaticStepContent, context.slots.default)]);
    };
  }

});
//# sourceMappingURL=BSteps.js.map