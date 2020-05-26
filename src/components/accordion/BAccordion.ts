import './accordion.sass';
import { defineComponent, h, Slots, Ref } from 'vue';
import { DefaultThemePropsDefinition, useTheme } from '../../composables/theme';
import { getUseTogglePropsDefinition, Toggle, useToggle } from '../../composables/toggle';
import { FadeTransitionPropsDefinition, useTransition } from '../../composables/transition';
import { TransitionClasses } from '../../types/Transition';
import { getThemeableFunctionalComponent } from '../../utils/getThemeableFunctionalComponent';
import { mergeClasses } from '../../utils/mergeClasses';

function generateHeader(toggle: Toggle, slots: Slots) {
  return h('header', {
    onClick: toggle.toggle
  }, [generateTitle(slots), generateTriggerButton(toggle, slots)]);
}

function generateTitle(slots: Slots) {
  return h(
    'h1',
    {
      class: 'card-header-title'
    },
    slots.title!()
  );
}

function generateTriggerButton(toggle: Toggle, slots: Slots) {
  return h(
    'button',
    {
      class: 'card-header-icon',
      ...toggle.listeners,
      ...toggle.attrs.value,
      onClick: (e: MouseEvent) => {
        e.stopPropagation();
        toggle.toggle();
      }
    },
    slots.trigger!({
      isExpanded: toggle.isOn.value
    })
  );
}

export const ACCORDION_CONTENT_THEME_MAP = {
  dark: 'is-black-ter', //'is-grey-dark',
  light: ''
};

const BAccordionContent = getThemeableFunctionalComponent({
  cls: 'card-content',
  el: 'section',
  themeMap: ACCORDION_CONTENT_THEME_MAP
})

function generateBody(toggle: Toggle, transition: Ref<TransitionClasses>, slots: Slots) {
  return h('transition', transition.value, [
    h(BAccordionContent, {
      directives: [{ name: 'show', value: toggle.isOn.value }],
      'aria-hidden': !toggle.isOn.value
    }, slots.default!())
  ])
}

export default defineComponent({
  name: 'b-accordion',
  props: {
    ...getUseTogglePropsDefinition('isExpanded'),
    ...FadeTransitionPropsDefinition,
    ...DefaultThemePropsDefinition
  },
  setup(props, { slots }) {
    const toggle = useToggle(props, 'isExpanded');
    const theme = useTheme(props);
    const transition = useTransition(props);
    return () => h('article', { class: mergeClasses('b-card card', theme.themeClasses.value) }, [
      generateHeader(toggle, slots),
      generateBody(toggle, transition, slots)
    ])
  }
});
