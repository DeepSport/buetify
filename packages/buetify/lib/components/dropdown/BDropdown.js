import "../../../src/components/dropdown/dropdown.sass";
import { useThemePropsDefinition, useTheme } from '../../composables/theme';
import { getUseTogglePropsDefinition, useToggle } from '../../composables/toggle';
import { FadeTransitionPropsDefinition, useTransition } from '../../composables/transition';
import { useWindowSize } from '../../composables/windowSize';
import { defineComponent, shallowRef, computed, h, withDirectives, vShow, Transition } from 'vue';
import ClickOutside from '../../directives/clickOutside';
import { isString } from '../../utils/helpers';
import { DropdownThemeMap } from './theme';
export const BDropdownPropsDefinition = { ...useThemePropsDefinition(DropdownThemeMap),
  ...getUseTogglePropsDefinition('isExpanded'),
  ...FadeTransitionPropsDefinition,
  id: String,
  isDisabled: {
    type: Boolean,
    default: false
  },
  isHoverable: {
    type: Boolean,
    default: false
  },
  isInline: {
    type: Boolean,
    default: false
  },
  position: {
    type: String,
    validator: value => {
      return isString(value) && ['is-top-right', 'is-top-left', 'is-bottom-left'].includes(value);
    }
  },
  isMobileModal: {
    type: Boolean,
    default: true
  },
  menuTag: {
    type: String,
    default: 'ul'
  }
};
let id = 0;

function generateTrigger(toggle, id, slots) {
  return h('div', {
    ref: 'trigger',
    class: 'dropdown-trigger',
    role: 'button',
    'aria-owns': id,
    'aria-haspopup': 'listbox',
    'aria-expanded': `${toggle.isOn.value}`,
    onClick: toggle.toggle
  }, slots.trigger && slots.trigger(toggle));
}

function generateTransition(transition, children) {
  return h(Transition, transition, children);
}

function useCloseConditional(toggle, isInWhiteList) {
  return e => {
    const target = e.target;
    return toggle.isOn.value && isInWhiteList(target);
  };
}

function generateDropdownContent(menuTag, toggle, computedId, themeClasses, slots) {
  return h(menuTag, {
    class: ['dropdown-content', ...themeClasses],
    role: 'menu',
    id: computedId,
    'aria-hidden': toggle.isOff.value
  }, slots.default && slots.default(toggle));
}

function generateDropdownMenu(menuTag, toggle, computedId, themeClasses, transition, slots, useTransition = true) {
  const menu = () => withDirectives(h('div', {
    class: 'dropdown-menu'
  }, [generateDropdownContent(menuTag, toggle, computedId, themeClasses, slots)]), [[vShow, toggle.isOn.value]]);

  return useTransition ? generateTransition(transition, menu) : menu();
}

function generateMobileBackground(menuTag, toggle, computedId, themeClasses, transition, slots) {
  return generateTransition(transition, () => withDirectives(h('div', {
    class: 'background',
    'aria-hidden': toggle.isOff.value,
    onClick: toggle.setOff
  }, [generateDropdownMenu(menuTag, toggle, computedId, themeClasses, transition, slots, false)]), [[vShow, toggle.isOn.value]]));
}

function generateChildren(menuTag, isInline, toggle, computedId, transition, themeClasses, shouldDisplayMobileBackground, slots) {
  const children = [];

  if (!isInline) {
    children.push(generateTrigger(toggle, computedId, slots));
  }

  if (shouldDisplayMobileBackground) {
    children.push(generateMobileBackground(menuTag, toggle, computedId, themeClasses, transition, slots));
  } else {
    const menu = generateDropdownMenu(menuTag, toggle, computedId, themeClasses, transition, slots);

    if (menu) {
      children.push(menu);
    }
  }

  return children;
}

export default defineComponent({
  name: 'b-dropdown',
  props: BDropdownPropsDefinition,

  setup(props) {
    const windowSize = useWindowSize();
    const toggle = useToggle(props, 'isExpanded');
    const {
      themeClasses
    } = useTheme(props);
    const transition = useTransition(props);
    const root = shallowRef(null);
    const trigger = shallowRef(null);
    const dropdownMenu = shallowRef(null);
    const computedId = computed(() => `dropdown-menu-${props.id ?? id++}`);
    const rootClasses = computed(() => [props.position, {
      'is-disabled': props.isDisabled,
      'is-hoverable': props.isHoverable,
      'is-inline': props.isInline,
      'is-active': toggle.isOn.value || props.isInline,
      'is-mobile-modal': props.isMobileModal
    }]);
    const displayMenu = computed(() => !props.isDisabled && (toggle.isOn.value || props.isHoverable) || props.isInline);
    const isMobileModal = computed(() => props.isMobileModal && !props.isInline && !props.isHoverable);
    const displayMobileBackground = computed(() => isMobileModal.value && windowSize.value.isTouch);

    function getDependentElements() {
      return Array.from(dropdownMenu.value?.querySelectorAll('*') ?? []);
    }

    function isInDropdown(el) {
      return dropdownMenu.value !== undefined && dropdownMenu.value.contains(el);
    }

    function isInTrigger(el) {
      return trigger.value !== undefined && trigger.value.contains(el);
    }

    function isInWhiteList(el) {
      if (el === root.value) return true;
      if (el === dropdownMenu.value) return true;
      if (el === trigger.value) return true;
      return isInDropdown(el) || isInTrigger(el);
    }

    const menuToggle = { ...toggle,
      isOn: displayMenu,
      isOff: computed(() => !displayMenu.value)
    };
    const closeConditional = useCloseConditional(menuToggle, isInWhiteList);
    const clickOutsideArgs = {
      include: getDependentElements,
      closeConditional
    };
    return {
      root,
      rootClasses,
      clickOutsideArgs,
      toggle,
      transition,
      themeClasses,
      dropdownMenu,
      displayMobileBackground,
      menuToggle,
      trigger,
      computedId
    };
  },

  render() {
    return withDirectives(h('div', {
      ref: 'root',
      class: ['dropdown', ...this.rootClasses]
    }, generateChildren(this.menuTag, this.isInline, this.menuToggle, this.computedId, this.transition, this.themeClasses, this.displayMobileBackground, this.$slots)), [[ClickOutside, this.toggle.setOff, this.clickOutsideArgs]]);
  }

});
//# sourceMappingURL=BDropdown.js.map