import './steps.sass';
import { getUseModelPropsDefinition, useModel } from '../../composables/model';
import { DefaultThemePropsDefinition } from '../../composables/theme';
import BHorizontalDivider from '../layout/divider/BHorizontalDivider';
import { lookup } from 'fp-ts/lib/Array';
import { isSome, map } from 'fp-ts/lib/Option';
import { pipe } from 'fp-ts/lib/pipeable';
import { Transition, withDirectives, resolveDirective, defineComponent, nextTick, onBeforeMount, h, provide, computed, shallowRef } from 'vue';
import { STEPS_SYMBOL } from './shared';
export const BStepsPropsDefinition = {
    ...getUseModelPropsDefinition(),
    ...DefaultThemePropsDefinition,
    variant: {
        type: String,
        default: 'is-link'
    },
    size: {
        type: String,
        default: ''
    },
    isAnimated: {
        type: Boolean,
        default: true
    }
};
function getOnStepClick(index, model, transition) {
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
function generateNavItemStepDetails(step) {
    return h('div', { class: 'step-details' }, [h('span', { class: 'step-title' }, step.props.label)]);
}
function generateNavItemStepMarker(props, step) {
    return h('div', { class: 'step-marker' }, step.props.icon ? [h(step.props.icon, { size: props.size })] : []);
}
function generateNavItemContent(props, step, index, model, transition) {
    return h('a', {
        class: ['step-link', { 'is-clickable': step.props.isClickable }],
        onClick: step.props.isClickable ? getOnStepClick(index, model, transition) : undefined
    }, [generateNavItemStepMarker(props, step), generateNavItemStepDetails(step)]);
}
function getGenerateNavItem(props, model, transition, vShow) {
    return function generateNavItem(step, index) {
        return withDirectives(h('li', {
            key: step.props.label,
            class: [
                'step-item',
                step.props.variant || props.variant,
                {
                    'is-active': index === model.value.value,
                    'is-completed': step.props.isCompleted || model.value.value > index
                }
            ]
        }, [generateNavItemContent(props, step, index, model, transition)]), [[vShow, step.props.isVisible]]);
    };
}
function generateNavHeader(props, steps, model, transition, vShow) {
    return h('nav', { class: ['steps', props.variant, props.size] }, [
        h('ul', { class: 'step-items' }, steps.map(getGenerateNavItem(props, model, transition, vShow)))
    ]);
}
function generateStepContent(props, steps, model, transition) {
    return h('section', {
        class: 'step-content',
        'aria-label': 'Step Content'
    }, props.isAnimated
        ? [h(Transition, { name: transition.value }, steps[model.value.value || 0].render())]
        : steps[model.value.value || 0].render());
}
const HorizontalDivider = h(BHorizontalDivider);
export default defineComponent({
    name: 'b-steps',
    props: BStepsPropsDefinition,
    setup(props, context) {
        const vShow = resolveDirective('show');
        const model = useModel(props);
        const transition = shallowRef('slide-next');
        const currentStep = computed(() => lookup(model.value.value || 0, injection.steps.value));
        const injection = {
            steps: shallowRef([]),
            activeLabel: computed(() => pipe(currentStep.value, map(n => n.props.label)))
        };
        provide(STEPS_SYMBOL, injection);
        onBeforeMount(() => {
            if (model.value.value === undefined || (isSome(currentStep.value) && !currentStep.value.value.props.isVisible)) {
                model.set(Math.max(injection.steps.value.findIndex(step => step.props.isVisible), 0));
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
//# sourceMappingURL=BSteps.js.map