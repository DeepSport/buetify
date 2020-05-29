import './tabs.sass';
import { lookup } from 'fp-ts/lib/Array';
import { pipe } from 'fp-ts/lib/pipeable';
import { getUseModelPropsDefinition, useModel } from '../../composables/model';
import { getUseThemePropsDefinition, useTheme } from '../../composables/theme';
import BHorizontalDivider from '../layout/divider/BHorizontalDivider';
import BScroll from '../scroll/BScroll';
import { h, shallowRef, provide, nextTick, withDirectives, Transition, defineComponent, resolveDirective, computed, onBeforeMount } from 'vue';
import { isSome, map } from 'fp-ts/lib/Option';
import { TABS_SYMBOL } from './shared';
import { TabsThemeMap } from './theme';
export const BTabsPropsDefinition = {
    ...getUseModelPropsDefinition(),
    ...getUseThemePropsDefinition(TabsThemeMap),
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
    }
};
function getOnTabItemClick(index, model, transition) {
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
function getGenerateNavItem(props, model, transition, vShow) {
    return function generateNavItem(step, index) {
        return withDirectives(h('li', {
            key: step.props.label,
            class: [
                {
                    'is-active': index === model.value.value,
                    'is-disabled': step.props.isDisabled
                }
            ]
        }, [
            h('a', { onClick: getOnTabItemClick(index, model, transition) }, step.props.icon
                ? [
                    h(step.props.icon, {
                        size: props.size
                    }),
                    step.props.label
                ]
                : step.props.label)
        ]), [[vShow, step.props.isVisible]]);
    };
}
function generateNavLabel(props) {
    return h('label', {
        class: ['label is-marginless align-self-center', props.size]
    }, props.label);
}
function generateNavItems(props, tabs, model, transition, vShow) {
    return h('ul', tabs.map(getGenerateNavItem(props, model, transition, vShow)));
}
function generateNavHeaderContent(props, tabs, model, transition, vShow, themeClasses) {
    return h('nav', {
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
    }, props.label
        ? [generateNavLabel(props), generateNavItems(props, tabs, model, transition, vShow)]
        : [generateNavItems(props, tabs, model, transition, vShow)]);
}
function generateNavHeader(props, tabs, model, transition, vShow, themeClasses) {
    return props.isScrollable
        ? h(BScroll, { class: 'is-fullwidth' }, [
            generateNavHeaderContent(props, tabs, model, transition, vShow, themeClasses)
        ])
        : generateNavHeaderContent(props, tabs, model, transition, vShow, themeClasses);
}
function generateTabContent(props, tabs, model, transition) {
    return h('section', {
        class: 'step-content',
        'aria-label': 'Step Content'
    }, props.isAnimated
        ? [h(Transition, { name: transition.value }, tabs[model.value.value || 0].render())]
        : tabs[model.value.value || 0].render());
}
const HorizontalDivider = h(BHorizontalDivider);
export default defineComponent({
    name: 'b-tabs',
    props: BTabsPropsDefinition,
    setup(props, context) {
        const { themeClasses } = useTheme(props);
        const vShow = resolveDirective('show');
        const model = useModel(props);
        const transition = shallowRef('slide-next');
        const currentStep = computed(() => lookup(model.value.value || 0, injection.tabs.value));
        const injection = {
            tabs: shallowRef([]),
            activeLabel: computed(() => pipe(currentStep.value, map(n => n.props.label)))
        };
        provide(TABS_SYMBOL, injection);
        onBeforeMount(() => {
            if (model.value.value === undefined || (isSome(currentStep.value) && !currentStep.value.value.props.isVisible)) {
                model.set(Math.max(injection.tabs.value.findIndex(step => step.props.isVisible), 0));
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
//# sourceMappingURL=BTabs.js.map