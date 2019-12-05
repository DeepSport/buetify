import { getUseTogglePropsDefinition, useToggle } from '../../composables/toggle';
import VerticalExpandTransition from '../../transitions/verticalExpandTransition';
import VerticalExpansionIcon from '../icons/verticalExpansion/VerticalExpansionIcon';
import BMenuList from './BMenuList';
import { withDirectives, vShow, defineComponent, h } from 'vue';
export default defineComponent({
  name: 'b-menu-group',
  props: { ...getUseTogglePropsDefinition('isExpanded'),
    isExpandable: {
      type: Boolean,
      default: false
    },
    menuLabelClass: {
      type: [String, Object, Array],
      default: ''
    },
    menuListClass: {
      type: [String, Object, Array],
      default: ''
    }
  },

  setup(props, {
    slots
  }) {
    const toggle = useToggle(props, 'isExpanded');
    return () => h('section', {
      class: 'is-fullwidth'
    }, [props.isExpandable ? h('button', {
      class: ['menu-label is-flex flex-direction-row justify-content-space-between align-items-center is-fullwidth', props.menuLabelClass],
      ...toggle.listeners,
      ...toggle.attrs.value
    }, [slots['menu-label'] && slots['menu-label'](), h(VerticalExpansionIcon, {
      isExpanded: toggle.isOn.value
    })]) : h('div', {
      class: ['menu-label', props.menuLabelClass]
    }, slots['menu-label'] && slots['menu-label']()), props.isExpandable ? h(VerticalExpandTransition, undefined, () => [withDirectives(h(BMenuList, {
      class: [props.menuListClass, 'expand-vertical-transition'],
      'aria-hidden': toggle.isOff.value
    }, slots.default), [[vShow, toggle.isOn.value]])]) : h(BMenuList, {
      class: props.menuListClass
    }, slots.default)]);
  }

});
//# sourceMappingURL=BMenuGroup.js.map