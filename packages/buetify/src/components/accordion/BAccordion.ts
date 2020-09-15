import './accordion.sass';
import { defineComponent, h, Slots, Ref, vShow, withDirectives } from 'vue';
import { DefaultThemePropsDefinition, useTheme } from '../../composables/theme';
import { getUseTogglePropsDefinition, Toggle, useToggle } from '../../composables/toggle';
import { FadeTransitionPropsDefinition, useTransition } from '../../composables/transition';
import { TransitionClasses } from '../../types/Transition';
import { getThemeableFunctionalComponent } from '../../utils/getThemeableFunctionalComponent';
import VerticalExpansionIcon from '../icons/verticalExpansion/VerticalExpansionIcon';

function generateTitle(slots: Slots) {
  return h(
    'h1',
    {
      class: 'card-header-title'
    },
    slots.title && slots.title!()
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

    slots.trigger
      ? slots.trigger({
          isExpanded: toggle.isOn.value
        })
      : h(VerticalExpansionIcon, { isExpanded: toggle.isOn.value })
  );
}

function generateHeader(toggle: Toggle, slots: Slots) {
  return h(
    'header',
    {
      class: 'card-header',
      onClick: toggle.toggle
    },
    [generateTitle(slots), generateTriggerButton(toggle, slots)]
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
});

function generateBody(toggle: Toggle, transition: Ref<TransitionClasses>, slots: Slots) {
  return h(Transition, transition.value, () =>
    withDirectives(
      h(
        BAccordionContent,
        {
          'aria-hidden': !toggle.isOn.value
        },
        slots.default
      ),
      [[vShow, toggle.isOn.value]]
    )
  );
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
    return () =>
      h('article', { class: ['b-card card', ...theme.themeClasses.value] }, [
        generateHeader(toggle, slots),
        generateBody(toggle, transition, slots)
      ]);
  }
});
