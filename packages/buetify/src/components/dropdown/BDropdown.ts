import './dropdown.sass';
import { Predicate } from 'fp-ts/lib/function';
import { IO } from 'fp-ts/lib/IO';
import { useThemePropsDefinition, useTheme } from '../../composables/theme';
import { getUseTogglePropsDefinition, Toggle, useToggle } from '../../composables/toggle';
import { FadeTransitionPropsDefinition, useTransition } from '../../composables/transition';
import { useWindowSize } from '../../composables/windowSize';
import { TransitionClasses } from '../../types/Transition';
import {
  ExtractPropTypes,
  PropType,
  VNode,
  defineComponent,
  shallowRef,
  computed,
  Ref,
  h,
  withDirectives,
  vShow,
  Slots,
  Transition
} from 'vue';
import ClickOutside from '../../directives/clickOutside';
import { isString } from '../../utils/helpers';
import { Classes } from '../../utils/mergeClasses';
import { DropdownThemeMap } from './theme';

export type DropdownPosition = 'is-top-right' | 'is-top-left' | 'is-bottom-left';

export const BDropdownPropsDefinition = {
  ...useThemePropsDefinition(DropdownThemeMap),
  ...getUseTogglePropsDefinition('isExpanded'),
  ...FadeTransitionPropsDefinition,
  id: String as PropType<string>,
  isDisabled: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  isHoverable: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  isInline: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  position: {
    type: String as PropType<DropdownPosition>,
    validator: (value: unknown) => {
      return isString(value) && ['is-top-right', 'is-top-left', 'is-bottom-left'].includes(value);
    }
  },
  isMobileModal: {
    type: Boolean as PropType<boolean>,
    default: true
  },
  menuTag: {
    type: String as PropType<string>,
    default: 'ul'
  }
};

export type BDropdownProps = ExtractPropTypes<typeof BDropdownPropsDefinition>;

let id = 0;

function generateTrigger(toggle: Toggle, id: string, slots: Slots) {
  return h(
    'div',
    {
      ref: 'trigger',
      class: 'dropdown-trigger',
      role: 'button',
      'aria-owns': id,
      'aria-haspopup': 'listbox',
      'aria-expanded': `${toggle.isOn.value}`,
      onClick: toggle.toggle
    },
    slots.trigger && slots.trigger(toggle)
  );
}

function generateTransition(transition: TransitionClasses, children: IO<VNode | undefined>) {
  return h(Transition, transition, children);
}

function useCloseConditional(toggle: Toggle, isInWhiteList: Predicate<HTMLElement>): Predicate<Event> {
  return (e: Event) => {
    const target = e.target as HTMLElement;
    return toggle.isOn.value && isInWhiteList(target);
  };
}

function generateDropdownContent(
  menuTag: string,
  toggle: Toggle,
  computedId: string,
  themeClasses: string[],
  slots: Slots
): VNode {
  return h(
    menuTag,
    {
      class: ['dropdown-content', ...themeClasses],
      role: 'menu',
      id: computedId,
      'aria-hidden': toggle.isOff.value
    },
    slots.default && slots.default(toggle)
  );
}

function generateDropdownMenu(
  menuTag: string,
  toggle: Toggle,
  computedId: string,
  themeClasses: string[],
  transition: TransitionClasses,
  slots: Slots,
  useTransition = true
) {
  const menu = () =>
    withDirectives(
      h(
        'div',
        {
          class: 'dropdown-menu'
        },
        [generateDropdownContent(menuTag, toggle, computedId, themeClasses, slots)]
      ),
      [[vShow, toggle.isOn.value]]
    );
  return useTransition ? generateTransition(transition, menu) : menu();
}

function generateMobileBackground(
  menuTag: string,
  toggle: Toggle,
  computedId: string,
  themeClasses: string[],
  transition: TransitionClasses,
  slots: Slots
): VNode {
  return generateTransition(transition, () =>
    withDirectives(
      h(
        'div',
        {
          class: 'background',
            'aria-hidden': toggle.isOff.value,
          onClick: toggle.setOff
        },
        [generateDropdownMenu(menuTag, toggle, computedId, themeClasses, transition, slots, false)]
      ),
      [[vShow, toggle.isOn.value]]
    )
  );
}

function generateChildren(
  menuTag: string,
  isInline: boolean,
  toggle: Toggle,
  computedId: string,
  transition: TransitionClasses,
  themeClasses: string[],
  shouldDisplayMobileBackground: boolean,
  slots: Slots
) {
  const children: VNode[] = [];
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
    const { themeClasses } = useTheme(props);
    const transition = useTransition(props);
    const root = shallowRef((null as unknown) as HTMLElement);
    const trigger = shallowRef((null as unknown) as HTMLElement);
    const dropdownMenu = shallowRef((null as unknown) as HTMLElement);
    const computedId = computed(() => `dropdown-menu-${props.id ?? id++}`);
    const rootClasses: Ref<Classes[]> = computed(() => [
      props.position,
      {
        'is-disabled': props.isDisabled,
        'is-hoverable': props.isHoverable,
        'is-inline': props.isInline,
        'is-active': toggle.isOn.value || props.isInline,
        'is-mobile-modal': props.isMobileModal
      }
    ]);
    const displayMenu = computed(
      () => (!props.isDisabled && (toggle.isOn.value || props.isHoverable)) || props.isInline
    );
    const isMobileModal = computed(() => props.isMobileModal && !props.isInline && !props.isHoverable);
    const displayMobileBackground = computed(() => isMobileModal.value && windowSize.value.isTouch);

    function getDependentElements(): HTMLElement[] {
      return Array.from(dropdownMenu.value?.querySelectorAll('*') ?? []);
    }

    function isInDropdown(el: HTMLElement): boolean {
      return dropdownMenu.value !== undefined && dropdownMenu.value.contains(el);
    }

    function isInTrigger(el: HTMLElement): boolean {
      return trigger.value !== undefined && trigger.value.contains(el);
    }

    function isInWhiteList(el: HTMLElement) {
      if (el === root.value) return true;
      if (el === dropdownMenu.value) return true;
      if (el === trigger.value) return true;
      return isInDropdown(el) || isInTrigger(el);
    }

    const menuToggle = {
      ...toggle,
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
    return withDirectives(
      h(
        'div',
        { ref: 'root', class: ['dropdown', ...this.rootClasses] },
        generateChildren(
          this.menuTag,
          this.isInline,
          this.menuToggle,
          this.computedId,
          this.transition,
          this.themeClasses,
          this.displayMobileBackground,
          this.$slots
        )
      ),
      [[ClickOutside, this.toggle.setOff, (this.clickOutsideArgs as unknown) as string]]
    );
  }
});
