import "../../../src/components/accordion/accordion.sass";
import { defineComponent, h, vShow, withDirectives } from 'vue';
import { DefaultThemePropsDefinition, useTheme } from '../../composables/theme';
import { getUseTogglePropsDefinition, useToggle } from '../../composables/toggle';
import { FadeTransitionPropsDefinition, useTransition } from '../../composables/transition';
import { getThemeableFunctionalComponent } from '../../utils/getThemeableFunctionalComponent';
import { mergeClasses } from '../../utils/mergeClasses';

function generateHeader(toggle, slots) {
  return h('header', {
    onClick: toggle.toggle
  }, [generateTitle(slots), generateTriggerButton(toggle, slots)]);
}

function generateTitle(slots) {
  return h('h1', {
    class: 'card-header-title'
  }, slots.title());
}

function generateTriggerButton(toggle, slots) {
  return h('button', Object.assign(Object.assign(Object.assign({
    class: 'card-header-icon'
  }, toggle.listeners), toggle.attrs.value), {
    onClick: e => {
      e.stopPropagation();
      toggle.toggle();
    }
  }), slots.trigger({
    isExpanded: toggle.isOn.value
  }));
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
  return h('transition', transition.value, [withDirectives(h(BAccordionContent, {
    'aria-hidden': !toggle.isOn.value
  }, slots.default()), [[vShow, toggle.isOn.value]])]);
}

export default defineComponent({
  name: 'b-accordion',
  props: Object.assign(Object.assign(Object.assign({}, getUseTogglePropsDefinition('isExpanded')), FadeTransitionPropsDefinition), DefaultThemePropsDefinition),

  setup(props, {
    slots
  }) {
    const toggle = useToggle(props, 'isExpanded');
    const theme = useTheme(props);
    const transition = useTransition(props);
    return () => h('article', {
      class: mergeClasses('b-card card', theme.themeClasses.value)
    }, [generateHeader(toggle, slots), generateBody(toggle, transition, slots)]);
  }

});
//# sourceMappingURL=BAccordion.js.map