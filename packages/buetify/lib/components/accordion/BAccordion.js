import 'bulma/sass/components/card.sass';
import "../../../src/sass/helpers/animations.sass";
import "../../../src/components/accordion/accordion.sass";
import { defineComponent, h, vShow, withDirectives, Transition } from 'vue';
import { DefaultThemePropsDefinition, useTheme } from '../../composables/theme';
import { getUseTogglePropsDefinition, useToggle } from '../../composables/toggle';
import { FadeTransitionPropsDefinition, useTransition } from '../../composables/transition';
import { getThemeableFunctionalComponent } from '../../utils/getThemeableFunctionalComponent';
import VerticalExpansionIcon from '../icons/verticalExpansion/VerticalExpansionIcon';

function generateTitle(slots) {
  return h('h1', {
    class: 'card-header-title'
  }, slots.title && slots.title());
}

function generateTriggerButton(toggle, slots) {
  return h('button', {
    class: 'card-header-icon',
    ...toggle.listeners,
    ...toggle.attrs.value,
    onClick: e => {
      e.stopPropagation();
      toggle.toggle();
    }
  }, slots.trigger ? slots.trigger({
    isExpanded: toggle.isOn.value
  }) : h(VerticalExpansionIcon, {
    isExpanded: toggle.isOn.value
  }));
}

function generateHeader(toggle, slots) {
  return h('header', {
    class: 'card-header',
    onClick: toggle.toggle
  }, [generateTitle(slots), generateTriggerButton(toggle, slots)]);
}

export const ACCORDION_CONTENT_THEME_MAP = {
  dark: 'is-black-ter',
  light: ''
};
const BAccordionContent = getThemeableFunctionalComponent({
  cls: 'card-content',
  el: 'section',
  themeMap: ACCORDION_CONTENT_THEME_MAP
});

function generateBody(toggle, transition, slots) {
  return h(Transition, transition.value, () => withDirectives(h(BAccordionContent, {
    'aria-hidden': !toggle.isOn.value
  }, slots.default), [[vShow, toggle.isOn.value]]));
}

export default defineComponent({
  name: 'b-accordion',
  props: { ...getUseTogglePropsDefinition('isExpanded'),
    ...FadeTransitionPropsDefinition,
    ...DefaultThemePropsDefinition
  },

  setup(props, {
    slots
  }) {
    const toggle = useToggle(props, 'isExpanded');
    const theme = useTheme(props);
    const transition = useTransition(props);
    return () => h('article', {
      class: ['b-card card', ...theme.themeClasses.value]
    }, [generateHeader(toggle, slots), generateBody(toggle, transition, slots)]);
  }

});
//# sourceMappingURL=BAccordion.js.map